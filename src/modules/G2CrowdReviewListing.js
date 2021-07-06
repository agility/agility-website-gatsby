import React, { useEffect, useReducer, useRef, useState } from 'react';
import { renderHTML } from '../agility/utils'

import './G2CrowdReviewListing.scss'

const G2CrowdReviewListing = ({ item }) => {
	const [loaded, setLoaded] = useState(false)
	const widgetContainerRef = useRef()

	const loadGarterWidget = () => {

		window.GartnerPI_Widget({
			size: item.customFields.gartnerWidgetSize,
			theme: item.customFields.gartnerWidgetTheme,
			sourcingLink: item.customFields.gartnerSourcingLink,
			widget_id: item.customFields.gartnerWidgetID,
			version: "2",
			container: widgetContainerRef.current
		})
	}

	useEffect(() => {

		//load the correct script...
		if (typeof window === 'undefined') return;

		if (loaded) return;

		if (item.customFields.gartnerSourcingLink) {

			if (window.GartnerPI_Widget === undefined) {

				const script = document.createElement("script")
				script.src = "https://www.gartner.com/reviews/public/Widget/js/widget.js"
				script.async = true
				script.onload = () => {
					loadGarterWidget()
				}
				document.body.appendChild(script)
			} else {
				loadGarterWidget()
			}
		}
	});

	return (
		<section className="container-my">
			<div className="g2-review-listing">
				<h2 className="title-component">{item.customFields.heading}</h2>
				<p className="intro">{item.customFields.subHeading}</p>
				<div>
					<div className="g2-review-panel">
						<div ref={widgetContainerRef} className="g2-review-widget" dangerouslySetInnerHTML={renderHTML(item.customFields.widgetCode)}></div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default G2CrowdReviewListing;
