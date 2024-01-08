import { urlForImage } from 'lib/sanity.image'
import type { Settings } from 'lib/sanity.queries'
import Image from 'next/image'

import TitleC from '../utils/page-title'
import Container from './about-container'
import AboutPageHead from './about-page-head'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  settings: Settings
}

export default function ShowcasePage(props: IndexPageProps) {
  const { settings } = props

  const aboutImgSrc = settings?.aboutImage?.asset?._ref

  console.log(aboutImgSrc)

  return (
    <>
      <AboutPageHead settings={settings} />

      <Container>
        <TitleC title="about us" />
        <div className="flex py-10 px-2 sm:px-4 md:px-8 lg:px-10 max-w-screen-lg mx-auto gap-4 items-stretch">
          <div className="flex-1">
            <div className="flex flex-col justify-between h-full">
              <p className="text-xs sm:text-sm md:text-lg">
                Discover a curated selection of streetwear essentials from our
                local brand. Explore our collection now and redefine your urban
                aesthetic.
              </p>
              <div className="flex flex-col items-end">
                <h6 className="text-xs md:text-sm lg:text-base text-secondary">
                  Founded In
                </h6>
                <p className="text-sm md:text-base lg:text-lg">2023</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative w-full aspect-[2/3]">
              <Image
                className="w-full object-cover grayscale"
                alt={`About Photo`}
                src={urlForImage(aboutImgSrc).url()}
                priority
                fill
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
