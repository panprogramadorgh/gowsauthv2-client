import WSMessageTypes from "@/utils/ws-message-types"
import React, { Dispatch, SetStateAction } from "react";

/* Tipos relacionados con websocket */

// Utilizado para almacenar credenciales de un usuario (por ejemplo cuando introducimos datos en un formulario)
export interface UserCredentials {
  username: string;
  password: string
}

export interface UserPayload extends UserCredentials {
  firstname: string;
  lastname: string
}

export interface User extends UserPayload {
  userID: number;
}

export interface Message {
  messageID: number;
  owner: number;
  message: string
}

export interface WSMessage<T> {
  type: WSMessageTypes,
  body: T
}

// Cuerpo de mensaje de error (respuesta)
export interface ErrorMsgBody {
  error: string
}

// Cuerpo de mensaje shout (solicitud)
export interface ShoutMsgReqBody {
  token: string;
  message: string
}

// Cuerpo de mensaje shout (respuesta)
export interface ShoutMsgResBody extends Message { }

// Cuerpo de mensaje messages (solicitud)
export type MessagesMsgReqBody = null

// Cuerpo de mensajes messages (respuesta)
export interface MessageMsgResBody {
  messages: Message[]
}

// Cuerpo de mensaje login (solicitud)
export interface LoginMsgReqBody extends UserCredentials { }

export interface LoginMsgResBody {
  token: string
}

// Cuerpo de mensaje register (solicitud)
export interface RegisterMsgReqBody extends UserPayload { }

// Cuerpo de mensaje register (respuesta)
export interface RegisterMsgResBody {
  user: User
}

// Cuerpo de mensaje whoami (solicitud)
export interface WhoamiMsgReqBody {
  token: string
}

// Cuerpo de mensaje whoami (respuesta)
export interface WhoamiMsgResBody {
  user: User
}

// Cuerpo de mensaje whois (solicitud)
export interface WhoisMsgReqBody {
  token: string,
  userID: number
}

// Cuerpo de mensaje whois (respuesta)
export interface WhoisMsgResBody {
  user: User
}

/* Tipos relacionados con el contexto de la aplicacion */

export const enum WebSocketStates {
  connecting = WebSocket.CONNECTING,
  open = WebSocket.OPEN,
  closing = WebSocket.CLOSING,
  closed = WebSocket.CLOSED,
}

export interface WebSocketConnInfo {
  state: WebSocketStates,
  conn: WebSocket | null
}

export interface MainCTXData {
  // user representa la sesion
  user: [User | null, Dispatch<SetStateAction<User | null>>];
  // requiredUsers estado con los usuarios requeridos (aquellos que han escrito mensajes)
  requiredUsers: [User[], (message: WSMessage<WhoisMsgResBody>) => void]
  connInfo: [WebSocketConnInfo, Dispatch<SetStateAction<WebSocketConnInfo>>];
  messages: [Message[], Dispatch<SetStateAction<Message[]>>];
}
