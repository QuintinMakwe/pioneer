import { ApiRx } from '@polkadot/api'
import { Events } from '@polkadot/api/base/Events'
import { distinctUntilChanged, filter, fromEvent, map, Observable } from 'rxjs'

import { firstWhere } from '@/common/utils/rx'

import { deserializeMessage, serializePayload, WorkerProxyMessage } from '../models/payload'
import { PostMessage, RawWorkerMessageEvent } from '../types'
import { workerApi as launchWorker } from '../worker'

import { query } from './api-query'
import { tx } from './api-tx'

export type WorkerInitMessage = { messageType: 'init'; payload: { consts: ApiRx['consts'] } }
export type WorkerConnectMessage = { messageType: 'isConnected'; payload: boolean }

export class ProxyApi extends Events {
  isConnected = true

  derive: ApiRx['derive']
  query: ApiRx['query']
  rpc: ApiRx['rpc']
  tx: ApiRx['tx']
  consts: ApiRx['consts']

  static create(providerEndpoint: string) {
    const worker = launchWorker()

    const messages = fromEvent<RawWorkerMessageEvent>(worker, 'message')

    const workerProxyMessages = messages.pipe(
      filter(({ data }) => data.messageType === 'proxy'),
      deserializeMessage<WorkerProxyMessage>()
    )
    const postMessage: PostMessage = (message) =>
      worker.postMessage({ ...message, payload: serializePayload(message.payload, workerProxyMessages, postMessage) })

    postMessage({ messageType: 'init', payload: providerEndpoint })

    return messages.pipe(
      firstWhere(({ data }) => data.messageType === 'init'),
      deserializeMessage<WorkerInitMessage>(),
      map(({ payload }) => new ProxyApi(messages, postMessage, payload.consts))
    )
  }

  constructor(messages: Observable<RawWorkerMessageEvent>, postMessage: PostMessage, consts: ApiRx['consts']) {
    super()
    {
      this.consts = consts
      this.derive = query('derive', messages, postMessage)
      this.query = query('query', messages, postMessage)
      this.rpc = query('rpc', messages, postMessage)
      this.tx = tx(messages, postMessage)
    }

    messages
      .pipe(
        filter(({ data }) => data.messageType === 'isConnected'),
        map(({ data }) => data as WorkerConnectMessage),
        distinctUntilChanged()
      )
      .subscribe(({ payload }) => {
        this.isConnected = payload
        this.emit(payload ? 'connected' : 'disconnected')
      })

    // TODO emit errors too
  }
}
