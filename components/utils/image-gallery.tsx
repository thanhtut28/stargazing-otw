import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import Button from 'components/utils/button'
import { motion, PanInfo, useAnimation } from 'framer-motion'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import React, { forwardRef, useEffect, useRef, useState } from 'react'

interface ImageGalleryProps {
  images: string[]
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  // const [dragStartX, setDragStartX] = useState(0)
  const containerRef = useRef(null)
  const controls = useAnimation()

  useEffect(() => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const thumbs = containerRef.current.children
      if (thumbs.length > 0) {
        const firstThumbRect = thumbs[0].getBoundingClientRect()
        const lastThumbRect = thumbs[thumbs.length - 1].getBoundingClientRect()

        if (
          firstThumbRect.left < containerRect.left ||
          lastThumbRect.right > containerRect.right
        ) {
          // At least one thumb is overflowing, so scroll to the selected thumb with animation
          const thumbElement = thumbs[selectedImageIndex]
          if (thumbElement) {
            const thumbRect = thumbElement.getBoundingClientRect()
            const scrollX =
              thumbRect.left -
              containerRect.left +
              containerRef.current.scrollLeft

            // Animate the scroll using Framer Motion
            const scrollDuration = 0.3 // Set your desired duration
            containerRef.current.style.scrollBehavior = 'smooth'
            containerRef.current.scrollLeft = scrollX

            // Reset scroll behavior after the animation is complete
            setTimeout(() => {
              containerRef.current.style.scrollBehavior = 'auto'
            }, scrollDuration * 1000)
          }
        }
      }
    }
  }, [selectedImageIndex])

  const handleCarouselChange = async (direction: number) => {
    const newIndex =
      (selectedImageIndex + direction + images.length) % images.length

    console.log(`-${100 * newIndex}%`, selectedImageIndex)

    await controls.start({
      x: `-${100 * newIndex}%`,
    })

    setSelectedImageIndex(newIndex)
  }

  const handleSelectThumb = (destination: number) => {
    const direction = destination - selectedImageIndex

    console.log(direction)

    controls.start({
      x: `${-destination * 100}%`,
    })

    setSelectedImageIndex(destination)
  }

  //   function calcDestination(destination: number) {
  //     {
  //       if (destination > images.length - 1) {
  //         return 0
  //       } else if (destination < 0) {
  //         return 2
  //       }
  //       return destination
  //     }
  //   }

  //   const handleDrag = (destination: number) => {
  //     console.log('dragged')
  //     const newDestination = calcDestination(destination)
  //     console.log(newDestination * 100)
  //     controls.start({ x: `${-newDestination * 100}%` })
  //     setSelectedImageIndex(newDestination)
  //   }

  return (
    <div className="relative w-full aspect-[2/3] md:aspect-square lg:aspect-[2/3] h-full flex flex-col">
      <div className="image-carousel border-b-[0.5px] border-disabled border-opacity-30 md:border-[0.5px] overflow-hidden flex flex-1 items-center w-full h-full">
        {images.map((image, index) => (
          <motion.div
            className="min-w-full h-full relative"
            key={index}
            animate={controls}
            transition={{ duration: 0.2 }}
            // drag="x"
            // dragConstraints={{ left: 0, right: 0 }}
            // dragElastic={1}
            // onDragStart={(e, { point }) => setDragStartX(point.x)}
            // onDragEnd={(e, info) => {
            //   const dragDistance = info.point.x - dragStartX
            //   if (dragDistance > 100) {
            //     handleDrag(selectedImageIndex - 1)
            //   } else if (dragDistance < -100) {
            //     handleDrag(selectedImageIndex + 1)
            //   }
            // }}
          >
            <Image
              className="w-full object-cover"
              alt={`Featured Photo for ${image}`}
              src={urlForImage(image).url()}
              fill
            />
          </motion.div>
        ))}
        <Button
          className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl px-2 opacity-30"
          variant="icon"
          onClick={() => handleCarouselChange(-1)}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </Button>
        <Button
          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-2xl px-2 opacity-40"
          variant="icon"
          onClick={() => handleCarouselChange(1)}
        >
          <ChevronRightIcon className="w-6 h-6" strokeWidth="100" />
        </Button>
      </div>

      <div
        className="flex items-center overflow-x-hidden mt-2"
        ref={containerRef}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`relative min-w-[calc(28%-0.45rem)] md:min-w-[calc(17%-0.45rem)] lg:min-w-[calc(22%-0.45rem)] mx-1 aspect-video cursor-pointer border-2 ${
              index === selectedImageIndex
                ? 'border-white'
                : 'border-disabled opacity-50'
            }`}
            onClick={() => handleSelectThumb(index)}
          >
            <Image
              className="w-full object-cover"
              alt={`Featured Photo for ${image}`}
              src={urlForImage(image).url()}
              fill
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
