/**
 * All the shared stuff that goes into <head> on `(blog)` routes, can be be imported by `head.tsx` files in the /app dir or wrapped in a <Head> component in the /pages dir.
 */

export default function BlogMeta() {
  return (
    <>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="../public/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="../public/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="../public/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="../public/favicon/site.webmanifest" />
      <link rel="shortcut icon" href="../public/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta
        name="msapplication-config"
        content="../public/favicon/browserconfig.xml"
      />
      <meta name="theme-color" content="#000000" />
    </>
  )
}
