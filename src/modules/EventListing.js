import React from 'react';
import {DateTime} from 'luxon'
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import { Link, graphql, StaticQuery } from "gatsby"

import "./EventListing.scss"

export default props => (
	<StaticQuery
		query={graphql`
		query EventListQuery {
			allAgilityEvent(filter: {properties: {referenceName: {eq: "events"}}}, sort: {order: ASC, fields: customFields___date}) {
			  nodes {
				contentID
				customFields {
				  title
				  address
				  date
				  description
				  uRL
				  mainImage {
					url
					label
					filesize
					height
					width
				  }
				}
			  }
			}
		  }
        `}
		render={queryData => {


			let events = queryData.allAgilityEvent.nodes;

			const pastEventsOnly = props.item.customFields.showPastEventsOnly === "true";

			let today = new Date()

			events = events.filter(event => {
				if (pastEventsOnly) {
					//in the past
					return  DateTime.fromISO(event.customFields.date).diffNow("minutes").minutes < 1
				} else {
					//in the future
					return DateTime.fromISO(event.customFields.date).diffNow("minutes").minutes > 1
				}
			});

			if (pastEventsOnly) {
				//sort by date descending for past events...
				events = events.sort((a, b) => {
					const adate = DateTime.fromISO(a.customFields.date)
					const bdate = DateTime.fromISO(b.customFields.date)

					if (adate.diff(bdate, "minutes").minutes > 0) return -1
					return 1
				})
			}

			const viewModel = {
				moduleItem: props.item,
				events: events
			}
			return (
				<EventListing {...viewModel} />
			);
		}}
	/>
)


const EventListing = ({ moduleItem, events }) => {

	const item = moduleItem.customFields;

	events = events.map((event, index) => {
		return <Event moduleItem={moduleItem} event={event} key={moduleItem.contentID + "-" + event.contentID} index={index} />
	});

	return (
		<section className="event-list">

			<div className="container-my">
				<div className="rotated-bg"></div>

				{item.title &&
					<h2 className="title-component">{item.title}</h2>}
				{item.subTitle &&
					<p className="sub-title">{item.subTitle}</p>}
				<div className="event-list-wrapper">
					{events}
				</div>
			</div>
		</section>
	)
}

const Event = ({ moduleItem, event, index }) => {

	let item = event.customFields;
	const url = `/resources/events/${item.uRL}`

	return (
		<div className="event">

			<div className="event-image">
				{item.mainImage &&
					<Link to={url}>
						<AgilityImage image={item.mainImage} layout="constrained" width="600" />
					</Link>}
			</div>
			<div className="event-content">
				<Link to={url}><h2>{item.title}</h2></Link>

				<div className="event-date">
					<span className="date">
						{DateTime.fromISO(item.date).toFormat("MMM d, yyyy")}
					</span>
					<span className="time">
						{DateTime.fromISO(item.date).toFormat("h:mma")}
					</span>
				</div>
				<p>
					{item.description}
				</p>
				<div className="read-more-btn">
					<Link to={url} className="btn">{moduleItem.customFields.viewDetailsLabel}</Link>
				</div>
			</div>
		</div>
	)

}
