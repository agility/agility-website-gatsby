import React, { useEffect, useState } from 'react';
import { Link } from "gatsby"
import {DateTime} from 'luxon'
import HelperFunc from '../global/javascript/Helpers.js'
import { renderHTML } from '../agility/utils'
import { AgilityImage } from "@agility/gatsby-image-agilitycms"

import "./EventDetails.scss"
import "./RichTextArea.scss"


const EventDetails = ({ item, dynamicPageItem, page }) => {
	const [loaded, setLoaded] = useState(false)

	const event = dynamicPageItem.customFields;

	const eventDate = DateTime.fromISO(event.date)

	const isPastEvent = eventDate.diffNow("seconds").seconds < 0

	let externalLink = null;
	let exernalTarget = null;
	if (event.externalLink) {
		externalLink = event.externalLink.href;
		exernalTarget = event.externalLink.target;
	}

	useEffect(() => {

		//load the eventbrites cript - but only if we have to
		if (typeof window === 'undefined') return;

		//only load the event brite stuff if we are NOT on a past event...
		if (loaded || isPastEvent) return;

		setTimeout(function () {

			if (event.demioID) {
				//add the demo embed...
				let script = document.createElement("script")
				script.src = "https://cdn.demio.com/dist/embed.bundle.js"
				script.async = true
				document.body.appendChild(script)

			} else if (event.eventbriteID) {
				//add the script embed...
				let script = document.createElement("script")
				script.src = "https://www.eventbrite.com/static/widgets/eb_widgets.js"
				script.async = true
				document.body.appendChild(script)

				loadEventBriteForm();


			}



			setLoaded(true);
		}, 100);

		scrollToform()
	});

	const scrollToform = () => {
		document.getElementsByClassName('scroll-to-form')[0].addEventListener('click', (e) => {
			e.preventDefault()
			let id = document.querySelectorAll(e.target.getAttribute('href'))
			// console.log(id)
			if (id.length) {
				let header = document.querySelectorAll('#header')[0].offsetHeight
				HelperFunc.animateScrollTop(id[0].offsetTop - header - 100, 350)
			}
		})
	}

	const loadEventBriteForm = () => {

		if (!window.EBWidgets) {
			setTimeout(loadEventBriteForm, 100);
			return;
		}

		window.EBWidgets.createWidget({
			widgetType: 'checkout',
			eventId: event.eventbriteID,
			modal: true,
			modalTriggerElementId: `eventbrite-widget-button-${event.eventbriteID}`
		});

		setTimeout(function () {
			window.EBWidgets.createWidget({
				// Required
				widgetType: 'checkout',
				eventId: event.eventbriteID,
				iframeContainerId: `eventbrite-widget-container-${event.eventbriteID}`,

				// Optional
				iframeContainerHeight: 425,  // Widget height in pixels. Defaults to a minimum of 425px if not provided
				//onOrderComplete: exampleCallback  // Method called when an order has successfully completed
			});
		}, 1000)
	}

	return (
		<section className="event-details">
			<div className="container p-w-small rich-text">
				<h1 className="title-component">{event.title}</h1>

				<div className="event-date">
					<span className="event-type">{event.eventType.customFields.title}</span>
					<span className="date">
						{eventDate.toFormat("MMM d, yyyy")}
					</span>
					<span className="time">
						{eventDate.toFormat("h:mma")}
					</span>
				</div>

				<div className="event-image">
					{
						event.mainImage &&
						<a href={externalLink} target={exernalTarget}>
							<AgilityImage image={event.mainImage} layout="fullWidth" />
						</a>
					}
				</div>

				<div className="event">

					{event.externalLink &&
						<div className="event-link">
							<a href={externalLink} target={exernalTarget} className="btn">{event.externalLink.text}</a>
						</div>
					}

					{event.demioID && !isPastEvent &&
						<div className="event-link">
							<a href="#register-now" className="btn scroll-to-form">Register Now</a>
						</div>
					}

					{event.eventbriteID && !isPastEvent &&
						<div className="event-link">
							<a className="btn" id={`eventbrite-widget-button-${event.eventbriteID}`} type="button">Register Now</a>
						</div>
					}

					<div className="event-content" dangerouslySetInnerHTML={renderHTML(event.textblob)}></div>

					{event.demioID && !isPastEvent &&
						<section className="demio-register" id="register-now">
							<h2 >Register Now</h2>
							<div>
								<span className="demio-embed-registration" data-hash={event.demioID} data-api="api/v1" data-base-uri="https://my.demio.com/" data-form-width="100%" data-color="#4600a8" data-text="REGISTER" ></span>
							</div>
						</section>
					}

					{event.eventbriteID && !isPastEvent &&
						<div id={`eventbrite-widget-container-${event.eventbriteID}`}></div>
					}

				</div>

				<Link to="/resources/events" className="back d-flex ai-center"><img src="https://static.agilitycms.com/layout/img/ico/gray.svg" alt="" /><span>Back to Event Listing</span></Link>
			</div>
		</section>

	);
}

export default EventDetails;
