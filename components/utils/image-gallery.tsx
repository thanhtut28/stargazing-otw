import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import cn from 'classnames'
import Button from 'components/utils/button'
import { motion, useAnimation } from 'framer-motion'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

interface ImageGalleryProps {
  images: string[]
  sizeChart: string
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, sizeChart }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const imagesArr = [...images, ...(sizeChart ? [sizeChart] : [])]
  // const [dragStartX, setDragStartX] = useState(0)
  const containerRef = useRef(null)
  const controls = useAnimation()
  const isMoreThanOneImage = imagesArr.length > 1

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

            const scrollDuration = 0.3
            containerRef.current.style.scrollBehavior = 'smooth'
            containerRef.current.scrollLeft = scrollX

            // Reset scroll behavior after the animation is completed
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
      (selectedImageIndex + direction + imagesArr.length) % imagesArr.length

    await controls.start({
      x: `-${100 * newIndex}%`,
    })

    setSelectedImageIndex(newIndex)
  }

  const handleSelectThumb = (destination: number) => {
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
    <div className="relative w-full aspect-[2/3] md:aspect-square lg:aspect-[2/3] flex flex-col">
      <div className="image-carousel border-b-[0.5px] border-disabled border-opacity-30 md:border-[0.5px] overflow-hidden flex flex-1 items-center w-full h-full">
        {imagesArr.map((image, index) => (
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
              className={cn(`w-full`, {
                'object-cover': image !== sizeChart,
                'object-contain': image === sizeChart,
              })}
              alt={`Featured Photo for ${image}`}
              src={urlForImage(image).url()}
              priority
              quality={100}
              fill
            />
          </motion.div>
        ))}
        {isMoreThanOneImage && (
          <>
            <Button
              className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl px-2"
              variant="icon"
              onClick={() => handleCarouselChange(-1)}
            >
              <ChevronLeftIcon className="w-5 h-4" />
            </Button>
            <Button
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-2xl px-2"
              variant="icon"
              onClick={() => handleCarouselChange(1)}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      <div
        className="flex items-center overflow-x-hidden mt-2"
        ref={containerRef}
      >
        {imagesArr.map((image, index) => (
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
              priority
              quality={50}
              fill
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
