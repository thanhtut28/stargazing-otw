import { Bars2Icon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/outline'
import cn from 'classnames'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'

import logoImg from '../../public/assets/logo-gif.gif'

interface Props {
  openNav: boolean
  shouldShowNav: boolean
  setOpenNav: Dispatch<SetStateAction<boolean>>
}

type TLink = {
  name: string
  path: string
}

const LINKS: TLink[] = [
  {
    name: 'home',
    path: '/',
  },
  {
    name: 'showcase',
    path: '/showcase',
  },
  {
    name: 'about',
    path: '/about',
  },
]

const Navigation: React.FC<Props> = ({
  openNav,
  shouldShowNav,
  setOpenNav,
}) => {
  const { asPath } = useRouter()

  const handleToggleNav = () => {
    setOpenNav((prev) => !prev)
  }

  return (
    <motion.header
      initial={false}
      animate={{ y: shouldShowNav ? 0 : -100 }}
      transition={{ y: { duration: 0.4 } }}
      className={cn(
        'fixed backdrop-blur-sm bg-opacity-95 flex justify-between items-center bg-black z-20 h-16 md:h-20 top-0 left-0 bottom-0 right-0 w-full border-b border-b-disabled border-opacity-30 p-4 sm:p-6 md:p-8 lg:p-10',
      )}
    >
      <nav className="flex justify-between items-center w-full relative">
        <Link href="/" className="relative aspect-square w-14 md:w-16 lg:w-18">
          <Image
            className="absolute rounded-full"
            src={logoImg}
            fill
            quality={100}
            priority={true}
            alt="logo"
          />
        </Link>

        <ul className="uppercase hidden md:flex gap-5 text-sm font-bold items-center w-full justify-end">
          {LINKS.map((link) => (
            <li
              key={link.name}
              className={cn(
                { 'text-white': asPath === link.path },
                { 'text-secondary': asPath !== link.path },
              )}
            >
              <Link href={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
        {openNav ? (
          <XMarkIcon className="w-8 h-8 md:hidden" onClick={handleToggleNav} />
        ) : (
          <Bars2Icon className="w-8 h-8 md:hidden" onClick={handleToggleNav} />
        )}

        <div
          className={cn(
            'fixed mt-16 md:mt-20 top-0 bottom-0 left-0 right-0 z-30 w-full h-screen bg-black transition-all duration-500 translate-x-[-100%] md:hidden overflow-hidden',
            {
              'translate-x-[0%]': openNav,
            },
          )}
        >
          <ul className="flex flex-col py-5 uppercase font-bold text-7xl leading-[3.5rem] tracking-tighter">
            {LINKS.map((link) => (
              <li
                key={link.name}
                className={cn('text-secondary', {
                  'text-white': asPath === link.path,
                })}
              >
                <Link href={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </motion.header>
  )
}

export default Navigation
