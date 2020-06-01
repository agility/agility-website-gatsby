import React, {  useEffect, useState } from 'react';
import { Link } from "gatsby"
import moment from 'moment'

import { renderHTML } from '../agility/utils'

import "./EventDetails.scss"
import "./RichTextArea.scss"


const EventDetails = ({ item, dynamicPageItem, page }) => {
	const [loaded, setLoaded] = useState(false)

	const event = dynamicPageItem.customFields;

	let externalLink = null;
	let exernalTarget = null;
	if (event.externalLink) {
		externalLink = event.externalLink.href;
		exernalTarget = event.externalLink.target;
	}

	useEffect(() => {

		//load the eventbrites cript - but only if we have to
		if (typeof window === 'undefined') return;

		if (loaded) return;

		setTimeout(function() {

			if (event.eventbriteID) {
				//add the script embed...
				let script = document.createElement("script")
				script.src = "https://www.eventbrite.com/static/widgets/eb_widgets.js"
				script.async = true
				document.body.appendChild(script)

				loadEventBriteForm();


			}
			setLoaded(true);
		}, 100);


	});

	const loadEventBriteForm = () => {

		if (! window.EBWidgets) {
			setTimeout(loadEventBriteForm, 100);
			return;
		}

		window.EBWidgets.createWidget({
			// Required
			widgetType: 'checkout',
			eventId: event.eventbriteID,
			iframeContainerId: `eventbrite-widget-container-${event.eventbriteID}`,

			// Optional
			iframeContainerHeight: 425,  // Widget height in pixels. Defaults to a minimum of 425px if not provided
			//onOrderComplete: exampleCallback  // Method called when an order has successfully completed
		});

	}

	return (
		<section className="event-details">
			<div className="container p-w-small rich-text">
				<h1 className="title-component">{event.title}</h1>

				<div className="event-date">
					<span className="event-type">{event.eventType.customFields.title}</span>
					<span className="date">
						{moment(event.date).format("MMM Do, YYYY")}
					</span>
					<span className="time">
						{moment(event.date).format("h:mma")}
					</span>
				</div>

				<div className="event-image">
					{
						event.mainImage &&
						<a href={externalLink} target={exernalTarget}><img src={event.mainImage.url + "?w=800"} alt={event.mainImage.label} /></a>
					}
				</div>

				<div className="event">

					{event.externalLink &&
						<div className="event-link">
							<a href={externalLink} target={exernalTarget} className="btn">{event.externalLink.text}</a>
						</div>
					}

					<div className="event-content" dangerouslySetInnerHTML={renderHTML(event.textblob)}></div>

					{event.eventbriteID &&
						<div id={`eventbrite-widget-container-${event.eventbriteID}`}></div>
					}

				</div>

				<Link to="/resources/events" className="back d-flex ai-center"><img src="https://static.agilitycms.com/layout/img/ico/gray.svg" alt="" /><span>Back to Event Listing</span></Link>
			</div>
		</section>

	);
}

export default EventDetails;
