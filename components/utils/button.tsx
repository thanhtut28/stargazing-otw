import cn from 'classnames'
import React from 'react'

type ButtonProps = {
  variant?: 'primary' | 'selected' | 'cta' | 'icon'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'text-xs uppercase flex items-center justify-center border tracking-wider transition-all duration-200 disabled:opacity-25 disabled:bg-transparent disabled:text-white disabled:cursor-not-allowed focus:outline-none',
        {
          'w-16 min-w-fit py-1 px-2 lg:py-2 lg:px-3 border-white hover:bg-white hover:text-black':
            variant === 'primary',
          'w-16 min-w-fit py-1 px-2 lg:py-2 lg:px-3 bg-white text-black hover:bg-white hover:text-black':
            variant === 'selected',
          'w-full justify-between h-14 px-5 lg:px-7 bg-white text-black hover:bg-black hover:text-white group':
            variant === 'cta',
          'w-10 h-10 p-5 bg-white text-black rounded-full': variant === 'icon',
        },
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button
