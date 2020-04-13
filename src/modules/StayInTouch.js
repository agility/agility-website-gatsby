import React from 'react';
import { graphql, StaticQuery } from "gatsby"

import "./StayInTouch.scss"

export default props => (
	<StaticQuery
		query={graphql`
		query SocialFollowLink {
			allAgilitySocialFollowLink {
			  nodes {
				properties {
				  referenceName
				  itemOrder
				}
				languageCode
				contentID
				customFields {
				  followURL {
					href
					text
				  }
				  logo {
					label
					url
				  }
				  title
				}
			  }
			}
		  }
        `}
		render={queryData => {

			//filter out only those logos that we want...
			let links = queryData.allAgilitySocialFollowLink.nodes.filter(link => {
				return link.properties.referenceName === props.item.customFields.socialFollowLinks.referencename;
			});


			const viewModel = {
				item: props.item,
				links: links
			}
			return (
				<StayInTouch {...viewModel} />
			);
		}}
	/>
)

const StayInTouch = ({ item , links}) => {

	var four = links.map(function (link) {
		return <StayInTouchBoxContent item={link} key={link.contentID + "-"+ item.contentID} />
	});

	return (

		<div className="stay-in-touch-box">
			<h4 className="h4">{item.customFields.title}</h4>
			<div className="social">
				{four}
			</div>
		</div>

	);
}


class StayInTouchBoxContent extends React.Component {
    render() {

        return (
            <a
                href={this.props.item.customFields.followURL.href}
                target={this.props.item.customFields.followURL.target}>
                <img src={this.props.item.customFields.logo.url} alt="" />
                <span>{this.props.item.customFields.title}</span>
            </a>
        );
    }
}