import React from 'react';
import { renderHTML } from '../agility/utils'

import './G2CrowdReviewListing.scss'

const G2CrowdReviewListing = ({ item }) => {

	return (

		<section className="g2-review-listing features p-w">

			<h2 className="title-component">{item.customFields.heading}</h2>
			<p className="intro">{item.customFields.subHeading}</p>
			<div>
				<div className="container-my">
					<div className="row-my">
						<div className="g2-review-widget" dangerouslySetInnerHTML={renderHTML(item.customFields.widgetCode)}></div>
					</div>
				</div>
			</div>
		</section>


	);
}

export default G2CrowdReviewListing;
