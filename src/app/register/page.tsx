"use client"

import { UserPayload, } from '@/utils/definitions';
import { MouseEventHandler, useContext, useEffect, useState } from 'react'
import createInput from '@/app/components/create-input';
import Link from 'next/link';
import { MainCTX } from '@/app/ctx/main-ctx';
import { sendRegister } from '@/utils/ws-messages';
import { checkConn } from '@/utils/connection';
import { useRouter } from 'next/navigation';
import { removeCookie } from '@/utils/cookie';

const UserPayloadInput = createInput<UserPayload>()

const RegisterPage = ({ }) => {
  const ctx = useContext(MainCTX)
  const router = useRouter();

  const initialUserPayload = { username: "", password: "", firstname: "", lastname: "" }
  const [userPayload, setUserPayload] = useState<UserPayload>(initialUserPayload);

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
    sendRegister(conn, userPayload)
    router.push("/")
  }

  return <main className="min-h-screen flex items-center justify-center">
    <form className="w-[350px] rounded-lg flex flex-col p-6 bg-zinc-950 border-[1px] border-solid border-zinc-200 border-opacity-15">
      <h2 className="text-zinc-200 text-3xl font-semibold text-center pb-4">Register</h2>

      <UserPayloadInput formState={[userPayload, setUserPayload]} formStateField='firstname' label='Firstname' />

      <UserPayloadInput formState={[userPayload, setUserPayload]} formStateField='lastname' label='Lastname' />

      <UserPayloadInput formState={[userPayload, setUserPayload]} formStateField='username' label='Username' />

      <UserPayloadInput isPassword formState={[userPayload, setUserPayload]} formStateField='password' label='Password' />

      <div className="flex flex-col mb-6">
        <button onClick={handleClick} className="font-semibold transition-all bg-sky-500 text-white border-[1px] border-solid border-transparent hover:bg-sky-600">Register</button>
      </div>

      <div className="text-center">
        <ul className="flex flex-col gap-4 font-normal">
          <li>
            <p>
              I have a account. <Link href="/login">Go to login</Link>.
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
}

export default RegisterPage