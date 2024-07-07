import { FC } from 'react'

interface Props {
  currentUser: string
  username: string
  firstname: string
  lastname: string
  message: string
}

const Message: FC<Props> = ({ currentUser, username, firstname, lastname, message }) => {
  const style = {
    bgColor: currentUser == username ? "bg-zinc-300" : "bg-zinc-900",
    justify: currentUser == username ? "justify-end" : "justify-start",
    textColor: currentUser == username ? "text-zinc-900" : "text-zinc-300"
  }

  return <div className={`flex ${style.justify}`}>
    <div className={`rounded-lg ${style.bgColor} ${style.textColor} p-4 inline-block max-w-[300px]`}>
      <b className="block pb-2">{firstname} {lastname} - @{username}</b>
      <p>{message}</p>
    </div>
  </div>
}

export default Message