import WSMessageTypes from "@/utils/ws-message-types"

export interface User {
  userID: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface WSMessage<T> {
  type: WSMessageTypes,
  body: T
}

export interface WhoamiMsgResBody {
  user: User
}

export interface MainCTXData {
  user: User | null
}