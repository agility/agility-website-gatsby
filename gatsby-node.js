const agility = require('./src/agility/utils')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const contentFetch = require('@agility/content-fetch')
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
})
const agilityConfig = {
	guid: process.env.AGILITY_GUID,
	apiKey: process.env.AGILITY_API_KEY,
	isPreview: process.env.AGILITY_API_ISPREVIEW === "true"
}
//gatsy-node.js
//CREATE RESOLVERS *******************************************************************************************
exports.createResolvers = (args) => {
	// console.log("AGILITY WEBSITE: Creating Resolvers...")

	const { createResolvers, getNode, createNodeId, createNode, createContentDigest, configOptions } = args;

	const resolvers = {

		//on the 'agilityPost' node type...
		// agilityPost: {
		// 	//get the sitemap node that represents this item - useful for retrieving the URL for the item
		// 	sitemapNode: agility.getDynamicPageItemSitemapNode(),

		// 	//[Not Implemented]
		// 	//if we had a linked content field for 'author', this is how we'd get the author for this post in a single GraphQl query
		// 	//linkedContent_agilityAuthor: agility.getLinkedContentItem({ type: 'agilityAuthor', linkedContentFieldName: 'author' })
		// },
		agilityGlobalHeader: {
			preHeaderLinks: agility.getLinkedContentList({ type: 'agilityLink', linkedContentFieldName: 'preHeaderLinks' }),
			menuStructure: agility.getLinkedContentList({ type: 'agilityNavigationTopLevel', linkedContentFieldName: 'menuStructure' }),
		},
		agilityNavigationTopLevel: {
			subNavigation: agility.getLinkedContentList({ type: 'agilityLink', linkedContentFieldName: 'subNavigation' }),
			megaContent: agility.getLinkedContentList({ type: 'agilityNavigationMegaMenuContent', linkedContentFieldName: 'megaContent' }),
		},
		agilityGlobalFooter: {
			column1Links: agility.getLinkedContentList({ type: 'agilityLink', linkedContentFieldName: 'column1Links' }),
			column2Links: agility.getLinkedContentList({ type: 'agilityLink', linkedContentFieldName: 'column2Links' }),
			column3Links: agility.getLinkedContentList({ type: 'agilityLink', linkedContentFieldName: 'column3Links' }),
			column4Links: agility.getLinkedContentList({ type: 'agilityLink', linkedContentFieldName: 'column4Links' }),
			followLinks: agility.getLinkedContentList({ type: 'agilitySocialFollowLink', linkedContentFieldName: 'followLinks' }),
			bottomLinks: agility.getLinkedContentList({ type: 'agilityLink', linkedContentFieldName: 'bottomLinks' })
		},
		agilityPricingPlan: {
			components: agility.getLinkedContentList({ type: 'agilityPricingPlanComponent', linkedContentFieldName: 'components' }),
			features: agility.getLinkedContentList({ type: 'agilityPricingPlanFeature', linkedContentFieldName: 'features' }),
			pricingPlanTier: agility.getLinkedContentItem({ type: 'agilityPricingPlanTier', linkedContentFieldName: 'pricingPlanTier' })
		},
		agilityPricingPlanTier: {
			features: agility.getLinkedContentList({ type: 'agilityPricingPlanFeature', linkedContentFieldName: 'features' })
		},

		agilityBlogPost: {
			category: agility.getLinkedContentItem({ type: 'agilityBlogCategory', linkedContentFieldName: 'categories' }),
			author: agility.getLinkedContentItem({ type: 'agilityBlogAuthor', linkedContentFieldName: 'author' }),
			tags: agility.getLinkedContentList({ type: 'agilityBlogTag', linkedContentFieldName: 'blogTags' })
		},
		agilityPartner: {
			customTags: agility.getLinkedContentList({ type: 'agilityCustomTag', linkedContentFieldName: 'customTags' })
		},
		agilityProjectTemplate: {
			frameworks: agility.getLinkedContentList({ type: 'agilityProjectTemplateFramework', linkedContentFieldName: 'frameworks' })
		},

		//[Not Implemented]
		//if we had an 'Image Slider' module and it had a list of slides via a linked content field called 'slides', this is how we'd retrieve a list of those slides in a single GraphQL query
		// agilityImageSlider: {
		//     linkedContent_agilitySlides: agility.getLinkedContentList({ type: 'agilitySlide', linkedContentFieldName: 'slides' })
		// }
	}
	createResolvers(resolvers)
}

exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions
	const typeDefs = `
    type agilityFeatureListItemCustomFields implements Node {
      moreInfoLink: agilityFeatureListItemCustomFieldsMoreInfoLink
		}
		type agilityFeatureListItemCustomFieldsMoreInfoLink {
			href: String,
			target: String,
			text:String
		}
    type agilityGlobalHeaderCustomFields implements Node {
      contactus: agilityGlobalHeaderCustomFieldsContactus
			marketingBannerButton: agilityGlobalHeaderCustomFieldsMarketingButton
		}
		type agilityGlobalHeaderCustomFieldsContactus {
			href: String,
			target: String,
			text:String
		}
		type agilityGlobalHeaderCustomFieldsMarketingButton {
			href: String,
			target: String,
			text:String
		}
		type agilityPackageFeaturesCustomFields implements Node {
			description: String
		}
		type agilityPricingPackagesCustomFields implements Node {
			pricingPlan: String,
			yearlyPricingPlan: String,
			yearlyCTAButton: agilityPricingPackagesCustomFieldsYearlyCTAButton,
			yearlySaleCost: String
		}
		type agilityPricingPackagesCustomFieldsYearlyCTAButton {
			href: String,
			target: String,
			text:String
		}
		type agilityCaseStudyCustomFields {
			caseStudyIndustries_TextField: String
			caseStudyChallenges_TextField: String
		}
		type agilityJob implements Node {
			languageCode: String,
			contentID: Int,
			properties: agilityJobProperties,
			customFields: agilityJobCustomFields
		}
		type agilityJobProperties {
			referenceName: String,
			itemOrder: Int
		}
		type agilityJobCustomFields {
			title: String,
			textblob: String,
			icon: agilityJobCustomFieldsIcon
			bottomLink: agilityJobCustomFieldsBottomLink
		}
		type agilityJobCustomFieldsIcon {
			label: String,
			url: String
		}
		type agilityJobCustomFieldsBottomLink {
			href: String,
			target: String,
			text: String
		}
		type agilityResourceCustomFields {
			topReads_TextField: String,
			downloadButtonText: String,
			topWebinars_TextField: String,
			topWebinars_ValueField: String,
			resourceTopics_TextField: String,
			resourceTopics_ValueField: String,
			topReads_ValueField: String,
			thankYouContent: String,

			autopilotJourneyTrigger: String,
			uRLGatedContent: String,

			bookCover: agilityResourceCustomFieldsBookCover,
			resourceTopics: agilityResourceCustomFieldsResourceTopics,
			topReads: agilityResourceCustomFieldsTopReads,
			topWebinars: agilityResourceCustomFieldsTopWebinars
		}
		type agilityResourceCustomFieldsBookCover {
			url: String
			filesize: Int
			pixelWidth: String
			height: Int
			width: Int
		}

		 type agilityResourceCustomFieldsResourceTopics {
			referencename: String
			sortids: String
		 }
		 type agilityResourceCustomFieldsTopReads {
			referencename: String
			sortids: String
		 }
		 type agilityResourceCustomFieldsTopWebinars {
			referencename: String
			sortids: String
		 }
  `
	createTypes(typeDefs)
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
			fallback: {
        util: require.resolve("util/")
      }
    },
  })
}

exports.onCreateNode = async ({
  node, // the node that was just created
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
}) => {
	try {
		if (['agilityCaseStudy', 'agilityPartner', 'agilityIntegrations'].includes(node.internal.type)) {
			node.customFields.media = null
			const galleryId = node.internal.type === 'agilityIntegrations' ? node.customFields.screenshots && node.customFields.screenshots.galleryid : node.customFields.gallery && node.customFields.gallery.galleryid
			if (galleryId) {
				const api = contentFetch.getApi({
					guid: agilityConfig.guid,
					apiKey: agilityConfig.apiKey,
					isPreview: agilityConfig.isPreview
				});
				const id = galleryId
				const gallery = await api.getGallery({ galleryID: id })
				node.customFields.media = gallery.media
			}
		}
	} catch(err) {
		console.error('Failed to intergrate gallery')
	}
}