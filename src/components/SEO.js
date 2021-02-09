import React from 'react'
import { Helmet } from "react-helmet"
import ReactHtmlParser from 'react-html-parser';


const SEO = ({ page }) => {

	let title = page.title
	const description = page.seo.metaDescription;

	//if (title.indexOf("Agility") === -1) title += " - Agility CMS";

	let canonicalUrl = page.seo.canonicalUrl;
	if (canonicalUrl && canonicalUrl.lastIndexOf("/") !== canonicalUrl.length - 1) {
		//ensure the canonical version of the url ends with /
		canonicalUrl = `${canonicalUrl}/`;
	}

	let metaRawHtml = null
	if (page.seo.metaHTML) {
		metaRawHtml = ReactHtmlParser(page.seo.metaHTML)
	}


	return (
		<Helmet>
			<meta charset="utf-8" />
			<title>{title}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
			<meta http-equiv="X-UA-Compatible" content="IE=edge"/>

			<meta property="og:site_name" content="Agility CMS" />
			<meta property="twitter:title" content={title} />
			<meta property="og:title" content={title} />

			<meta name="description" content={description} />
			<meta name="og:description" content={description} />
			<meta name="twitter:description" content={description} />

			<meta name="ahrefs-site-verification" content="c196da25d25defd7b56d5883e72e28eb7d6be33aeea6f20dfa8a4eee4ce0c427" />

			{ metaRawHtml }

			{canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
			{page.seo.twitterCard && <meta property="twitter:card" content={page.seo.twitterCard} />}
			{page.seo.ogType && <meta property="og:type" content={page.seo.ogType} />}
			{page.seo.category && <meta property="og:category" content={page.seo.category} />}

			{page.seo.image && <meta property="og:image" content={page.seo.image.url} />}
			{page.seo.image && <meta property="twitter:image" content={page.seo.image.url} />}

			{page.seo.image && page.seo.image.width > 0 && <meta property="og:image:width" content={page.seo.image.width} />}
			{page.seo.image && page.seo.image.height > 0 && <meta property="og:image:height" content={page.seo.image.height} />}

			{page.seo.structData && <script type="application/ld+json">{page.seo.structData}</script>}


			<link rel="dns-prefetch" href="//static.agilitycms.com" />
			<link rel="dns-prefetch" href="//www.google-analytics.com" />
			<link rel="dns-prefetch" href="//www.googleadservices.com" />
			<link rel="dns-prefetch" href="//www.googletagmanager.com" />

			<link rel="dns-prefetch" href="//t.co" />
			<link rel="dns-prefetch" href="//stats.g.doubleclick.net" />
			<link rel="dns-prefetch" href="//www.google.com" />
			<link rel="dns-prefetch" href="//s.amazon-adsystem.com" />
			<link rel="dns-prefetch" href="//snap.licdn.com" />

			<link rel="dns-prefetch" href="//px.ads.linkedin.com" />
			<link rel="dns-prefetch" href="//p.adsymptotic.com" />
			<link rel="dns-prefetch" href="//fonts.googleapis.com" />
			<link rel="dns-prefetch" href="//www.facebook.com" />
			<link rel="dns-prefetch" href="//js.convertflow.co" />
			<link rel="dns-prefetch" href="//apps.elfsight.comv" />
			<link rel="dns-prefetch" href="//static.elfsight.com" />
			<link rel="dns-prefetch" href="//googleads.g.doubleclick.net" />
			<link rel="dns-prefetch" href="//www.google.ca" />
			<link rel="dns-prefetch" href="//connect.facebook.net" />
			<link rel="dns-prefetch" href="//ajax.googleapis.com" />
			<link rel="dns-prefetch" href="//tracking.g2crowd.com" />

			<link rel="dns-prefetch" href="//app.convertflow.co" />
			<link rel="dns-prefetch" href="//pixel.advertising.com" />
			<link rel="dns-prefetch" href="//dsum-sec.casalemedia.com" />
			<link rel="dns-prefetch" href="//pixel.rubiconproject.com" />
			<link rel="dns-prefetch" href="//simage2.pubmatic.com" />
			<link rel="dns-prefetch" href="//sync.outbrain.com" />
			<link rel="dns-prefetch" href="//eb2.3lift.com" />
			<link rel="dns-prefetch" href="//x.bidswitch.net" />
			<link rel="dns-prefetch" href="//ib.adnxs.com" />
			<link rel="dns-prefetch" href="//us-u.openx.net" />
			<link rel="dns-prefetch" href="//idsync.rlcdn.com" />
			<link rel="dns-prefetch" href="//t.visitorqueue.com" />

			<link rel="dns-prefetch" href="//cdn.popt.in" />
			<link rel="dns-prefetch" href="//t.co" />
			<link rel="dns-prefetch" href="//a.visitorqueue.com" />
			<link rel="dns-prefetch" href="//analytics.twitter.com" />
			<link rel="dns-prefetch" href="//static.ads-twitter.com" />
			<link rel="dns-prefetch" href="//stats.g.doubleclick.net" />
			<link rel="dns-prefetch" href="//px.ads.linkedin.com" />
			<link rel="dns-prefetch" href="//x.bidswitch.net" />
			<link rel="dns-prefetch" href="//www.linkedin.com" />
			<link rel="dns-prefetch" href="//www.google.com" />
			<link rel="dns-prefetch" href="//www.google-analytics.com" />
			<link rel="dns-prefetch" href="//diffuser-cdn.app-us1.com" />
			<link rel="dns-prefetch" href="//p.adsymptotic.com" />
			<link rel="dns-prefetch" href="//t.visitorqueue.com" />
			<link rel="dns-prefetch" href="//tracking.g2crowd.com" />
			<link rel="dns-prefetch" href="//snap.licdn.com" />
			<link rel="dns-prefetch" href="//js.intercomcdn.com" />
			<link rel="dns-prefetch" href="//widget.intercom.io" />
			<link rel="dns-prefetch" href="//px.ads.linkedin.com" />
			<link rel="dns-prefetch" href="//api-iam.intercom.io" />
			<link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
			<link rel="dns-prefetch" href="//www.google.com" />
			<link rel="dns-prefetch" href="//www.googletagmanager.com" />

			<link rel="preconnect" href="//cdn.popt.in" />
			<link rel="preconnect" href="//t.co" />
			<link rel="preconnect" href="//a.visitorqueue.com" />
			<link rel="preconnect" href="//analytics.twitter.com" />
			<link rel="preconnect" href="//static.ads-twitter.com" />
			<link rel="preconnect" href="//stats.g.doubleclick.net" />
			<link rel="preconnect" href="//px.ads.linkedin.com" />
			<link rel="preconnect" href="//x.bidswitch.net" />
			<link rel="preconnect" href="//www.linkedin.com" />
			<link rel="preconnect" href="//www.google.com" />
			<link rel="preconnect" href="//www.google-analytics.com" />
			<link rel="preconnect" href="//diffuser-cdn.app-us1.com" />
			<link rel="preconnect" href="//p.adsymptotic.com" />
			<link rel="preconnect" href="//t.visitorqueue.com" />
			<link rel="preconnect" href="//tracking.g2crowd.com" />
			<link rel="preconnect" href="//snap.licdn.com" />
			<link rel="preconnect" href="//js.intercomcdn.com" />
			<link rel="preconnect" href="//widget.intercom.io" />
			<link rel="preconnect" href="//px.ads.linkedin.com" />
			<link rel="preconnect" href="//api-iam.intercom.io" />
			<link rel="preconnect" href="//cdnjs.cloudflare.com" />
			<link rel="preconnect" href="//www.google.com" />
			<link rel="preconnect" href="//www.googletagmanager.com" />

			<link rel="apple-touch-icon" sizes="114x114" href="https://static.agilitycms.com/favicon-web/apple-touch-icon-144x144.png"/>
			<meta name="apple-mobile-web-app-capable" content="yes"/>
			<meta name="apple-mobile-web-app-status-bar-style" content="black"/>

			<link rel="apple-touch-startup-image" href="https://static.agilitycms.com/favicon-web/apple-touch-icon-152x152.png" />
			<link rel="apple-touch-icon-precomposed" sizes="57x57" href="https://static.agilitycms.com/favicon-web/apple-touch-icon-57x57.png" />
			<link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://static.agilitycms.com/favicon-web/apple-touch-icon-114x114.png" />
			<link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://static.agilitycms.com/favicon-web/apple-touch-icon-72x72.png" />
			<link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://static.agilitycms.com/favicon-web/apple-touch-icon-144x144.png" />
			<link rel="apple-touch-icon-precomposed" sizes="60x60" href="https://static.agilitycms.com/favicon-web/apple-touch-icon-60x60.png" />
			<link rel="apple-touch-icon-precomposed" sizes="120x120" href="https://static.agilitycms.com/favicon-web/apple-touch-icon-120x120.png" />
			<link rel="apple-touch-icon-precomposed" sizes="76x76" href="https://static.agilitycms.com/favicon-web/apple-touch-icon-76x76.png" />
			<link rel="apple-touch-icon-precomposed" sizes="152x152" href="https://static.agilitycms.com/favicon-web/apple-touch-icon-152x152.png" />
			<link rel="icon" type="image/png" href="https://static.agilitycms.com/favicon-web/favicon-196x196.png" sizes="196x196" />
			<link rel="icon" type="image/png" href="https://static.agilitycms.com/favicon-web/favicon-96x96.png" sizes="96x96" />
			<link rel="icon" type="image/png" href="https://static.agilitycms.com/favicon-web/favicon-32x32.png" sizes="32x32" />
			<link rel="icon" type="image/png" href="https://static.agilitycms.com/favicon-web/favicon-16x16.png" sizes="16x16" />
			<link rel="icon" type="image/png" href="https://static.agilitycms.com/favicon-web/favicon-128.png" sizes="128x128" />
			<meta name="msapplication-TileColor" content="#FFFFFF" />
			<meta name="msapplication-TileImage" content="https://static.agilitycms.com/favicon-web/mstile-144x144.png" />
			<meta name="msapplication-square70x70logo" content="https://static.agilitycms.com/favicon-web/mstile-70x70.png" />
			<meta name="msapplication-square150x150logo" content="https://static.agilitycms.com/favicon-web/mstile-150x150.png" />
			<meta name="msapplication-wide310x150logo" content="https://static.agilitycms.com/favicon-web/mstile-310x150.png" />
			<meta name="msapplication-square310x310logo" content="https://static.agilitycms.com/favicon-web/mstile-310x310.png" />

			<link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="https://static.agilitycms.com/layout/fonts/Mulisemibold.woff2" />
			<link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="https://static.agilitycms.com/layout/fonts/Muliextrabold.woff2" />
			<link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="https://static.agilitycms.com/layout/fonts/Mulibold.woff2" />
			<link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="https://static.agilitycms.com/layout/fonts/Muliregular.woff2" />

			<link rel="stylesheet" href="/fonts.css" />

		</Helmet>
	)
}

export default SEO;

