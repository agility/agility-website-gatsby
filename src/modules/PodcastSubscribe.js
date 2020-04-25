import React from 'react';
import { Link, graphql, StaticQuery } from "gatsby"
import "./PodcastSubscribe.scss"
import "./StayInTouch.scss"

export default props => (
	<StaticQuery
		query={graphql`
		query PodcastSubscribe {
			allAgilitySocialFollowLink {
				nodes {
				  contentID
				  languageCode
				  customFields {
					followURL {
					  href
					  target
					  text
					}
					logo {
					  label
					  url
					}
					title
				  }
				  properties {
					itemOrder
					referenceName
				  }
				}
			  }
			}
        `}
		render={queryData => {

			let item = props.item;
			let referenceName = item.customFields.podcastPlatforms.referencename;

			//filter out the current post
			let links = queryData.allAgilitySocialFollowLink.nodes;

			links = links.filter(p => {
				return p.properties.referenceName === referenceName;
			}).sort((a, b) => {
				return a.properties.itemOrder - b.properties.itemOrder;
			});

			const viewModel = {
				item,
				links
			}

			return (
				<PodcastSubscribe {...viewModel} />
			);
		}}
	/>
)

const PodcastSubscribe = ({ item, links }) => {

	const moduleItem = item;
	item = item.customFields;



	var four = links.map(function (link) {
		let key = "pcs" +  moduleItem.contentID + "." + link.contentID
		return  <a href={link.customFields.followURL.href} target="_blank" key={key}><img src={link.customFields.logo.url} alt={link.customFields.logo.label}  /></a>
	});

	return (

		<div className="listen-to-podcast">
			<h4 className="h4">{item.title}</h4>
			<div className="platform">
				{four}
			</div>
		</div>


	);
}
