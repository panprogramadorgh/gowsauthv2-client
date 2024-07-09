import Link from 'next/link'
import { FC } from 'react'

interface Props { title?: string }
const Header: FC<Props> = ({ title }) => {
  return <>
    <header className="flex flex-col items-end p-8">
      <Link href="/login" className="text-zinc-900 hover:no-underline bg-zinc-200 p-4 rounded-lg font-bold" >Log-in</Link>
      {title ? (<>
        <div className="w-full pb-6 text-center">
          <h1 className="m-2 text-5xl text-white font-bold">{title}</h1>
        </div>
      </>) : (null)}
    </header>
  </>
}

export default Header