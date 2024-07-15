import { FC, ReactNode } from 'react'
import { User } from '@/utils/definitions'

interface Props {
  children: ReactNode;
  session: User | null;
  owner: User;
}

const Message: FC<Props> = ({ children, session, owner }) => {
  const style = {
    bgColor: session?.username == owner.username ? "bg-zinc-200" : "bg-zinc-900",
    justify: session?.username == owner.username ? "justify-end" : "justify-start",
    textColor: session?.username == owner.username ? "text-zinc-900" : "text-zinc-200"
  }

  return <div className={`flex ${style.justify}`}>
    <div className={`rounded-lg ${style.bgColor} ${style.textColor} p-4 inline-block max-w-[300px]`}>
      <b className="block pb-2">{owner.firstname} {owner.lastname} - @{owner.username}</b>
      <p>{children}</p>
    </div>
  </div>
}

export default Message