'use client'

import { WebSocketConnInfo, WebSocketStates } from "./definitions"

export class WSConnErr extends Error {
  constructor(message?: string) {
    super(`WSConnErr: ${message}`)
  }
}

export function connect(url: string): WebSocket {
  try {
    const conn = new WebSocket(url)
    return conn
  } catch (error) {
    if (error instanceof Error) {
      const wsErr = new WSConnErr(error.message)
      throw wsErr
    }
    throw error
  }
}

export function checkConn(connInfo: WebSocketConnInfo | undefined, connecting?: boolean): boolean {
  if (!connInfo) return false
  const isOpen = connInfo.state === WebSocket.OPEN && (connInfo.conn?.readyState === WebSocket.OPEN)
  if (!connecting) return isOpen
  const isOpening = connInfo.state === WebSocket.CONNECTING && (connInfo.conn?.readyState === WebSocket.CONNECTING)
  return isOpen || isOpening
}