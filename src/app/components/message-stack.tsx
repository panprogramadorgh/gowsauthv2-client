'use client'

import { FC, useContext } from "react"
import Message from "./message"
import { MainCTX } from "@/app/ctx/main-ctx"
import { checkConn } from "@/utils/connection"

interface Props { }

const MessageStack: FC<Props> = () => {
  const ctx = useContext(MainCTX)
  if (!ctx) return null
  const [connInfo] = ctx.connInfo
  const [user] = ctx.user
  const [messages] = ctx.messages
  const [requiredUsers] = ctx.requiredUsers

  if (!checkConn(connInfo)) return null

  return <>
    {messages.map(message => {
      const owner = requiredUsers.find(user => user.userID == message.owner)
      if (!owner) return null
      return <Message key={message.messageID} session={user} owner={owner}>{message.message}</Message>
    })}
  </>
}

export default MessageStack