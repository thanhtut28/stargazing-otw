import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { Bars2Icon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  openNav: boolean
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

const Navigation: React.FC<Props> = ({ openNav, setOpenNav }) => {
  const { asPath } = useRouter()

  const handleToggleNav = () => {
    setOpenNav((prev) => !prev)
  }

  return (
    <div
      className={cn(
        'flex justify-between items-center bg-black z-40 h-20 top-0 left-0 bottom-0 right-0 w-full border-b border-b-disabled border-opacity-30 p-4 sm:p-6 md:p-8 lg:p-10',
      )}
    >
      <div className="flex justify-between items-center w-full relative">
        <div>LOGO</div>
        <ul className="uppercase hidden md:flex gap-5 text-xs font-bold items-center w-full justify-end">
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
        {openNav ? (
          <XMarkIcon className="w-8 h-8 md:hidden" onClick={handleToggleNav} />
        ) : (
          <Bars2Icon className="w-8 h-8 md:hidden" onClick={handleToggleNav} />
        )}

        <div
          className={cn(
            'fixed mt-20 top-0 bottom-0 left-0 right-0 z-30 w-full h-screen bg-black transition-all duration-500 translate-x-[-100%] md:hidden overflow-hidden',
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
      </div>
    </div>
  )
}

export default Navigation
