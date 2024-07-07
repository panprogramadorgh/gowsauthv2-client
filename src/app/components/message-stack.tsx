import { FC } from "react"
import Message from "./message"

interface Props { }

const MessageStack: FC<Props> = () => {
  return <div className="w-[60%] flex flex-col gap-4">
    <Message currentUser="user1" username="user1" firstname="Alfredo" lastname="Hernandez" message="Hello World, este es un mensaje de alfredo" />
    <Message currentUser="user2" username="user1" firstname="Alfredo" lastname="Hernandez" message="Hello World, este es un mensaje de alfredo" />
    <Message currentUser="user2" username="user1" firstname="Alfredo" lastname="Hernandez" message="Hello World, este es un mensaje de alfredo" />
    <Message currentUser="user1" username="user1" firstname="Alfredo" lastname="Hernandez" message="Hello World, este es un mensaje de alfredo" />
  </div>
}

export default MessageStack