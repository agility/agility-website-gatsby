import React from 'react';
import moment from 'moment'
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
				  }
				}
			  }
			}
		  }
        `}
		render={queryData => {


			let events = queryData.allAgilityEvent.nodes;

			const pastEventsOnly = props.item.customFields.showPastEventsOnly === "true";

			events = events.filter(event => {
				if (pastEventsOnly) {
					//in the past
					return moment(event.customFields.date).isBefore()
				} else {
					//in the future
					return moment(event.customFields.date).isSameOrAfter()
				}
			});

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
		return <Event moduleItem={moduleItem} event={event} key={moduleItem.contentID + "-" + event.contentID} index={index}/>
	});

	return (
		<section className="event-list">

			<div className="container-my">
				<div className="rotated-bg"></div>

				{ item.title &&
				<h2 className="title-component">{item.title}</h2> }
				{ item.subTitle &&
				  <p className="sub-title">{item.subTitle}</p> }
				<div className="event-list-wrapper">
					{ events }
				</div>
			</div>
		</section>
	)
}

const Event = ({moduleItem, event, index}) => {

	let item = event.customFields;
	const url = `/community/events/${item.uRL}`

	return (
		<div className="event">

			<div className="event-image">
				{ item.mainImage &&
				 <Link to={url}><img src={item.mainImage.url + "?w=600"} alt={item.mainImage.label} /></Link> }
			</div>
			<div className="event-content">
				<Link to={url}><h2>{item.title}</h2></Link>

				<div class="event-date">
					<span class="date">
						{ moment(item.date).format("MMM Do, YYYY") }
					</span>
					<span class="time">
						{ moment(item.date).format("h:mma") }
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
