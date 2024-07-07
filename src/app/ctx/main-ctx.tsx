"use client"

import { Connect } from '@/utils/connect'
import { MainCTXData } from '@/utils/definitions'
import React, { FC, ReactNode, createContext } from 'react'

interface Props { children: ReactNode }

export const MainCTX = createContext<MainCTXData | null>(null)

const MainCTXProvider: FC<Props> = ({ children }) => {
  try {
    const conn = Connect("ws://localhost:3000/ws")
    conn.onmessage = function (event) {
      console.log(event.data)
    }
    conn.onerror = function (event) {
      console.error(event)
    }
    console.log("websocket connection established")
    setTimeout(() => {
      conn.send(JSON.stringify({
        type: 4,
        body: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjF9.rOZUJsf4tJ9BrpRODd5ARwclRZpGTS16uRxhvgIwWdY"
        }
      }))

    }, 1000)
  } catch (error) {
    console.error(error)
  }

  return <MainCTX.Provider value={null}>{children}</MainCTX.Provider>
}

export default MainCTXProvider