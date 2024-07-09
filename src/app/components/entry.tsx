'use client'

import { ChangeEventHandler, FC, MouseEventHandler, useContext, useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { MainCTX } from '../ctx/main-ctx';
import { GuestMsgReqBody, WSMessage } from '@/utils/definitions';
import WSMessageTypes from '@/utils/ws-message-types';;
import { serialize } from '@/utils/decodig-ws-message';

interface Props { }

const Entry: FC<Props> = () => {
  const ctx = useContext(MainCTX)

  const [input, setIntput] = useState<string>("")
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = function (event) {
    setIntput(event.target.value)
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (ctx && ctx.conn && ctx.conn.readyState === WebSocket.OPEN) {
      const message: WSMessage<GuestMsgReqBody> = {
        type: WSMessageTypes.guest,
        body: {
          message: input
        }
      }
      const serialized = serialize(message)
      ctx.conn.send(serialized)
    }
  }

  return <div className="w-[65%] h-[85px] flex sticky bottom-0 bg-neutral-800 text-zinc-300 pb-4">
    <textarea className="flex-grow h-full bg-zinc-900 rounded-lg p-4 outline-none resize-none field-sizig-content" placeholder="Start typing a message ..." onChange={handleChange} value={input} />
    <button onClick={handleClick} className="flex-grow-0 min-w-[65px] h-full flex justify-center items-center bg-zinc-900 rounded-lg ml-2"><BsFillSendFill className="text-xl" /></button>
  </div>
}

export default Entry