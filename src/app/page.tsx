import MessageStack from "./components/message-stack"
import Entry from "./components/entry"
import Header from "./components/header"

export default function HemePage() {
  return <>
    <Header title={"WebSocket Chat"} />
    <main className="min-h-screen flex flex-col justify-between items-center">
      <div className="flex flex-col w-[50%] gap-2 pb-6">
        <MessageStack />
      </div>
      <Entry />
    </main>
  </>
}