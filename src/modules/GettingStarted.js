import React, {useEffect, useState } from 'react';
import { graphql, StaticQuery, Link } from "gatsby"
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

	const moduleItem = item;
	item = item.customFields;

	console.log(gettingStartedItems[0])

	const setCurrentPersona = (personaValue, contentID) => {
		console.log("setPersona", personaValue, contentID)
		setPersona(personaValue)
	}

	useEffect(() => {
		setPersona(gettingStartedItems[0].customFields.personaCookieValue)
	}, [])

	const itemToShow = gettingStartedItems.find(g => g.customFields.personaCookieValue === persona)
	const selectedID = itemToShow ? itemToShow.contentID : gettingStartedItems[0].contentID

	console.log("persona", persona, selectedID)

	return (
		<section className="getting-started">
			<h2 className="title-component">{item.heading}</h2>
			<div className="container-my">
				<div className="cards">
				{ gettingStartedItems.map(g => (
					<button key={`gsc-${g.contentID}`} className={`card ${g.contentID === selectedID ? "selected" : ""}`} onClick={() => {setCurrentPersona(g.customFields.personaCookieValue, g.contentID )}}>
						<div className="card-image"><img src={`${g.customFields.cardImage.url}?w=400`} alt={g.customFields.cardImage.label} /></div>
						<h3>{g.customFields.title}</h3>
					</button>
				))}
				</div>

				<div className="item-container">
				{ gettingStartedItems.map(g => (
					<div className={`item ${g.contentID === selectedID ? "selected" : ""}`} key={`gsi-${g.contentID}`}>
						<div className="item-flex">

							<div className="item-content">
								<h3>{g.customFields.title}</h3>
								<div className="rich-text-container" dangerouslySetInnerHTML={renderHTML(g.customFields.content)}></div>

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
							<div className="item-image"><img src={`${g.customFields.image.url}?w=800`} alt={g.customFields.image.label} /></div>
						</div>
					</div>
					))}
				</div>
			</div>
		</section>

	);
}

