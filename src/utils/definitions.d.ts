import WSMessageTypes from "@/utils/ws-message-types"

/* Tipos relacionados con websocket */

// Utilizado para almacenar credenciales de un usuario (por ejemplo cuando introducimos datos en un formulario)
export interface UserCredentials {
  username: string;
  password: string
}

export interface User extends UserCredentials {
  userID: number;
  firstname: string;
  lastname: string;
}

// TODO: Implementar constructor de mensajes simplificando tener que introducir la propiedad type

export interface WSMessage<T> {
  type: WSMessageTypes,
  body: T
}

// Cuerpo de mensaje guest (solicitud)
export interface GuestMsgReqBody {
  message: string
}

// Cuerpo de mensaje login (solicitud)
export interface LoginMsgReqBody extends UserCredentials { }

// Cuerpo de mensaje WSMessage (respuesta)
export interface WhoamiMsgResBody {
  user: User
}

/* Tipos relacionados con el contexto de la aplicacion */

export interface MainCTXData {
  user: ?User
  conn: ?WebSocket
}

/* Tipos relacionados con los componentes */