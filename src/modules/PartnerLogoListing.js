import React from 'react';
import { graphql, StaticQuery } from 'gatsby'
import { renderHTML } from '../agility/utils'

import ResponsiveImage from '../components/responsive-image.jsx'
import ArrayUtils from '../utils/array-utils.js';
import './PartnerLogoListing.scss'


export default props => (
	<StaticQuery
		query={graphql`
        query SitemapQuery {
			allAgilitySitemapNode(filter: {contentID: {gt: 0}}) {
				nodes {
				path
				title
				pageID
				contentID
				languageCode
				}
			}
		}

        `}
		render={queryData => {

			const viewModel = {
				moduleItem: props.item,
				sitemapNodes: queryData.allAgilitySitemapNode.nodes
			}
			return (
				<PartnerLogoListing {...viewModel} />
			);
		}}
	/>
)

const PartnerLogoListing = ({ moduleItem, sitemapNodes }) => {

	let item = moduleItem.customFields;
	let partners = item.partners;

	let logoCount = parseInt(item.logoCount);
	if (isNaN(logoCount) || logoCount < 1) logoCount = 6;

	partners = ArrayUtils.getRandomElements(partners, logoCount);

	const renderPartner = (partner) => {

		const key = partner.contentID + "-" + moduleItem.contentID;

		const node = sitemapNodes.find(n => {

			return n.contentID === partner.contentID;
		});

		partner = partner.customFields;

		if (node) {
			partner.url = node.path;
		}


		//render one tab
		return (


			<li className="partner-item" key={key}>
				<div className="image">
					{partner.url &&
						<a href={partner.url}>
							{partner.partnerLogo &&

								<ResponsiveImage img={partner.partnerLogo}
									breaks={[{ w: 180, max: 380 }, { w: 180, max: 800 }, { w: 180, max: 1190 }]} />
							}
						</a>
					}

					{!partner.url && partner.partnerLogo &&
						<img src={partner.partnerLogo.url} alt={partner.partnerLogo.label} />
					}

				</div>

			</li>

		);
	}

	//loop all the partners
	partners = partners.map(partner => {
		return renderPartner(partner)
	})


	return (
		<section className="partnerLogoListing">
			<div className="container-my">
				{
					item.heading &&
					<h2 className="title-component" dangerouslySetInnerHTML={renderHTML(item.heading)}></h2>
				}

				{
					item.subHeading &&
					<p dangerouslySetInnerHTML={renderHTML(item.subHeading)}></p>
				}

				{
					partners && partners.length > 0 &&
					<div className="container-my">
						<ul className="partner-list">
							{partners}
						</ul>
					</div>
				}

				{
					(item.primaryButton || item.secondaryButton) &&
					<div className="buttons">
						{
							item.primaryButton &&
							<a className="btn" href={item.primaryButton.href} target={item.primaryButton.target}>{item.primaryButton.text}</a>
						}

						{
							item.secondaryButton &&
							<a className="btn" href={item.secondaryButton.href} target={item.secondaryButton.target}>{item.secondaryButton.text}</a>
						}
					</div>
				}
			</div>
		</section>
	);
}

