import React from 'react'
import { Helmet } from "react-helmet"

const SEO = ({ page }) => {

	let title = page.title
	const description = page.seo.metaDescription;

	if (title.indexOf("Agility") === -1) title += " - Agility CMS";

	return (
		<Helmet>
			<meta charSet="utf-8" />
			<title>{title}</title>

			<meta property="og:site_name" content="Agility CMS" />
			<meta property="twitter:title" content={title} />
		 	<meta property="og:title" content={title} />

			<meta name="description" content={description} />
			<meta name="og:description" content={description} />
			<meta name="twitter:description" content={description} />


			{page.seo.twitterCard && <meta property="twitter:card" content={page.seo.twitterCard} /> }
			{page.seo.ogType && <meta property="og:type" content={page.seo.ogType} /> }
			{page.seo.category && <meta property="og:category" content={page.seo.category} /> }

			{page.seo.image && <meta property="og:image" content={page.seo.image.url} /> }
			{page.seo.image && <meta property="twitter:image" content={page.seo.image.url} /> }

			{page.seo.image && page.seo.image.width > 0 && <meta property="og:image:width" content={page.seo.image.width} /> }
			{page.seo.image && page.seo.image.height > 0 && <meta property="og:image:height" content={page.seo.image.height} /> }


			<link rel="dns-prefetch" href="//static.agilitycms.com" />
			<link rel="dns-prefetch" href="//www.google-analytics.com" />
			<link rel="dns-prefetch" href="//www.googleadservices.com" />
			<link rel="dns-prefetch" href="//www.googletagmanager.com" />
			<link rel="dns-prefetch" href="//vars.hotjar.com" />
			<link rel="dns-prefetch" href="//in.hotjar.com" />
			<link rel="dns-prefetch" href="//script.hotjar.com" />
			<link rel="dns-prefetch" href="//d.adroll.mgr.consensu.org" />
			<link rel="dns-prefetch" href="//d.adroll.com" />
			<link rel="dns-prefetch" href="//ups.analytics.yahoo.com" />
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
			<link rel="dns-prefetch" href="//s.adroll.com" />

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

		</Helmet>
	)
}

export default SEO;

