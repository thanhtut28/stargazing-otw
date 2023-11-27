import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

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

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
      slideControls.start('visible')
    }
  }, [isInView, mainControls, slideControls])

  return (
    <div ref={ref} className="relative overflow-hidden w-full">
      {type === 'up' && (
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
      )}
      {type === 'opacity' && (
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
      )}
      {type === 'appear' && (
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
      )}
      {/* <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: '100%' },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: 'easeIn' }}
        className="absolute top-1 bottom-1 left-0 right-0 bg-white z-20"
      ></motion.div> */}
    </div>
  )
}
