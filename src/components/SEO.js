import React from 'react'
import { Helmet } from "react-helmet"

const SEO = ({ page }) => {

	const title = page.title
	const description = page.seo.metaDescription


	return (
		<Helmet>
			<meta charSet="utf-8" />
			<title>{title}</title>
			<meta name="description" content={description} />
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

