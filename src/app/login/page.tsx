'use client'

import { ChangeEvent, MouseEventHandler, useContext, useState } from "react"
import Link from "next/link"
import { LoginMsgReqBody, User, UserCredentials, WSMessage } from "@/utils/definitions";
import { MainCTX } from "../ctx/main-ctx";
import WSMessageTypes from "@/utils/ws-message-types";
import { serialize } from "@/utils/decodig-ws-message";

export default function LoginPage() {
  const ctx = useContext(MainCTX)
  const [credentials, setCredentials] = useState<UserCredentials>({ username: "", password: "" });
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, field: "username" | "password") => {
    const newCredentials = { ...credentials }
    newCredentials[field] = event.target.value
    setCredentials(newCredentials)
  }
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (ctx && ctx.conn && ctx.conn.readyState === WebSocket.OPEN) {
      const message: WSMessage<LoginMsgReqBody> = {
        type: WSMessageTypes.login,
        body: {
          username: credentials.username,
          password: credentials.password,
        }
      }
      const serialized = serialize(message)
      ctx.conn.send(serialized)
    }
  }

  return <>
    <main className="min-h-screen flex justify-center items-center">
      <div className="w-[350px] flex flex-col bg-zinc-200 rounded-lg p-6">
        <h2 className="text-zinc-800 text-3xl font-semibold text-center pb-4">Login</h2>

        <input className="mb-1 bg-zinc-800 text-zinc-200 transition-all focus:bg-zinc-700" type="text" placeholder="Username" value={credentials.username} onChange={(e) => handleInputChange(e, "username")} />

        <input className="mb-1 bg-zinc-800 text-zinc-200 focus:bg-zinc-700" type="password" placeholder="Password" value={credentials.password} onChange={(e) => handleInputChange(e, "password")} />

        <button onClick={handleClick} className="font-semibold mt-2 mb-4 transition-all bg-zinc-800 text-zinc-200 hover:bg-zinc-700">Send</button>

        <div className="text-center">
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/">Back to the chat</Link>
            </li>
            <li>
              <Link href="/">I don't have account.</Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </>
}