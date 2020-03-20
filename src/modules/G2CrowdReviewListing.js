import React, {  useEffect, useState } from 'react';
import { renderHTML } from '../agility/utils'

import './G2CrowdReviewListing.scss'

const G2CrowdReviewListing = ({ item }) => {

	const [state, setState] = useState({
        loaded: false
	})

	useEffect(() => {

		//load the g2 script...
		if (typeof window === 'undefined') return;
		if (state.loaded) return;

		let script = document.createElement("script")
		script.src = "https://apps.elfsight.com/p/platform.js"
		script.async = true
		document.body.appendChild(script)

		setState({
			loaded: true,
		})



	}, []);

	return (

		<section className="container-my">
			<div className="g2-review-listing">
				<h2 className="title-component">{item.customFields.heading}</h2>
				<p className="intro">{item.customFields.subHeading}</p>
				<div>
					<div className="g2-review-panel">

						{ (typeof window !== 'undefined') &&
							<div className="g2-review-widget" dangerouslySetInnerHTML={renderHTML(item.customFields.widgetCode)}></div>
						}
						{ (typeof window === 'undefined') &&
							<div className="g2-review-widget"></div>
						}

					</div>
				</div>
			</div>
		</section>


	);
}

export default G2CrowdReviewListing;
