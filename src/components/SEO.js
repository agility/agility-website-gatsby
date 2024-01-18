import React from "react"
import { Helmet } from "react-helmet"
import ReactHtmlParser from "html-react-parser"
import { graphql, useStaticQuery } from "gatsby"

const SEO = ({ page, metaTitle, dynamicPageItem }) => {
  /* Query default SEO Image in content header */

  const query = useStaticQuery(graphql`
    query NewGlobalHeaderQuerySEO {
      agilityGlobalHeader(
        properties: { referenceName: { eq: "globalheader" } }
      ) {
        customFields {
          sEOImage {
            url
            height
            width
          }
        }
      }
    }
  `)

  const defaultSEOImage = query.agilityGlobalHeader.customFields.sEOImage

  if (!page?.seo?.image) {
    page.seo.image = defaultSEOImage
  }

  /* ----------------------- */

  // let title = page.title || "Agility CMS"

  // set up title
  let title

  // use the metatitle if we have that, otherwise fallback to page title
  if (metaTitle) {
    title = metaTitle
  } else {
    title = page.title || "Agility CMS"
  }

  const description = page.seo.metaDescription

  // if (title.indexOf("Agility") === -1) {
  // 	title = `${title} | Agility CMS`;
  // }

  let canonicalUrl = page.seo.canonicalUrl
  if (
    canonicalUrl &&
    canonicalUrl.lastIndexOf("/") !== canonicalUrl.length - 1
  ) {
    //ensure the canonical version of the url ends with /
    canonicalUrl = `${canonicalUrl}/`
  }

  let metaRawHtml = null
  if (page.seo.metaHTML) {
    metaRawHtml = ReactHtmlParser(page.seo.metaHTML)
  }

  return (
    <Helmet
      htmlAttributes={{
        lang: "en-US",
      }}
    >
      <meta charset="utf-8" />
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />

      {/* add no index for blog tags */}
      {dynamicPageItem &&
        dynamicPageItem.properties.referenceName === "blogtags" && (
          <meta name="robots" content="noindex" />
        )}

      <meta property="og:site_name" content="Agility CMS" />
      <meta property="twitter:title" content={title} />
      <meta property="og:title" content={title} />

      <meta name="description" content={description} />
      <meta name="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      <meta
        name="ahrefs-site-verification"
        content="c196da25d25defd7b56d5883e72e28eb7d6be33aeea6f20dfa8a4eee4ce0c427"
      />

      <link
        rel="preload"
        href="https://use.typekit.net/af/7fe570/00000000000000007735a0ee/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3"
        as="font"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://use.typekit.net/af/b0bf15/00000000000000007735a103/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3"
        as="font"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://use.typekit.net/af/1e8fb7/00000000000000007735a0fe/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3"
        as="font"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://use.typekit.net/af/437da9/00000000000000007735a0e5/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3"
        as="font"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://use.typekit.net/arl7bjd.css"
        as="style"
        crossOrigin="anonymous"
      />

      {metaRawHtml}

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {page.seo.twitterCard && (
        <meta property="twitter:card" content={page.seo.twitterCard} />
      )}
      {page.seo.ogType && <meta property="og:type" content={page.seo.ogType} />}
      {page.seo.category && (
        <meta property="og:category" content={page.seo.category} />
      )}

      {page.seo.image && (
        <meta property="og:image" content={page.seo.image.url} />
      )}
      {page.seo.image && (
        <meta property="twitter:image" content={page.seo.image.url} />
      )}

      {page.seo.image && page.seo.image.width > 0 && (
        <meta property="og:image:width" content={page.seo.image.width} />
      )}
      {page.seo.image && page.seo.image.height > 0 && (
        <meta property="og:image:height" content={page.seo.image.height} />
      )}

      {page.seo.structData && (
        <script type="application/ld+json">{page.seo.structData}</script>
      )}

      <script
        data-ad-client="ca-pub-3611718999392133"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ></script>

      <link rel="dns-prefetch" href="//static.agilitycms.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googleadservices.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//p.typekit.net" />
      <link rel="dns-prefetch" href="//use.typekit.net" />
      <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />

      <link rel="preconnect" href="//t.co" />
      <link rel="preconnect" href="//www.google.com" />
      <link rel="preconnect" href="//www.google-analytics.com" />
      <link rel="preconnect" href="//api-iam.intercom.io" />
      <link rel="preconnect" href="//p.typekit.net" />
      <link rel="preconnect" href="//use.typekit.net" />
      <link rel="preconnect" href="//cdnjs.cloudflare.com" />


      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />


      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />


      <link
        rel="preload"
        href="/fonts/icomoon.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        crossOrigin="anonymous"
        href="https://use.typekit.net/arl7bjd.css"
        type="text/css"
        media="screen and (min-width: 1px)"
      />

      {/* <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="https://static.agilitycms.com/layout/fonts/Mulisemibold.woff2" />
			<link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="https://static.agilitycms.com/layout/fonts/Muliextrabold.woff2" />
			<link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="https://static.agilitycms.com/layout/fonts/Mulibold.woff2" />
			<link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="https://static.agilitycms.com/layout/fonts/Muliregular.woff2" />

			<link rel="stylesheet" href="/fonts.css" /> */}
    </Helmet>
  )
}

export default SEO
