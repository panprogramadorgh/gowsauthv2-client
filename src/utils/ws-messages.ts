import { MessagesMsgReqBody, ShoutMsgReqBody, WhoamiMsgReqBody, WhoisMsgReqBody, WSMessage } from "./definitions";
import { EnvVarNotDefinedError } from "./env";

const adminToken = process.env["ADMIN_TOKEN"]!
if (adminToken === undefined) throw new EnvVarNotDefinedError("ADMIN_TOKEN")

// Utilidades relacionadas con los tipos de mensajes websocket

export const enum MessageTypes {
  "shout" = 0,
  "users" = 1,
  "messages" = 2,
  "whoami" = 3,
  "whois" = 4,
  "login" = 5,
  "register" = 6,
  "weight" = 7,
  "error" = 8,
}

export function checkWSMsg<T = any>(targetType: MessageTypes, msg: WSMessage<any>): msg is WSMessage<T> {
  return targetType === msg.type
}


// Funciones relacionadas con el envio de websocket messages

export function sendWhoami(conn: WebSocket, token: string) {
  const message: WSMessage<WhoamiMsgReqBody> = {
    type: MessageTypes.whoami,
    body: {
      token
    }
  }
  const serialized = serialize(message)
  conn.send(serialized)
}

export function sendMessages(conn: WebSocket) {
  const message: WSMessage<MessagesMsgReqBody> = {
    type: MessageTypes.messages,
    body: null,
  }
  const serialized = serialize(message)
  conn.send(serialized)
}

export function sendWhois(conn: WebSocket, userID: number) {
  const message: WSMessage<WhoisMsgReqBody> = {
    type: MessageTypes.whois,
    body: {
      token: adminToken,
      userID: userID
    }
  }
  const serialized = serialize(message)
  conn.send(serialized)
}

export function sendShout(conn: WebSocket, token: string, messageContent: string) {
  const message: WSMessage<ShoutMsgReqBody> = {
    type: MessageTypes.shout,
    body: {
      message: messageContent,
      token,
    }
  }
  const serialized = serialize(message)
  conn.send(serialized)
}

// Funciones relacionadas con la serializacion de mensajes websocket

export function serialize(msg: WSMessage<any>): string {
  const body = msg.body === null ? msg.body : JSON.stringify(msg.body)
  const serialized = JSON.stringify({ ...msg, body })
  return serialized
}

class DeserializeErr extends Error {
  constructor(message?: string) {
    super(`DeserializeErr: ${message}`)
  }
}

export function deserialize(serializedWSMessage: string): WSMessage<any> | never {
  const msg = JSON.parse(serializedWSMessage)
  if (typeof msg.type !== 'number' || msg.type < MessageTypes.shout || msg.type > MessageTypes.error) {
    throw new DeserializeErr("invalid message type (see enum WSMessageTypes)")
  }
  if (typeof msg.body !== 'string') throw new DeserializeErr("invalid message body (expected string message body)")

  if (msg.body === null) return msg
  msg.body = JSON.parse(msg.body)
  return msg
}