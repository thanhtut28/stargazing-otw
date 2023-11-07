import cn from 'classnames'
import React from 'react'

type ButtonProps = {
  variant?: 'primary' | 'selected' | 'cta'
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
        'py-1 px-2 text-xs lg:py-2 lg:px-3 lg:text-sm uppercase flex items-center justify-center border tracking-wider transition-all duration-200 disabled:opacity-25 disabled:bg-transparent disabled:text-white disabled:cursor-not-allowed focus:outline-none',
        {
          'w-16 lg:w-16 border-white hover:bg-white hover:text-black':
            variant === 'primary',
          'w-16 lg:w-16 bg-white text-black hover:bg-white hover:text-black':
            variant === 'selected',
          'w-full justify-between h-14 px-5 bg-white text-black hover:bg-black hover:text-white group':
            variant === 'cta',
        },
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button
