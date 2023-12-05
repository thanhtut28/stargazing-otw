import * as demo from 'lib/demo.data'
import type { Settings } from 'lib/sanity.queries'

import FeaturesSection from './features-section'
import HeroSection from './hero-section'
import Container from './landing-container'
import IndexPageHead from './landing-page-head'
import Partners from './partners'
import Divider from 'components/utils/divider'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  settings: Settings
}

export default function LandingPage({ settings }: IndexPageProps) {
  const { featuredImages, heroVideo } = settings

  console.log(settings)

  return (
    <>
      <IndexPageHead settings={settings} />
      <Container>
        <HeroSection heroVideo={heroVideo} />
        <Divider />
        <FeaturesSection featuredImages={featuredImages} />
        <Divider />
        <Partners />
      </Container>
    </>
  )
}
