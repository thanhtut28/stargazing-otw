import * as demo from 'lib/demo.data'
import { Settings } from 'lib/sanity.queries'
import Head from 'next/head'

export interface AboutPageHeadProps {
  settings: Settings
}

export default function AboutPageHead({ settings }: AboutPageHeadProps) {
  const { title = demo.title } = settings

  return (
    <Head>
      <title>{`About | ${title}`}</title>
    </Head>
  )
}
