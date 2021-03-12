import React from 'react';
import moment from 'moment'
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

			let today = moment()

			events = events.filter(event => {
				if (pastEventsOnly) {
					//in the past
					return moment(event.customFields.date).isBefore()
				} else {
					//in the future
					return moment(event.customFields.date).isAfter()
				}
			});

			if (pastEventsOnly) {
				//sort by date descending for past events...
				events = events.sort((a, b) => {
					const adate = moment(a.customFields.date)
					const bdate = moment(b.customFields.date)

					if (adate.isAfter(bdate)) return -1
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
						{moment(item.date).format("MMM Do, YYYY")}
					</span>
					<span className="time">
						{moment(item.date).format("h:mma")}
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
