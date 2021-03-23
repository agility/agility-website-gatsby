const he = require('he')
const DateTime = require("luxon").DateTime


const getDynamicPageItem = ({ contentID, agilityItem }) => {
	if (contentID > 0 && agilityItem && agilityItem.itemJson) {
		return JSON.parse(agilityItem.itemJson);
	}
	return null;
}

const buildPageViewModel = ({ pageContext, data, location }) => {

	//if for whatever reason we get no page, kick out
	if (data.agilitypage === null) return null;

	//Check if we have a dynamic page item contentID, if so, we are rendering a dynamic page and should pass the content item to Modules
	const dynamicPageItem = getDynamicPageItem({
		contentID: pageContext.contentID,
		agilityItem: data.agilityitem
	});

	const page = JSON.parse(data.agilitypage.pageJson);

	//set the title from the page context...
	page.title = pageContext.title;

	//do any custom processing on the page and stuff...
	page.seo = customSEOProcessing({ pageContext, data, page, dynamicPageItem, location });


	//build the our viewModel
	return {
		page: page,
		dynamicPageItem: dynamicPageItem,
		isPreview: pageContext.isPreview
	}
}


/**
 * Perform processing on dynamic page items that want to update stuff in the page seo content.
 */
const customSEOProcessing = ({ pageContext, data, page, dynamicPageItem, location }) => {

	let metaDescription = null;

	let seo = {
		metaDescription: null,
		metaHTML: null
	};

	if (page.seo) {
		seo = page.seo;
	}

	seo.canonicalUrl = `https://agilitycms.com${location.pathname}`;

	if (dynamicPageItem !== null) {

		// *** special case for blog posts ***
		if (dynamicPageItem.properties.definitionName === "BlogPost") {

			//build the meta description
			metaDescription = null;
			if (dynamicPageItem.seo && dynamicPageItem.seo.metaDescription) metaDescription = dynamicPageItem.seo.metaDescription;
			if (metaDescription === null) {
				metaDescription = dynamicPageItem.customFields.excerpt;
				if (metaDescription && metaDescription.length > 240) metaDescription = metaDescription.substring(0, 240) + "...";
			}

			let canonicalUrl = `https://agilitycms.com${location.pathname}`;

			let category = null
			let image = null
			let author = null

			if (dynamicPageItem.customFields.author && dynamicPageItem.customFields.author.customFields) {
				author = dynamicPageItem.customFields.author.customFields
			}

			if (dynamicPageItem.customFields.category && dynamicPageItem.customFields.category.customFields) {
				category = dynamicPageItem.customFields.category.customFields.title;
			}

			if (dynamicPageItem.customFields.postImage) {
				if (dynamicPageItem.customFields.postImage.url.indexOf("http://") !== -1) {
					dynamicPageItem.customFields.postImage.url = dynamicPageItem.customFields.postImage.url.replace("http://", "https://");
				}
				image = dynamicPageItem.customFields.postImage;

			}

			let datePublished = DateTime.fromISO(dynamicPageItem.customFields.date);
			let dateModified = DateTime.fromISO(dynamicPageItem.properties.modified);

			//build the structural event data...
			let structData = {
				"@context": "https://schema.org",
				"@type": "NewsArticle",
				"mainEntityOfPage": {
					"@type": "WebPage",
					"@id": "https://google.com/article"
				},
				"headline": dynamicPageItem.customFields.title,
				"datePublished": datePublished.toISO(),
				"dateModified": dateModified.toISO(),

				"publisher": {
					"@type": "Organization",
					"name": "Agility CMS",
					"logo": {
						"@type": "ImageObject",
						"url": "https://static.agilitycms.com/brand/logo_combined_yellow_gray.png"
					}
				}
			}

			if (author) {
				structData.author = {
					"@type": "Person",
					"name": author.title
				}
			}

			if (image) {
				structData.image = [
					image.url
				]
			}

			seo.structData = JSON.stringify(structData);

			seo.metaDescription = metaDescription;
			seo.twitterCard = "summary_large_image";
			seo.ogType = "article";
			seo.category = category;
			seo.canonicalUrl = canonicalUrl;
			seo.image = image;

		}

		if (dynamicPageItem.properties.definitionName === "Resource") {

			//build the meta description
			metaDescription = null;
			if (dynamicPageItem.seo && dynamicPageItem.seo.metaDescription) metaDescription = dynamicPageItem.seo.metaDescription;
			if (metaDescription === null) {
				metaDescription = dynamicPageItem.customFields.excerpt;
				if (metaDescription && metaDescription.length > 240) metaDescription = metaDescription.substring(0, 240) + "...";
			}

			let canonicalUrl = `https://agilitycms.com${location.pathname}`;

			let category = null;
			let image = null;

			//get the category from the resource type
			if (dynamicPageItem.customFields.resourceType && dynamicPageItem.customFields.resourceType.customFields) {
				category = dynamicPageItem.customFields.resourceType.customFields.title;
			}

			if (dynamicPageItem.customFields.image) {
				if (dynamicPageItem.customFields.image.url.indexOf("http://") !== -1) {
					dynamicPageItem.customFields.image.url = dynamicPageItem.customFields.image.url.replace("http://", "https://");
				}
				image = dynamicPageItem.customFields.image;

			}

			seo.metaDescription = metaDescription;
			seo.twitterCard = "summary_large_image";
			seo.ogType = "article";
			seo.category = category;
			seo.canonicalUrl = canonicalUrl;
			seo.image = image;


		}

		if (dynamicPageItem.properties.definitionName === "CaseStudy") {

			//build the meta description
			metaDescription = null;
			if (dynamicPageItem.seo && dynamicPageItem.seo.metaDescription) metaDescription = dynamicPageItem.seo.metaDescription;
			if (metaDescription === null) {
				metaDescription = dynamicPageItem.customFields.excerpt;
				if (metaDescription && metaDescription.length > 240) metaDescription = metaDescription.substring(0, 240) + "...";
			}

			let canonicalUrl = `https://agilitycms.com${location.pathname}`;

			let category = "Case Study";
			let image = null;

			if (dynamicPageItem.customFields.image) {
				if (dynamicPageItem.customFields.image.url.indexOf("http://") !== -1) {
					dynamicPageItem.customFields.image.url = dynamicPageItem.customFields.image.url.replace("http://", "https://");
				}
				image = dynamicPageItem.customFields.image;

			}

			seo.metaDescription = metaDescription;
			seo.twitterCard = "summary_large_image";
			seo.ogType = "article";
			seo.category = category;
			seo.canonicalUrl = canonicalUrl;
			seo.image = image;

		}

		if (dynamicPageItem.properties.definitionName === "Event") {

			//build the meta description
			metaDescription = null;
			if (dynamicPageItem.seo && dynamicPageItem.seo.metaDescription) metaDescription = dynamicPageItem.seo.metaDescription;
			if (metaDescription === null) {
				metaDescription = dynamicPageItem.customFields.description;
				if (metaDescription && metaDescription.length > 240) metaDescription = metaDescription.substring(0, 240) + "...";
			}

			let canonicalUrl = `https://agilitycms.com${location.pathname}`;

			let category = null;
			let image = null;

			if (dynamicPageItem.customFields.eventType && dynamicPageItem.customFields.eventType.customFields) {
				category = dynamicPageItem.customFields.eventType.customFields.title;
			}

			if (dynamicPageItem.customFields.mainImage) {
				image = dynamicPageItem.customFields.mainImage;
			}


			let validFrom = new Date();
			let startTime = DateTime.fromISO(dynamicPageItem.customFields.date);
			let endTime = DateTime.fromISO(startTime).plus({hours: 1})

			let extLink = canonicalUrl;
			if (dynamicPageItem.customFields.externalLink) extLink = dynamicPageItem.customFields.externalLink.href;

			let presenters = [];
			if (dynamicPageItem.customFields.presenters) {
				presenters = dynamicPageItem.customFields.presenters.map(p => {
					let img = null;
					if (p.customFields.image) {
						img = p.customFields.image.url + "?w=400"
					}

					return {
						"@type": "Person",
						"name": p.customFields.title,
						"image": img
					}
				})
			}

			//build the structural event data...
			let structData = {
				"@context": "https://schema.org",
				"@type": "Event",
				"name": dynamicPageItem.customFields.title,
				"startDate": startTime.toISO(),
				"endDate": endTime.toISO(),
				"eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
				"eventStatus": "https://schema.org/EventScheduled",
				"location": {
					"@type": "VirtualLocation",
					"url": extLink,
				},

				"description": dynamicPageItem.customFields.description,
				"offers": {
					"@type": "Offer",
					"url": canonicalUrl,
					"price": "0",
					"priceCurrency": "USD",
					"availability": "https://schema.org/InStock",
					"validFrom": validFrom.toISOString(true),
				},
				"performer": presenters,
				"organizer": {
					"@type": "Organization",
					"name": "Agility CMS",
					"url": "https://agilitycms.com"
				}
			}

			if (image) {
				structData.image = [
					image.url,
				]
			}

			seo.structData = JSON.stringify(structData);
			seo.metaDescription = metaDescription;
			seo.twitterCard = "summary_large_image";
			seo.ogType = "article";
			seo.category = category;
			seo.canonicalUrl = canonicalUrl;
			seo.image = image;

		}

		if (dynamicPageItem.properties.definitionName === "Podcast") {

			//build the meta description
			metaDescription = null;
			if (dynamicPageItem.seo && dynamicPageItem.seo.metaDescription) metaDescription = dynamicPageItem.seo.metaDescription;
			if (metaDescription === null) {
				metaDescription = dynamicPageItem.customFields.excerpt;
				if (metaDescription) {
					metaDescription = metaDescription.replace(/<[^>]+>/ig, " ");
					metaDescription = he.decode(metaDescription).trim();
				}
			}

			let canonicalUrl = `https://agilitycms.com${location.pathname}`;

			let category = "Agile Living";
			let image = null;

			if (dynamicPageItem.customFields.eventType && dynamicPageItem.customFields.eventType.customFields) {
				category = dynamicPageItem.customFields.eventType.customFields.title;
			}

			if (dynamicPageItem.customFields.mainImage) {
				image = dynamicPageItem.customFields.mainImage;
			}

			seo.metaDescription = metaDescription;
			seo.twitterCard = "summary_large_image";
			seo.ogType = "article";
			seo.category = category;
			seo.canonicalUrl = canonicalUrl;
			seo.image = image;

		}



	}

	return seo


}


const getLinkedContentItem = ({ type, linkedContentFieldName }) => {
	const fieldResolver =
	{
		//we are telling it is going to return the 'agilityAuthor' node type
		type: type,
		//this is the function that is going to resolve it
		resolve: async (source, args, context, info) => {
			const fieldObj = source.customFields[linkedContentFieldName];
			if (!fieldObj) {
				return null;
			}

			const contentID = parseInt(fieldObj.contentid);
			if (isNaN(contentID) || contentID < 1) {
				return null;
			}


			//query the graphql nodes to find the item you want to return
			const node = context.nodeModel.runQuery({
				//find the author that matches our ID and language code
				query: {
					filter: {
						contentID: { eq: source.customFields[linkedContentFieldName].contentid },
						languageCode: { eq: source.languageCode }
					}
				},
				type: type,
				//tell it to stop searching once we found our item
				firstOnly: true,
			})
			return node;
		}
	}
	return fieldResolver;
}

const getLinkedContentList = ({ type, linkedContentFieldName }) => {
	const fieldResolver =
	{
		type: [type],
		resolve: (source, args, context, info) => {
			const list = context.nodeModel.getAllNodes({ type });
			const json = source.internal.content;
			const fullItem = JSON.parse(json);
			const field = fullItem.customFields[linkedContentFieldName];
			if (!field || !field.referencename) return [];

			const referenceName = field.referencename;
			let sortIDAry = null;
			const sortids = field.sortids;
			if (sortids) {
				sortIDAry = sortids.split(",");
			}

			const filteredList = list.filter(item => {

				if (item.properties.referenceName !== referenceName) return false;

				if (sortIDAry) {
					return sortIDAry.findIndex(id => { return parseInt(id) === parseInt(item.contentID); }) > -1;
				}

				return true;
			})

			return filteredList;
		}
	}

	return fieldResolver;
}

const getDynamicPageItemSitemapNode = () => {
	const fieldResolver =
	{
		type: 'agilitySitemapNode',
		resolve: async (source, args, context, info) => {
			const node = context.nodeModel.runQuery({
				query: {
					filter: {
						contentID: { eq: source.contentID },
						languageCode: { eq: source.languageCode }
					}
				},
				type: `agilitySitemapNode`,
				firstOnly: true
			})
			return node;
		}
	}

	return fieldResolver;
}

const renderHTML = (html) => {
	if (!html) return { __html: "" };
	return { __html: cleanHTML(html) };
}

const cleanHTML = (html) => {
	if (!html) return ""

	//HACK for Agility CMS Website
	html = html.replace(/http:\/\/cdn.agilitycms.com\/agility-cms-website/gi, "https://media.agilitycms.com");
	html = html.replace(/http:\/\/media.agilitycms.com/gi, "https://media.agilitycms.com");
	html = html.replace(/http:\/\/cdn.agilitycms.com/gi, "https://cdn.agilitycms.com");

	//fix '~' in links in HTML
	return html.replace(/href="~\//gi, 'href="/')
}

module.exports = {
	buildPageViewModel,
	getLinkedContentList,
	getDynamicPageItemSitemapNode,
	getLinkedContentItem,
	renderHTML,
	cleanHTML
}