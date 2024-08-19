require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
})

//configure your agility plugin with environment variables so that
//your agility api credentials stay secure
const agilityConfig = {
	guid: process.env.AGILITY_GUID,
	apiKey: process.env.AGILITY_API_KEY,
	isPreview: process.env.AGILITY_API_ISPREVIEW === "true"
}

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	flags: {
		DEV_SSR: false
	},
	siteMetadata: {
		title: "Agility CMS",
		siteUrl: `https://agilitycms.com`,

	},
	plugins: [
		`gatsby-plugin-sass`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-image`,
		`gatsby-plugin-gatsby-cloud`,
		`gatsby-plugin-loadable-components-ssr`,
		{
			resolve: `gatsby-plugin-netlify`,
			options: {
				headers: {
					"/*": [
						"Content-Security-Policy: frame-ancestors 'self' https://*.agilitycms.com https://*.publishwithagility.com:*;",
					],
				},
			}, // option to add more headers. `Link` headers are transformed by the below criteria
			allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
			mergeSecurityHeaders: true, // boolean to turn off the default security headers
			mergeCachingHeaders: true, // boolean to turn off the default caching headers
			transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
			generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
		},

		{
			//the name of the plugin
			resolve: "@agility/gatsby-source-agilitycms",
			//the options for our plugin
			options: {
				//your Agility Content Fetch API Guid
				guid: agilityConfig.guid,
				//your Agility Content Fetch API Key
				apiKey: agilityConfig.apiKey,
				//set this to true if you are using the preview API Key
				isPreview: agilityConfig.isPreview,
				//set this to true to see expanded traces in the build logs
				debug: false,
				//the languages you want to source content for
				languages: [{
					// The name of the language code
					name: "English",
					// The actual language code set in Agility CMS
					code: "en-ca",
					// The name to be used in the URL path that represents the current language
					path: "en"
				}],
				// The channels you want to include
				channels: [{
					// The reference name for the website channel as it is defined in Agility CMS
					referenceName: "website"
				}],
				//the page template that will be used to render Agility CMS pages
				masterPageTemplate: "./src/AgilityPage.js"
			},
		},
		{
			resolve: "gatsby-plugin-google-tagmanager",
			options: {
				id: "GTM-NJW8WMX", //Agilitycms.com - Gatsby Container
				includeInDevelopment: false
			},
		},
		{
			resolve: "gatsby-plugin-hubspot",
			options: {
				trackingCode: "23239214",
				respectDNT: false,
				productionOnly: true,
			},
		},
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				output: `/`,
				entryLimit: 1000,
				query: `
				{
					allSitePage: allAgilitySitemapNode(
						filter: {visible: {sitemap: {eq: true}}, redirect: {url: {eq: null}}, isFolder: {eq: false}}
					  ) {
						nodes {
						  path
						}
					  }
				  }`,
				resolveSiteUrl: () => "https://agilitycms.com",
				serialize: (p) => {
					let path = p.path
					if (path === "/home") {
						return {
							url: `/`,
							changefreq: `daily`,
							priority: 0.7
						}
					} else {
						return {
							url: `${p.path}`,
							changefreq: `daily`,
							priority: 0.7
						}
					}
				}

			}
		},
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
				{
				  site {
					siteMetadata {
					  title
					  siteUrl
					  site_url: siteUrl
					}
				  }
				}
			  `,
				feeds: [
					{
						serialize: ({ query: { site, allAgilityBlogPost } }) => {
							return allAgilityBlogPost.nodes.map(node => {
								return {
									title: node.customFields.title,
									description: node.customFields.excerpt,
									date: node.customFields.date,
									url: 'https://agilitycms.com/resources/posts/' + node.customFields.uRL,
									guid: node.id,
									enclosure: node.customFields.postImage && {
										url: node.customFields.postImage.url
									},

								}
							})
						},
						query: `
					{
						allAgilityBlogPost(filter: {properties: {referenceName: {eq: "blogposts"}}}, sort: {fields: customFields___date, order: DESC}, limit: 100) {
							nodes {
								id
								customFields {
									title
									excerpt
									uRL
									date
									postImage {
										url
										label
									}
								}
							}
						  }
					}
				  `,
						output: "/posts.xml",
						title: "Agility CMS Blog",
					},
				],
			},
		},


	],
}
