const agility = require('./src/agility/utils')

//gatsy-node.js
//CREATE RESOLVERS *******************************************************************************************
exports.createResolvers = (args) => {
	console.log("AGILITY WEBSITE: Creating Resolvers")

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
		}
		//[Not Implemented]
		//if we had an 'Image Slider' module and it had a list of slides via a linked content field called 'slides', this is how we'd retrieve a list of those slides in a single GraphQL query
		// agilityImageSlider: {
		//     linkedContent_agilitySlides: agility.getLinkedContentList({ type: 'agilitySlide', linkedContentFieldName: 'slides' })
		// }
	}
	createResolvers(resolvers)
}
