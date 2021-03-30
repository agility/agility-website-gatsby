import React from 'react';
import { graphql, StaticQuery } from 'gatsby'

import ArrayUtils from '../utils/array-utils.js';
import { renderHTML } from '../agility/utils'
import ResponsiveImage from '../components/responsive-image.jsx'
import Triangles from '../components/triangles'
import './LogoListing.scss'

export default props => (
	<StaticQuery
		query={graphql`
		query LogoQuery {
		allAgilityLogo {
			nodes {
				customFields {
					logo {
						url
						label
						width
						height
					}
					title
				}
				contentID
				languageCode
				properties {
					referenceName
					itemOrder
				}
			}
		}
	}

        `}
		render={queryData => {


			//filter out only those logos that we want...
			let logos = queryData.allAgilityLogo.nodes.filter(logo => {
				return logo.properties.referenceName === props.item.customFields.logos.referencename
			});

			let logoCount = parseInt(props.item.customFields.logoCount);
			if (isNaN(logoCount) || logoCount < 1) logoCount = 6;

			logos = ArrayUtils.getRandomElements(logos, logoCount);


			const viewModel = {
				item: props.item,
				logos: logos
			}
			return (
				<LogoListing {...viewModel} />
			);
		}}
	/>
)

const LogoListing = ({ item, logos }) => {

	const renderLogo = (logo) => {

		const key = logo.contentID + "-" + item.contentID;
		logo = logo.customFields;
		//logo.url = logo.uRL;

		//render one tab
		return (

			<li className="logo-item" key={key}>
				<div className="image">

						<span>
							{logo.logo &&
								<ResponsiveImage img={logo.logo}
									breaks={[{ w: 180, max: 380 }, { w: 180, max: 800 }, { w: 180, max: 1190 }]} />
							}
						</span>


				</div>

			</li>

		);
	}

	//loop all the logos
	logos = logos.map(logo => {
		return renderLogo(logo)
	})

	//adjust the item
	item = item.customFields;


	return (

		<section className="logoListing p-w">
			<Triangles />

			{
				item.heading &&
				<h2 className="title-component" dangerouslySetInnerHTML={renderHTML(item.heading)}></h2>
			}

			{
				item.subHeading &&
				<p dangerouslySetInnerHTML={renderHTML(item.subHeading)}></p>
			}

			{
				logos && logos.length > 0 &&
				<div className="container-my">
					<ul className="logo-list">
						{logos}
					</ul>
				</div>
			}

			{
				(item.primaryButton || item.secondaryButton) &&
				<div className="buttons">
					{
						item.primaryButton && item.primaryButton.href &&
						<a className="btn" href={item.primaryButton.href} target={item.primaryButton.target}>{item.primaryButton.text}</a>
					}

					{
						item.secondaryButton && item.secondaryButton.href &&
						<a className="btn" href={item.secondaryButton.href} target={item.secondaryButton.target}>{item.secondaryButton.text}</a>
					}
				</div>
			}

		</section>
	);
}