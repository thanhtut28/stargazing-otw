import * as demo from 'lib/demo.data'
import { Settings } from 'lib/sanity.queries'
import Head from 'next/head'

export interface ShowcasePageHeadProps {
  settings: Settings
}

export default function ShowcasePageHead({ settings }: ShowcasePageHeadProps) {
  const { title = demo.title } = settings

  return (
    <Head>
      <title>{`About | ${title}`}</title>
    </Head>
  )
}
