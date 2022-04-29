import { ApiRx } from '@polkadot/api'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { AnyTuple } from '@polkadot/types/types'
import { uniqueId } from 'lodash'
import { filter, map, Observable } from 'rxjs'

import { deserializeMessage } from '../models/payload'
import { PostMessage, RawWorkerMessageEvent } from '../types'
import { apiInterfaceProxy } from '../utils/proxy'

type ObservableMethods = typeof ObservableMethods[number]

type Module = keyof ApiRx['tx']

export type ClientTxMessage = {
  messageType: 'tx'
  module: Module
  txKey: string
  txId: string
} & (
  | { method: 'transaction'; payload: AnyTuple }
  | { method: { key: ObservableMethods; id: string }; payload: AnyTuple }
)

export type WorkerTxMessage = {
  messageType: 'tx'
  txId: string
  callId: string
  payload: ReturnType<SubmittableExtrinsic<'rxjs'>[ObservableMethods]> extends Observable<infer T> ? T : never
}

const ObservableMethods = ['paymentInfo', 'signAndSend'] as const

export const tx = (messages: Observable<RawWorkerMessageEvent>, postMessage: PostMessage<ClientTxMessage>) => {
  const txMessages = messages.pipe(
    filter(({ data }) => data.messageType === 'tx'),
    deserializeMessage<WorkerTxMessage>()
  )

  return apiInterfaceProxy<'tx'>((module, txKey) => (...params) => {
    const txId = uniqueId(`tx.${module}.${txKey}.`)

    const _messages = txMessages.pipe(filter((message) => message?.txId === txId)) as Observable<WorkerTxMessage>

    const _postMessage = (message: Pick<ClientTxMessage, 'method' | 'payload'>) =>
      postMessage({ messageType: 'tx', module, txKey, txId, ...message })

    _postMessage({ method: 'transaction', payload: params })

    return {
      ...Object.fromEntries(ObservableMethods.map(addObservableMethodEntry)),
    }

    function addObservableMethodEntry(method: ObservableMethods) {
      return [
        method,
        (...params: AnyTuple) => {
          const callId = uniqueId(`tx.${module}.${txKey}.${method}.`)
          _postMessage({ method: { key: method, id: callId }, payload: params })
          return _messages.pipe(
            filter((message) => message.callId === callId),
            map(({ payload }) => payload)
          )
        },
      ]
    }
  })
}
