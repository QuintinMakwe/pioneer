import React, { ReactNode, useEffect, useState } from 'react'
import { firstValueFrom } from 'rxjs'

import { useApiBenchmarking } from '@/api/hooks/useApiBenchmarking'
import { ProxyApi } from '@/proxyApi'

import { useNetworkEndpoints } from '../../hooks/useNetworkEndpoints'

import { ApiContext } from './context'

interface Props {
  children: ReactNode
}

type ConnectionState = 'connecting' | 'connected' | 'disconnected'

interface BaseAPI {
  api?: ProxyApi
  isConnected: boolean
  connectionState: ConnectionState
}

interface APIConnecting extends BaseAPI {
  api: undefined
  isConnected: false
  connectionState: 'connecting'
}

interface APIConnected extends BaseAPI {
  api: ProxyApi
  isConnected: true
  connectionState: 'connected'
}

interface APIDisconnected extends BaseAPI {
  api: ProxyApi
  isConnected: false
  connectionState: 'disconnected'
}

export type UseApi = APIConnecting | APIConnected | APIDisconnected

export const ApiContextProvider = ({ children }: Props) => {
  const [api, setApi] = useState<ProxyApi>()
  const [connectionState, setConnectionState] = useState<ConnectionState>('connecting')
  const [endpoints] = useNetworkEndpoints()

  useApiBenchmarking(api)

  useEffect(() => {
    firstValueFrom(ProxyApi.create(endpoints.nodeRpcEndpoint)).then((api) => {
      setApi(api)
      setConnectionState('connected')
      api.on('connected', () => setConnectionState('connected'))
      api.on('disconnected', () => setConnectionState('disconnected'))
    })
  }, [])

  if (connectionState === 'connecting') {
    return (
      <ApiContext.Provider
        value={{
          isConnected: false,
          api: undefined,
          connectionState,
        }}
      >
        {children}
      </ApiContext.Provider>
    )
  }

  if (connectionState === 'connected') {
    return (
      <ApiContext.Provider
        value={{
          isConnected: true,
          api: api as ProxyApi,
          connectionState,
        }}
      >
        {children}
      </ApiContext.Provider>
    )
  }

  if (connectionState === 'disconnected') {
    return (
      <ApiContext.Provider
        value={{
          isConnected: false,
          api: api as ProxyApi,
          connectionState,
        }}
      >
        {children}
      </ApiContext.Provider>
    )
  }

  return null
}
