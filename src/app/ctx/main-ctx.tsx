"use client"

import React, { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { checkConn, connect } from '@/utils/connection'
import { MainCTXData, User, Message, WebSocketConnInfo } from '@/utils/definitions'
import { GetCookie } from '@/utils/cookie'
import handleConn from '@/utils/handle-conn'
import { EnvVarNotDefinedError } from '@/utils/env'
import useGetRequiredUsers from '@/app/hooks/use-get-required-users'


const urlConn = process.env["WS_URL"]!
if (urlConn === undefined) throw new EnvVarNotDefinedError("WS_URL")

export const MainCTX = createContext<MainCTXData | null>(null)

interface Props { children: ReactNode }

const MainCTXProvider: FC<Props> = ({ children }) => {

  // Establecer cookie con token de sesion
  // const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjF9.rOZUJsf4tJ9BrpRODd5ARwclRZpGTS16uRxhvgIwWdY"
  // SetCookie("token", userToken, 365)

  const user = useState<User | null>(null);
  const connInfo = useState<WebSocketConnInfo>({ state: WebSocket.CLOSED, conn: null });
  const messages = useState<Message[]>([]);
  const requiredUsers = useGetRequiredUsers(connInfo[0].conn, messages[0])

  let ctxData: MainCTXData = {
    user,
    requiredUsers,
    connInfo,
    messages,
  }

  useEffect(() => {
    try {
      const newConn = connect(urlConn)
      const newConnInfo: WebSocketConnInfo = {
        state: WebSocket.CONNECTING,
        conn: newConn
      }
      console.log(`connecting to websocket server with url: ${urlConn} ...`)
      const [_, setConnInfo] = connInfo
      setConnInfo(newConnInfo)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    if (connInfo[0].state !== WebSocket.CONNECTING || connInfo[0].conn === null) {
      return
    }
    try {
      const token = GetCookie("token")
      handleConn(ctxData, token)
    } catch (error) {
      console.error(error)
    }
  }, [connInfo[0]])

  return <MainCTX.Provider value={ctxData}>{children}</MainCTX.Provider>
}

export default MainCTXProvider