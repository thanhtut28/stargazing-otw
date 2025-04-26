import LandingPage from 'components/home/landing-page'
import { readToken } from 'lib/sanity.api'
import { getClient, getSettings } from 'lib/sanity.client'
import { Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { NextPageWithLayout } from 'types/global'

import { SharedPageProps } from './_app'
import Template from './layout/template'

interface PageProps extends SharedPageProps {
  settings: Settings
}

interface Query {
  [key: string]: string
}

const Home: NextPageWithLayout<PageProps> = (props) => {
  const { draftMode, settings } = props

  // if (draftMode) {
  //   return <PreviewIndexPage posts={posts} settings={settings} />
  // }

  return <LandingPage settings={settings} />
}

Home.getLayout = (page) => <Template>{page}</Template>

export default Home

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const settings = await getSettings(client)

  return {
    props: {
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
    revalidate: 1,
  }
}
