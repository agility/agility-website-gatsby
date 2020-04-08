import React from 'react';
import moment from 'moment'
import { Link, graphql, StaticQuery } from "gatsby"
import { renderHTML } from '../agility/utils'

import "./EventListing.scss"

export default props => (
	<StaticQuery
		query={graphql`
		query EventListQuery {
			allAgilityEvent(filter: {properties: {referenceName: {eq: "events"}}}, sort: {order: DESC, fields: customFields___date}) {
			  nodes {
				contentID
				customFields {
				  title
				  address
				  date
				  description
				  mainImage {
					url
					label
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

	console.log("Event listing", item)

	events = events.map((event, index) => {
		return <Event moduleItem={moduleItem} event={event} key={moduleItem.contentID + "-" + event.contentID} index={index}/>
	});

	return (
		<section className="event-list">
			<div className="container-my">
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

	console.log("event", event)

	let item = event.customFields;
	const url = `/community/events/${item.url}`

	return (
		<div className="event">
			<div className="event-content">
				{ item.mainImage &&
				 <a href={url}><img src={item.mainImage.url + "?w=400&h=350"} alt={item.mainImage.label} /></a> }
			</div>
			<div className="event-content">
				<a href={url}><h2>{index} - {item.title}</h2></a>
			</div>

		</div>
	)

}
