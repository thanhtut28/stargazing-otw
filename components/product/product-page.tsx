import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import MoreStories from 'components/MoreStories'
import PostPageHead from 'components/post/PostPageHead'
import PostBody from 'components/post/PostBody'
import PostHeader from 'components/post/PostHeader'
import PostTitle from 'components/post/PostTitle'
import SectionSeparator from 'components/SectionSeparator'
import * as demo from 'lib/demo.data'
import type { Post, Product, Settings } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  product: Product
  settings: Settings
}

const NO_POSTS: Post[] = []

export default function ProductPage(props: PostPageProps) {
  const { preview, loading, product, settings } = props
  const { title = demo.title } = settings || {}

  const slug = product?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <>
      {/* <PostPageHead settings={settings} post={post} /> */}

      <Layout preview={preview} loading={loading}>
        <Container>
          {preview && !product ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              {/* <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} /> */}
            </>
          )}
        </Container>
      </Layout>
    </>
  )
}
