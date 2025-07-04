import cn from 'classnames'
import { motion, useAnimation } from 'framer-motion'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface HeroVideoProps {
  video: string
}

const HeroCarousel: React.FC<HeroVideoProps> = ({ video }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  const handleVideoLoad = async () => {
    setIsVideoLoaded(true)
  }

  // useEffect(() => {
  //   const intervalId = setInterval(async () => {
  //     const newIndex = (selectedImageIndex + 1 + images.length) % images.length

  //     await controls.start({
  //       x: `-${100 * newIndex}%`,
  //     })

  //     setSelectedImageIndex(newIndex)
  //   }, 10000)
  //   return () => clearInterval(intervalId)
  // }, [controls, images.length, selectedImageIndex])

  return (
    <div className="md:aspect-square h-full flex flex-col w-full relative aspect-square max-w-screen-lg lg:px-2 mx-auto">
      {/* <div className="overflow-hidden flex flex-1 items-center w-full h-full">
        {images.map((image, index) => (
          <motion.div
            className="min-w-full h-full relative"
            key={index}
            animate={controls}
            transition={{ duration: 0.75, ease: 'easeInOut' }}
          >
            <Image
              className="w-full object-cover grayscale opacity-50"
              alt={`Featured Photo for ${image}`}
              src={urlForImage(image).url()}
              priority={true}
              fill
            />
          </motion.div>
        ))}
      </div> */}

      <video
        className={cn('absolute top-0 left-0 w-full h-full object-cover', {
          hidden: !isVideoLoaded,
        })}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={handleVideoLoad}
        key="hero-video"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className={cn(
          'absolute top-0 left-0 w-full h-full bg-neutral-800 animate-pulse',
          {
            hidden: isVideoLoaded,
          },
        )}
      ></div>

      {/* <div className="absolute top-0 left-0 right-0 bottom-0 flex gap-1 md:gap-2 lg:gap-4 flex-col justify-end items-center p-5">
        <h6 className="font-heading  text-primary text-2xl lg:text-5xl">
          They stargazed about rich life
        </h6>
        <p className="uppercase text-xs opacity-80 font-semibold lg:text-lg">
          EST. 2023
        </p>
      </div> */}
    </div>
  )
}

export default HeroCarousel
