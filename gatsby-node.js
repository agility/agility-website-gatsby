const agility = require('./src/agility/utils')

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
			preHeaderLinks: agility.getLinkedContentList({ type: 'agilityLink', linkedContentFieldName: 'preHeaderLinks' })
		},
		agilityGlobalFooter: {
			column1Links: agility.getLinkedContentList({ type: 'agilityLink', linkedContentFieldName: 'column1Links' }),
			column2Links: agility.getLinkedContentList({ type: 'agilityLink', linkedContentFieldName: 'column2Links' }),
			column3Links: agility.getLinkedContentList({ type: 'agilityLink', linkedContentFieldName: 'column3Links' }),
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
		}
		type agilityGlobalHeaderCustomFieldsContactus {
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
  `
  createTypes(typeDefs)
}
