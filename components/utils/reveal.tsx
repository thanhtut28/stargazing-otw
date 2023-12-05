import { motion, useAnimation, useInView } from 'framer-motion'
import { ReactNode, useEffect, useRef } from 'react'

interface Props {
  children: JSX.Element
  type?: 'opacity' | 'up' | 'appear'
  delay?: number
}

export default function Reveal({ children, type = 'up', delay = 0 }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const mainControls = useAnimation()
  const slideControls = useAnimation()

  const getRevealType = (children: ReactNode | ReactNode[]) => ({
    up: (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 + delay }}
      >
        {children}
      </motion.div>
    ),

    opacity: (
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 1, delay: 0.5 + delay }}
      >
        {children}
      </motion.div>
    ),

    appear: (
      <motion.div
        variants={{
          hidden: { scale: 0 },
          visible: { scale: 1 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.6, delay: 0.25 + delay, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    ),
  })

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
      slideControls.start('visible')
    }
  }, [isInView, mainControls, slideControls])

  return (
    <div ref={ref} className="relative overflow-hidden w-full">
      {getRevealType(children)[type]}
    </div>
  )
}
