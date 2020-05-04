require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
})

//configure your agility plugin with environment variables so that
//your agility api credentials stay secure
const agilityConfig = {
	guid: process.env.AGILITY_GUID,
	apiKey: process.env.AGILITY_API_KEY,
	isPreview: process.env.AGILITY_API_ISPREVIEW
}

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	siteMetadata: {
		title: "Agility CMS",
		siteUrl: `https://agilitycms.com`,

	},
	plugins: [
		`gatsby-plugin-sass`,
		`gatsby-plugin-netlify`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-netlify`,
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
			resolve: 'gatsby-plugin-intercom-spa',
			options: {
				app_id: 'ipjo8vwm',
				include_in_development: true,
				delay_timeout: 1500
			}
		},
		{
			resolve: `gatsby-plugin-advanced-sitemap`,
			options: {
				output: `/sitemap.xml`,
				//exclude: [`/category/*`, `/path/to/page`],
				createLinkInHead: true,
				addUncaughtPages: false,
				query: `
				{
					allAgilitySitemapNode(filter: {visible: {sitemap: {eq: true}}}) {

						edges {
						  node {
							id
							slug: path,
							url:path
						  }
						}
					  }
					  site {
						siteMetadata {
						  siteUrl
						}
					  }
			  	}`,
				  mapping: {
					// Each data type can be mapped to a predefined sitemap
					// Routes can be grouped in one of: posts, tags, authors, pages, or a custom name
					// The default sitemap - if none is passed - will be pages
					allAgilitySitemapNode: {
						sitemap: `pages`,
					},
				},
			}
		}

	],
}
