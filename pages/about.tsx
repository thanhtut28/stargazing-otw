import ShowcasePage from 'components/showcase/showcase-page'
import { readToken } from 'lib/sanity.api'
import { getAllProducts, getClient, getSettings } from 'lib/sanity.client'
import { Product, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'
import { NextPageWithLayout } from 'types/global'

import Template from './layout/template'

interface PageProps extends SharedPageProps {
  settings: Settings
}

interface Query {
  [key: string]: string
}

const Page: NextPageWithLayout<PageProps> = (props) => {
  const { settings } = props

  console.log(settings)

  return <div />
}

Page.getLayout = (page) => <Template>{page}</Template>

export default Page

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  // demo testing page loading time
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 1000)
  // })

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
