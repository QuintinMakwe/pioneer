import React, { ReactNode, useCallback, useEffect, useState } from 'react'

import {
  MEMBERSHIP_FAUCET_ENDPOINT,
  NetworkType,
  NODE_RPC_ENDPOINT,
  OLYMPIA_TESTNET_CONFIG_ENDPOINT,
  QUERY_NODE_ENDPOINT,
  QUERY_NODE_ENDPOINT_SUBSCRIPTION,
} from '@/app/config'
import { Loading } from '@/common/components/Loading'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useNetwork } from '@/common/hooks/useNetwork'
import { isDefined, objectEquals } from '@/common/utils'

import { localEndpoints, NetworkEndpoints, NetworkEndpointsContext } from './context'

interface Props {
  children: ReactNode
}

export const NetworkEndpointsProvider = ({ children }: Props) => {
  const [network, setNetwork] = useNetwork()
  const [endpoints, setEndpoints] = useState<Partial<NetworkEndpoints>>({})
  const [storedNetworkConfig, storeNetworkConfig] = useLocalStorage<Partial<NetworkEndpoints>>('network_config')
  const [isLoading, setIsLoading] = useState(false)

  const updateNetworkConfig = useCallback(
    async (configEndpoint: string, fallbackOnLocalEndpoints = false) => {
      setIsLoading(true)
      try {
        const config = await (await fetch(configEndpoint)).json()

        const newNetworkConfig = {
          queryNodeEndpointSubscription: config['graphql_server_websocket'],
          queryNodeEndpoint: config['graphql_server'],
          membershipFaucetEndpoint: config['member_faucet'],
          nodeRpcEndpoint: config['websocket_rpc'],
        }

        const shouldUpdateConfig = !objectEquals<Partial<NetworkEndpoints>>(newNetworkConfig)(storedNetworkConfig ?? {})
        const shouldUpdateNetwork = network !== 'olympia-testnet'

        if (shouldUpdateConfig) {
          storeNetworkConfig(newNetworkConfig)
        }
        if (shouldUpdateNetwork) {
          setNetwork('olympia-testnet')
        }
        if (shouldUpdateConfig || shouldUpdateNetwork) {
          return window.location.reload()
        }
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        const errMsg = `Failed to fetch the network configuration from ${configEndpoint}.`

        if (fallbackOnLocalEndpoints) {
          setEndpoints(localEndpoints)
          throw new Error(`${errMsg} Falling back on the local endpoints.`)
        } else {
          throw new Error(errMsg)
        }
      }
    },
    [network]
  )

  useEffect(() => {
    const endpoints = overrideMissingEndpoints(network, storedNetworkConfig ?? {})

    if (OLYMPIA_TESTNET_CONFIG_ENDPOINT && network === 'olympia-testnet' && !endpointsAreDefined(endpoints)) {
      updateNetworkConfig(OLYMPIA_TESTNET_CONFIG_ENDPOINT, true)
    } else {
      setEndpoints(endpoints)
    }
  }, [network, updateNetworkConfig])

  if (!endpointsAreDefined(endpoints) || isLoading) {
    return <Loading text="Loading network endpoints" />
  }

  return (
    <NetworkEndpointsContext.Provider value={[overrideMissingEndpoints(network, endpoints), updateNetworkConfig]}>
      {children}
    </NetworkEndpointsContext.Provider>
  )
}

const endpointsAreDefined = (endpoints: Partial<NetworkEndpoints>): endpoints is NetworkEndpoints =>
  Object.values(endpoints).length === 4 && Object.values(endpoints).every(isDefined)

const overrideMissingEndpoints = <R extends Partial<NetworkEndpoints>>(network: NetworkType, endpoints: R) =>
  ({
    queryNodeEndpointSubscription: QUERY_NODE_ENDPOINT_SUBSCRIPTION[network] ?? endpoints.queryNodeEndpointSubscription,
    queryNodeEndpoint: QUERY_NODE_ENDPOINT[network] ?? endpoints.queryNodeEndpoint,
    membershipFaucetEndpoint: MEMBERSHIP_FAUCET_ENDPOINT[network] ?? endpoints.membershipFaucetEndpoint,
    nodeRpcEndpoint: NODE_RPC_ENDPOINT[network] ?? endpoints.nodeRpcEndpoint,
  } as R)