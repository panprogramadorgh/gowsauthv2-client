'use client'

import { ChangeEventHandler, FC, MouseEventHandler, useContext, useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { MainCTX } from '../ctx/main-ctx';
import { ShoutMsgReqBody, WSMessage } from '@/utils/definitions';
import { getCookie } from '@/utils/cookie';
import { checkConn } from '@/utils/connection';
import { MessageTypes, sendShout, serialize } from '@/utils/ws-messages';
import { useRouter } from 'next/navigation';

interface Props { }

const Entry: FC<Props> = () => {
  const ctx = useContext(MainCTX)
  const router = useRouter()

  const [input, setIntput] = useState<string>("")
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = function (event) {
    setIntput(event.target.value)
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    const token = getCookie("token")
    if (!token || !ctx || !ctx.user[0]) return router.push("/login")
    if (!checkConn(ctx.connInfo[0])) return
    sendShout(ctx.connInfo[0].conn!, token, input)
    setIntput("")
  }

  return <div className="w-[65%] h-[85px] flex sticky bottom-0 bg-neutral-800 pb-4">
    <textarea spellCheck className="flex-grow h-full bg-zinc-900 rounded-lg p-4 outline-none resize-none field-sizig-content" placeholder="Start typing a message ..." onChange={handleChange} value={input} />
    <button onClick={handleClick} className="flex-grow-0 w-[65px] h-[65px] flex justify-center items-center bg-zinc-900 rounded-lg ml-2 p-4"><BsFillSendFill className="w-full h-full" /></button>
  </div>
}

export default Entry