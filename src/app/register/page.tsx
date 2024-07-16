"use client"

import { RegisterMsgReqBody, UserPayload, WSMessage } from '@/utils/definitions';
import Link from 'next/link';
import { ChangeEvent, FC, MouseEventHandler, useContext, useEffect, useState } from 'react'
import { MainCTX } from '@/app/ctx/main-ctx';
import { MessageTypes, serialize } from '@/utils/ws-messages';
import { checkConn } from '@/utils/connection';
import { useRouter } from 'next/navigation';
import { removeCookie } from '@/utils/cookie';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface Props { }

const RegisterPage: FC<Props> = ({ }) => {
  const ctx = useContext(MainCTX)
  const router = useRouter();

  const initialUserPayload = { username: "", password: "", firstname: "", lastname: "" }
  const [userPayload, setUserPayload] = useState<UserPayload>(initialUserPayload);


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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, field: keyof UserPayload) => {
    setUserPayload(prev => {
      const newUserPayload = { ...prev }
      newUserPayload[field] = event.target.value
      return newUserPayload
    })
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    if (!ctx || !checkConn(ctx.connInfo[0])) return console.error("no se puede enviar mensaje")
    const conn = ctx.connInfo[0].conn!
    const message: WSMessage<RegisterMsgReqBody> = {
      type: MessageTypes.register,
      body: {
        username: userPayload.username,
        password: userPayload.password,
        firstname: userPayload.firstname,
        lastname: userPayload.lastname
      }
    }
    const serialized = serialize(message)
    conn.send(serialized)
    router.push("/")
  }

  return <main className="min-h-screen flex items-center justify-center">
    <form className="w-[350px] rounded-lg flex flex-col p-6 bg-zinc-900">
      <h2 className="text-zinc-200 text-3xl font-semibold text-center pb-4">Register</h2>

      <div className="flex flex-col gap-2 mb-4">
        <label className="font-normal">Firstname</label>
        <input className="bg-zinc-800 text-zinc-200 focus:bg-zinc-700" type="text" value={userPayload.firstname} onChange={(e) => handleInputChange(e, "firstname")} />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="font-normal">Lastname</label>
        <input className="bg-zinc-800 text-zinc-200 focus:bg-zinc-700" type="text" value={userPayload.lastname} onChange={(e) => handleInputChange(e, "lastname")} />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="font-normal">Username</label>
        <input autoFocus className="bg-zinc-800 text-zinc-200 transition-all focus:bg-zinc-700" type="text" value={userPayload.username} onChange={(e) => handleInputChange(e, "username")} />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="font-normal">Password</label>
        <div className="flex flex-col relative">
          <button onClick={handleEyeClick} className="flex items-center justify-center p-0 absolute w-6 h-6 right-2 top-[22.5%]">
            {passVisible ? <FiEye className="w-full h-full" /> : <FiEyeOff className="w-full h-full" />}
          </button>
          <input className="bg-zinc-800 text-zinc-200 focus:bg-zinc-700" type={`${passVisible ? "text" : "password"}`} value={userPayload.password} onChange={(e) => handleInputChange(e, "password")} />
        </div>
      </div>

      <div className="flex flex-col mb-6">
        <button onClick={handleClick} className="font-semibold transition-all bg-zinc-800 text-zinc-200 hover:bg-zinc-700 focus:bg-zinc-700">Send</button>
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