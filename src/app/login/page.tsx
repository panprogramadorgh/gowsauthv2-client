'use client'

import { ChangeEvent, MouseEventHandler, useContext, useEffect, useState } from "react"
import Link from "next/link"
import { LoginMsgReqBody, UserCredentials, WSMessage } from "@/utils/definitions";
import { MainCTX } from "@/app/ctx/main-ctx";
import { checkConn } from "@/utils/connection";
import { MessageTypes, serialize } from "@/utils/ws-messages";
import { useRouter } from "next/navigation";
import { removeCookie } from "@/utils/cookie";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const ctx = useContext(MainCTX)
  const router = useRouter()

  const initialCredentials = { username: "", password: "" }
  const [credentials, setCredentials] = useState<UserCredentials>(initialCredentials);

  const [passVisible, setPassVisible] = useState<boolean>(false)
  const handleEyeClick: MouseEventHandler = (e) => {
    e.preventDefault()
    setPassVisible(prev => !prev)
  }

  useEffect(() => {
    removeCookie("token") // Eliminar la sesion
    if (!ctx || !ctx.user[0]) return
    const [_, setUser] = ctx.user;
    setUser(null)
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, field: "username" | "password") => {
    const newCredentials = { ...credentials }
    newCredentials[field] = event.target.value
    setCredentials(newCredentials)
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    if (!ctx || !checkConn(ctx.connInfo[0])) return console.error("no se puede enviar mensaje")
    const conn = ctx.connInfo[0].conn!
    const message: WSMessage<LoginMsgReqBody> = {
      type: MessageTypes.login,
      body: {
        username: credentials.username,
        password: credentials.password,
      }
    }
    const serialized = serialize(message)
    conn.send(serialized)
    router.push("/")
  }

  return <>
    <main className="min-h-screen flex justify-center items-center">
      <form className="w-[350px] flex flex-col bg-zinc-900 rounded-lg p-6">
        <h2 className="text-zinc-200 text-3xl font-semibold text-center pb-4">Login</h2>

        <div className="flex flex-col gap-2 mb-4">
          <label className="font-normal">Username</label>
          <input autoFocus className="bg-zinc-800 text-zinc-200 transition-all focus:bg-zinc-700" type="text" value={credentials.username} onChange={(e) => handleInputChange(e, "username")} />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label className="font-normal">Password</label>
          <div className="flex flex-col relative">
            <button onClick={handleEyeClick} className="flex items-center justify-center p-0 absolute w-6 h-6 right-2 top-[22.5%]">
              {passVisible ? <FiEye className="w-full h-full" /> : <FiEyeOff className="w-full h-full" />}
            </button>
            <input className="bg-zinc-800 text-zinc-200 focus:bg-zinc-700" type={`${passVisible ? "text" : "password"}`} value={credentials.password} onChange={(e) => handleInputChange(e, "password")} />
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <button onClick={handleClick} className="font-semibold transition-all bg-zinc-800 text-zinc-200 hover:bg-zinc-700 focus:bg-zinc-700">Send</button>
        </div>

        <div className="text-center">
          <ul className="flex flex-col gap-4 font-normal">
            <li>
              <p>
                New here ? <Link href="/register">Create an account.</Link>
              </p>
            </li>
            <li>
              <p>
                Back to the <Link href="/">chat</Link>.
              </p>
            </li>
          </ul>
        </div>
      </form>
    </main>
  </>
}