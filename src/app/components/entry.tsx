'use client'

import { ChangeEventHandler, FC, useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";

interface Props { }

const Entry: FC<Props> = () => {
  const [input, setIntput] = useState<string>("")
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = function (event) {
    setIntput(event.target.value)
  }
  return <div className="flex sticky bottom-0 w-[60%] text-zinc-300 pb-4">
    <textarea className="bg-zinc-900 rounded-lg p-4 h-[65px] w-full outline-none resize-none" placeholder="Start typing a message ..." onChange={handleChange} value={input} />
    <button className="flex justify-center items-center bg-zinc-900 rounded-lg h-[65px] w-[65px] ml-2"><BsFillSendFill className="text-xl" /></button>
  </div>
}

export default Entry