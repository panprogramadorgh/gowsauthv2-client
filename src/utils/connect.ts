'use client'

export class WSConnErr extends Error {
  constructor(message?: string) {
    super(`WSConnErr: ${message}`)
  }
}

export function Connect(url: string): WebSocket {
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