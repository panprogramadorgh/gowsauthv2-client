import { Message, User, WhoisMsgResBody, WSMessage } from "@/utils/definitions";
import { sendWhois } from "@/utils/ws-messages";
import { useEffect, useState } from "react";

export default function useGetRequiredUsers(conn: WebSocket | null, messages: Message[]): [User[], (message: WSMessage<WhoisMsgResBody>) => void] {
  const [requiredUsers, setRequiredUsers] = useState<User[]>([])

  useEffect(() => {
    if (!conn) return

    const missingUsers = getMissingRequiredUsers(requiredUsers, messages)
    for (let userID of missingUsers) {
      // Envia mensaje whois (se debe utilizar funcion para manejar mensaje de respuesta del servidor)
      sendWhois(conn, userID)
    }
  }, [conn, messages, requiredUsers])

  function handleWhoisMessage(message: WSMessage<WhoisMsgResBody>): void {
    setRequiredUsers(prev => [...prev, message.body.user])
  }

  return [requiredUsers, handleWhoisMessage]
}

function getMissingRequiredUsers(users: User[], messages: Message[]): number[] {
  const requiredUsersIDs: number[] = []
  const usersIDs = getUserIDArray(users)
  for (let message of messages) {
    if (!usersIDs.includes(message.owner)) {
      requiredUsersIDs.push(message.owner)
    }
  }
  return requiredUsersIDs
}

function getUserIDArray(users: User[]): number[] {
  const userIDs: number[] = []
  for (let user of users) {
    if (!userIDs.includes(user.userID)) {
      userIDs.push(user.userID)
    }
  }
  return userIDs
}