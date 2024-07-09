import { WSMessage } from "./definitions";
import WSMessageTypes from "./ws-message-types";

export function serialize(msg: WSMessage<any>): string {
  const serializedBody = { ...msg, body: JSON.stringify(msg.body) }
  const serialized = JSON.stringify(serializedBody)
  return serialized
}

class DeserializeErr extends Error {
  constructor(message?: string) {
    super(`DeserializeErr: ${message}`)
  }
}

export function deserialize(serializedWSMessage: string): WSMessage<any> | never {
  const msg = JSON.parse(serializedWSMessage)
  if (typeof msg.type !== 'number' || msg.type < WSMessageTypes.guest || msg.type > WSMessageTypes.error) {
    throw new DeserializeErr("invalid message type (see enum WSMessageTypes)")
  }
  if (typeof msg.body !== 'string') throw new DeserializeErr("invalid message body (expected string message body)")

  msg.body = JSON.parse(msg.body)
  return msg
}