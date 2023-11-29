import localFont from 'next/font/local'
import Navigation from './navigation'
import cn from 'classnames'
import { useState } from 'react'

interface Props {
  children: React.ReactNode
}

const headingFont = localFont({
  src: '../../pages/fonts/killig.ttf',
  variable: '--font-head',
})

const myFont = localFont({
  src: '../../pages/fonts/bat.ttf',
})

const Template: React.FC<Props> = ({ children }) => {
  const [openNav, setOpenNav] = useState<boolean>(false)
  return (
    <>
      <Navigation openNav={openNav} setOpenNav={setOpenNav} />
      <main
        className={cn(`${myFont.className} ${headingFont.variable} pt-20`, {
          'fixed w-full': openNav,
        })}
      >
        {children}
      </main>
    </>
  )
}

export default Template
