import MessageStack from "./components/message-stack"
import Entry from "./components/entry"
import MainCTXProvider from "@/app/ctx/main-ctx"

export default function HemePage() {
  return <>
    <header className="text-center py-4">
      <h1 className="text-5xl text-white font-bold">gowsauthv2</h1>
    </header>
    <main className="min-h-screen flex flex-col justify-between items-center">
      <MainCTXProvider>
        <MessageStack />
        <Entry />
      </MainCTXProvider>
    </main>
  </>
}