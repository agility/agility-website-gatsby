import React, {useEffect, useState } from 'react';
import { graphql, StaticQuery } from "gatsby"
import { renderHTML } from '../agility/utils'

import "./GettingStarted.scss"
import './RichTextArea.scss'

export default props => (
	<StaticQuery
		query={graphql`
		query GettingStartedQuery {
			allAgilityGettingStartedItem(filter: {properties: {referenceName: {eq: "gettingstarteditems"}}}, sort: {order: ASC, fields: properties___itemOrder}) {
			  nodes {
				contentID
				languageCode
				customFields {

				  content
				  heading
				  title
				  personaCookieValue
				  cardImage {
					label
					url
				  }
				  image {
					url
					label
				  }
				  primaryButton {
					href
					target
					text
				  }
				  secondaryButton {
					href
					target
					text
				  }
				  thirdCTA {
					href
					target
					text
				  }

				}
			  }
			}
		  }

        `}
		render={queryData => {

			//filter out only those logos that we want...
			let gettingStartedItems = queryData.allAgilityGettingStartedItem.nodes;


			const viewModel = {
				item: props.item,
				gettingStartedItems
			}
			return (
				<GettingStarted {...viewModel} />
			);
		}}
	/>
)

const GettingStarted = ({ item, gettingStartedItems }) => {
	const [persona, setPersona] = useState(null)
	item = item.customFields;


	const setCurrentPersona = (personaValue, contentID) => {
		console.log("setPersona", personaValue, contentID)
		if (typeof window !== 'undefined'
			&& window.localStorage
			&& window.localStorage.setItem
			) {
				window.localStorage.setItem("persona", personaValue)
			}


		setPersona(personaValue)
	}

	useEffect(() => {
		//load the eventbrites cript - but only if we have to
		if (typeof window === 'undefined'
			|| !window.localStorage
			|| !window.localStorage.getItem
			) return;

		const localPersona = window.localStorage.getItem("persona");

		setPersona(localPersona)
	}, [])


	const itemToShow = gettingStartedItems.find(g => g.customFields.personaCookieValue === persona)
	let selectedID = itemToShow ? itemToShow.contentID : -1

	console.log("persona", persona, selectedID)

	return (
		<section className="getting-started">
			<h2 className="title-component">{item.heading}</h2>
			<div className="container-my">
				<div className="cards">
				{ gettingStartedItems.map(g => (
					<button key={`gsc-${g.contentID}`} className={`card ${g.contentID === selectedID ? "selected" : ""}`} onClick={() => {setCurrentPersona(g.customFields.personaCookieValue, g.contentID )}}>
						<div className="card-image" style={{backgroundImage:`url(${g.customFields.cardImage.url}?w=400)`}}>&nbsp;</div>
						<div className="card-title">
							<h3>{g.customFields.title}</h3>
						</div>
					</button>
				))}
				</div>

				<div className="item-container">
				{ gettingStartedItems.map(g => (
					<div className={`item ${g.contentID === selectedID ? "selected" : ""}`} key={`gsi-${g.contentID}`}>
						<div className="item-flex">

							<div className="item-image"><img src={`${g.customFields.image.url}?w=800`} alt={g.customFields.image.label} /></div>
							<div className="item-content">
								<h3>{g.customFields.heading}</h3>
								<div className="rich-text" dangerouslySetInnerHTML={renderHTML(g.customFields.content)}></div>

								<div className="item-ctas">
									<a className="btn primary-cta" href={g.customFields.primaryButton.href} target={g.customFields.primaryButton.target}>{g.customFields.primaryButton.text}</a>
									{ g.customFields.secondaryButton &&
										<a className="btn secondary-cta" href={g.customFields.secondaryButton.href} target={g.customFields.secondaryButton.target}>{g.customFields.secondaryButton.text}</a>
									}
								</div>
								{ g.customFields.thirdCTA &&
										<div className="third-cta-row">
											<a className="third-cta" href={g.customFields.thirdCTA.href} target={g.customFields.thirdCTA.target}>{g.customFields.thirdCTA.text}</a>
										</div>
									}
							</div>

						</div>
					</div>
					))}
				</div>
			</div>
		</section>

	);
}

