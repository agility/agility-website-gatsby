import React from 'react';
import { Link, graphql, StaticQuery } from "gatsby"
import { renderHTML } from '../agility/utils'

import "./PodcastListing.scss"

export default props => (
	<StaticQuery
		query={graphql`
		query PodcastListing {
			allAgilityPodcast(filter: {properties: {referenceName: {eq: "podcast"}}}, sort: {order: DESC, fields: customFields___date}) {
				nodes {
				  contentID
				  languageCode
				  properties {
					referenceName
					itemOrder
				  }
				  customFields {
					date(formatString: "YYYY-MM-DD")
					embed
					episodeNumber
					excerpt
					guest
					listingImage {
					  url
					  label
					}
					mainImage {
					  url
					  label
					}
					title
					uRL
				  }
				}
			  }
			}
        `}
		render={queryData => {

			//filter out the current post
			let items = queryData.allAgilityPodcast.nodes;

			const viewModel = {
				items
			}

			return (
				<PodcastListing {...viewModel} />
			);
		}}
	/>
)

const PodcastListing = ({ items }) => {

	let podcasts = items.map(item => {
		const preItem = item;
		item = item.customFields;

		item.image = item.mainImage;

		item.url = `/resources/agileliving/${item.uRL}`

		return (
			<div className="podcast-episode" key={"podcastlst-" + preItem.contentID}>
				<Link to={item.url}>
					{item.image &&
						<div className="image">
							<div className="block-hover">
								<img src={item.image.url + "?w=700"} alt="" />
								<div className="play d-flex jc-c ai-center">&nbsp;</div>
							</div>
							<img src="https://static.agilitycms.com/layout/img/podcast.svg" alt="" className="podcast" />
						</div>
					}
				</Link>
				<div className="content">
					<h3 className="h3"><Link to={item.url}>{item.title}</Link></h3>
					<div className="author">
						<h5 className="h5">Episode #{item.episodeNumber}</h5>
					</div>
					<div className="text" dangerouslySetInnerHTML={renderHTML(item.excerpt)}></div>
					<span className="date">{item.date}</span>
				</div>
			</div>
		)
	})

	return (
		<div className="podcast-listing">
			{podcasts}
		</div>
	);
}

