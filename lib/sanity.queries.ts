import { groq } from 'next-sanity'

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

const productFields = groq`
  _id,
  name,
  itemType,
  releaseDate,
  featuredImage,
  pictures,
  sizeChart,
  price,
  description,
  disclaimer,
  soldout,
  "slug": slug.current,
  variants,
`

const settingsFields = groq`
  title,
  description,
  ogImage,  
  brushImage,
  heroImages,
  featuredImages,
  partnersImages,
  "heroVideo": heroVideo.asset->url,
`

export const settingsQuery = groq`*[_type == "settings"][0]{
  ${settingsFields}
}`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const showcaseQuery = groq`
*[_type == "product"] | order(releaseDate desc) {
  ${productFields}
}
`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`
export const productSlugsQuery = groq`
*[_type == 'product' && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export const productBySlugQuery = groq`
*[_type == "product" && slug.current == $slug][0] {
  ${productFields}
}
`

export interface Author {
  name?: string
  picture?: any
}

export interface Post {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  slug?: string
  content?: any
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
  heroVideo: any
  featuredImages: any[]
  partnersImages: any[]
}

export interface Product {
  _id: string
  name: string
  slug: string
  itemType: string
  releaseDate: string
  description?: string
  disclaimer?: string
  featuredImage: any
  pictures: any[]
  sizeChart: any
  price: number
  soldout?: boolean
  variants: Variant[]
}

export interface Variant {
  color?: string
  sizes?: Size[]
}

export interface Size {
  size?: string
  stock: boolean
}
