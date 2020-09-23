import React, { useEffect, useState } from 'react';
import { Link } from "gatsby"
import moment from 'moment'

import { renderHTML } from '../agility/utils'

import "./StarterTemplateDetails.scss"
import "./RichTextArea.scss"


const EventDetails = ({ item, dynamicPageItem, page }) => {

	const starterTemplate = dynamicPageItem.customFields;


	const externalLink = "https://manager.agilitycms.com/"

	return (
		<section className="template-details">
			<div className="container p-w-small rich-text">
				<h1 className="title-component">{starterTemplate.name}</h1>

				<div className="template-date">
					{/* <span className="template-type">{event.eventType.customFields.title}</span>
					<span className="date">
						{eventDate.format("MMM Do, YYYY")}
					</span>
					<span className="time">
						{eventDate.format("h:mma")}
					</span> */}
				</div>

				<div className="template-image">
					{
						starterTemplate.image &&
						<a href={externalLink}><img src={starterTemplate.image.url + "?w=400"} alt={starterTemplate.image.label} /></a>
					}
				</div>

				<div className="event">

					{externalLink &&
						<div className="template-link">
							<a href={externalLink} className="btn">{"Get Started Now"}</a>
						</div>
					}

					<div className="template-content">{starterTemplate.description}</div>

				</div>

				<Link to="/get-started/starter-templates" className="back d-flex ai-center"><img src="https://static.agilitycms.com/layout/img/ico/gray.svg" alt="" /><span>Back to Template Listing</span></Link>
			</div>
		</section>

	);
}

export default EventDetails;
