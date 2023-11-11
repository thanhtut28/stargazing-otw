import * as demo from 'lib/demo.data'
import type { Settings } from 'lib/sanity.queries'

import HeroSection from './hero-section'
import Container from './landing-container'
import IndexPageHead from './landing-page-head'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  settings: Settings
}

export default function LandingPage({ settings }: IndexPageProps) {
  const { brushImage, heroImages } = settings

  return (
    <>
      <IndexPageHead settings={settings} />
      <Container>
        <HeroSection brushImage={brushImage} heroImages={heroImages} />
      </Container>
    </>
  )
}
