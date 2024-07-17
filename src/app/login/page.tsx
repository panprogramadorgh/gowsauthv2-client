'use client'

import { ChangeEvent, MouseEventHandler, useContext, useEffect, useState } from "react"
import Link from "next/link"
import createInput from "@/app/components/create-input";
import { UserCredentials } from "@/utils/definitions";
import { MainCTX } from "@/app/ctx/main-ctx";
import { checkConn } from "@/utils/connection";
import { sendLogin } from "@/utils/ws-messages";
import { useRouter } from "next/navigation";
import { removeCookie } from "@/utils/cookie";

const CredentialsInput = createInput<UserCredentials>()

export default function LoginPage() {
  const ctx = useContext(MainCTX)
  const router = useRouter()

  const initialCredentials = { username: "", password: "" }
  const [credentials, setCredentials] = useState<UserCredentials>(initialCredentials);

  useEffect(() => {
    removeCookie("token") // Eliminar la sesion
    if (!ctx || !ctx.user[0]) return
    const [_, setUser] = ctx.user;
    setUser(null)
  }, [])


  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    if (!ctx || !checkConn(ctx.connInfo[0])) return console.error("no se puede enviar mensaje")
    const conn = ctx.connInfo[0].conn!
    sendLogin(conn, credentials.username, credentials.password)
    router.push("/")
  }

  return <>
    <main className="min-h-screen flex justify-center items-center">
      <form className="w-[350px] flex flex-col bg-zinc-950 rounded-lg p-6 border-[1px] border-solid border-zinc-200 border-opacity-15">
        <h2 className="text-zinc-200 text-3xl font-semibold text-center pb-4">Login</h2>

        <CredentialsInput formState={[credentials, setCredentials]}
          formStateField="username" label="Username"
        />

        <CredentialsInput isPassword formState={[credentials, setCredentials]}
          formStateField="password" label="Password"
        />

        <div className="flex flex-col mb-6">
          <button onClick={handleClick} className="font-semibold transition-all bg-transparent border-[1px] border-solid border-sky-200 border-opacity-20  text-sky-500 hover:bg-sky-500 hover:bg-opacity-5">Login</button>
        </div>

        <div className="text-center">
          <ul className="flex flex-col gap-4 font-normal">
            <li>
              <p>
                New here ? <Link href="/register">Create an account</Link>.
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