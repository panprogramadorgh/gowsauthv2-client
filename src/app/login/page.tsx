'use client'

import { ChangeEvent, MouseEventHandler, useState } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const handleChange = (event: ChangeEvent<HTMLInputElement>, setState: (newValue: string) => void) => {
    setState(event.target.value)
  }
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    // TODO: Enviar mensaje websocket de inicio de sesion
  }

  return <main>
    <h1>hello world</h1>
    <a href="/">volver</a>
    <input type="text" placeholder="username" value={username} onChange={(e) => handleChange(e, setUsername)} />
    <input type="password" placeholder="password" value={password} onChange={(e) => handleChange(e, setPassword)} />

    <button>Enviar</button>
  </main>
}