import React from 'react';
import {  graphql, StaticQuery } from "gatsby"

import StringUtils from "../utils/string-utils"
import FilteredListing from "../components/filtered-listing.jsx"


import './PostListing.scss'

export default props => (
	<StaticQuery
		query={graphql`

			query PartnerListingQuery {
				allAgilityCustomTag(sort: {order: ASC, fields: properties___itemOrder}) {
					nodes {
					  contentID
					  languageCode
					  properties {
						referenceName
						itemOrder
					  }
					  customFields {
						title
					  }
					}
				  }
				  allAgilityPartner(sort: {order: ASC, fields: properties___itemOrder}) {
				  nodes {
					contentID
					languageCode
					properties {
					referenceName
					  itemOrder
					}
					customTags {
						contentID
					}
					customFields {
					  excerpt
					  image:partnerLogo {
						url
						label
					  }
					  customTags {
						referencename
					  }
					  title
					  uRL
					}
				  }
				}
			  }


        `}
		render={queryData => {

			//filter out only those logos that we want...
			let lst = queryData.allAgilityPartner.nodes;

			let tags = queryData.allAgilityCustomTag.nodes;

			//filter by referenceName
			const referenceName = props.item.customFields.partners.referencename;


			lst = lst.filter(p => {
				return p.properties.referenceName === referenceName;
			});

			if (lst.length === 0) return null;

			const tagsReferenceName = lst[0].customFields.customTags.referencename;

			tags = tags.filter(t => {
				return t.properties.referenceName === tagsReferenceName;
			});

			//adjust the excerpt
			lst.forEach(p => {
				let excerpt = p.customFields.excerpt;
				if (excerpt) {
					p.customFields.excerpt = StringUtils.stripHtml(excerpt, 200);
				}
				if (referenceName === "implementationpartners") {
					p.customFields.url = "/partners/implementation/" + p.customFields.uRL;
				} else if (referenceName === "integrationspartners") {
					p.customFields.url = "/partners/integrations/" + p.customFields.uRL;
				}

			});


			const viewModel = {
				item: props.item,
				items: lst,
				types: tags,
				filter: function(ids) {
					 if (! ids || ids.length === 0) return lst;
					  return lst.filter(r => {

						return r.customTags.findIndex(t => {
							return ids.findIndex(i => { return i === t.contentID;}) >= 0;
						}) >= 0;
					  });

				}
			}
			return (
				<FilteredListing {...viewModel} />
			);
		}}
	/>
)
