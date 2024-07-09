"use client"

import React, { FC, ReactNode, createContext } from 'react'
import { Connect } from '@/utils/connect'
import { MainCTXData } from '@/utils/definitions'
import { GetCookie, SetCookie } from '@/utils/cookie'
import handleConn from '@/utils/handle-conn'


// TODO: Introducir conexion websocket en el contexto principal 

export const MainCTX = createContext<MainCTXData | null>(null)

interface Props { children: ReactNode }

const MainCTXProvider: FC<Props> = ({ children }) => {

  // Establecer cookie con token de sesion
  // const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjF9.rOZUJsf4tJ9BrpRODd5ARwclRZpGTS16uRxhvgIwWdY"
  // SetCookie("token", userToken, 365)

  let ctxData: MainCTXData = {
    user: null,
    conn: null
  }
  try {
    const urlConn = process.env.WS_URL
    if (!urlConn) {
      throw new Error("WS_URL environment variable is not defined")
    }
    const conn = Connect(urlConn)
    console.log(`connecting to websocket server with url: ${urlConn} ...`)
    // Datos iniciales del contexto
    ctxData = {
      user: null,
      conn
    }
    // Obtener cookie recien establecida
    const token = GetCookie("token")
    handleConn(conn, ctxData, token)
  } catch (error) {
    console.error(error)
  }

  return <MainCTX.Provider value={ctxData}>{children}</MainCTX.Provider>
}

export default MainCTXProvider