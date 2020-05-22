import React from 'react';
import { Link } from "gatsby"
import moment from 'moment'

import { renderHTML } from '../agility/utils'

import "./EventDetails.scss"
import "./RichTextArea.scss"


const EventDetails = ({ item, dynamicPageItem, page }) => {

	const event = dynamicPageItem.customFields;

	let externalLink = null;
	let exernalTarget = null;
	if (event.externalLink) {
		externalLink = event.externalLink.href;
		exernalTarget = event.externalLink.target;
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
				</div>

				<Link to="/resources/events" className="back d-flex ai-center"><img src="https://static.agilitycms.com/layout/img/ico/gray.svg" alt="" /><span>Back to Event Listing</span></Link>
			</div>
		</section>

	);
}

export default EventDetails;
