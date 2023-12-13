import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import React from 'react'

interface Props {
  images: any[]
}

const Partners: React.FC<Props> = ({ images }) => {
  const imgs = images.map((img) => img?.asset?._ref)

  return (
    <div>
      <RetailHeader />
      <div className="w-full max-w-screen-xl mx-auto p-4 flex justify-between">
        {imgs.map((img) => (
          <div className="relative w-full h-full aspect-square" key={img}>
            <Image
              className="w-full object-cover"
              alt={`Featured Photo for ${img}`}
              src={urlForImage(img).url()}
              priority
              placeholder="blur"
              fill
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Partners

const RetailHeader = () => (
  <div className="whitespace-nowrap overflow-x-hidden flex">
    <h2 className="font-sans text-[20vw] pr-[7vw] relative tracking-tighter font-bold uppercase animate-marquee">
      Retail Partners
    </h2>
    <h2 className="font-sans text-[20vw] pr-[7vw] relative tracking-tighter font-bold uppercase animate-marquee">
      Retail Partners
    </h2>
    <h2 className="font-sans text-[20vw] pr-[7vw] relative tracking-tighter font-bold uppercase animate-marquee">
      Retail Partners
    </h2>
  </div>
)
