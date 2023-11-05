import cn from 'classnames'
import React from 'react'

type ButtonProps = {
  variant?: 'primary' | 'selected'
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
        'w-16 py-1 px-2 text-xs lg:w-16 lg:py-2 lg:px-3 lg:text-sm uppercase flex items-center justify-center border tracking-wider transition-all duration-200 hover:bg-white hover:text-black disabled:opacity-25 disabled:bg-transparent disabled:text-white disabled:cursor-not-allowed focus:outline-none',
        {
          'border-white': variant === 'primary',
          'bg-white text-black': variant === 'selected',
        },
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button
