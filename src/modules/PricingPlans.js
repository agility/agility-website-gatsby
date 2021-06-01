import React, { useState } from 'react';
import { Link, graphql, StaticQuery } from "gatsby"

import { Toggle } from "react-toggle-component";

import "./PricingPlans.scss"

const PricingPlanModule = props => (
	<StaticQuery
		query={graphql`
		query PricingPlansQuery {
			allAgilityPricingPlan(filter: {customFields: {isVisible: {eq: "true"}}}) {
				nodes {
				contentID
				properties {
					itemOrder
					referenceName
				}
				languageCode
				customFields {
					calltoAction {
						href
						text
						target
					}
					callToActionCDN {
						href
						target
						text
					}
					description
					icon {
					url
					}
					isRecommended
					price
					priceCDN
					pricePerUnitLabel
					title
					componentsSortIDs
				}
				components {
					contentID
					customFields {
					label
					}
				}
				features {
					contentID
					customFields {
					label
					value
					}
				}
				pricingPlanTier {
					contentID
					customFields {
					title
					}
					features {
					customFields {
						label
						value
					}
					}
				}
				}
			}
			}

        `}
		render={queryData => {

			//filter out only those logos that we want...
			let plans = queryData.allAgilityPricingPlan.nodes.filter(plan => {
				return plan.properties.referenceName === props.item.customFields.plans.referencename
			}).sort((a, b) => {
				return a.properties.itemOrder - b.properties.itemOrder;
			});


			const viewModel = {
				item: props.item,
				plans: plans
			}
			return (
				<PricingPlans {...viewModel} />
			);
		}}
	/>
)

const PricingPlans = ({ item, plans }) => {
	const [currency, setCurrency] = useState("USD")


	let moduleItem = item;
	item = item.customFields;


	const planSet = plans.map(function (plan) {
		if (plan === undefined) return null
		return <PlanItem item={plan} currency={currency} key={moduleItem.contentID + "-" + plan.contentID} />
	});



	const toggleCurrency = (e) => {
		if (e.target.checked) {
			setCurrency("CDN")
		} else {
			setCurrency("USD")
		}
	}

	return (
		<section className="p-w pricing">
			{item.title &&
				<h2 className="title-component">{item.title}</h2>
			}

			{item.subTitle &&
				<h3 className="subtitle-component">{item.subTitle}</h3>
			}

			<div className="container-my">

				<div className="plan-flex plans-container">
					{planSet}
				</div>

				<div className="pricing-currency-toggle">
					<label htmlFor="toggle-currency">
						{/* <img src="https://static.agilitycms.com/flags/usa-flag.svg" alt="" /> */}
						<span>$USD&nbsp;</span>
						<Toggle
							// leftKnobColor="#3c3b6e"
							// rightKnobColor="#d52b1e"
							// leftBorderColor="#3c3b6e"
							// rightBorderColor="#d52b1e"
							leftKnobColor="#333"
							rightKnobColor="#333"
							leftBorderColor="#333"
							rightBorderColor="#333"
							name="toggle-currency"
							onToggle={toggleCurrency}
						/>

						<span>&nbsp;$CAN</span>
						{/* <img src="https://static.agilitycms.com/flags/canada-flag.svg" alt="" /> */}
					</label>
				</div>
				{item.disclaimer &&
					<div className="disclaimer">{item.disclaimer}</div>
				}

				{item.planDetailsURL &&
					<div className="details-button">

						<Link to={item.planDetailsURL.href} className="btn btn-light" title={item.planDetailsURL.label}>{item.planDetailsURL.text}</Link>

					</div>
				}
			</div>
		</section>
	);
}



const PlanItem = ({ currency, item }) => {


	const componentsSortIDs = item.customFields.componentsSortIDs.split(",");


	const planIncludes = componentsSortIDs.map(sortID => {
		const component = item.components.find(c => c.contentID === parseInt(sortID));
		if (! component) return null
		return <PlanInclude item={component} key={component.contentID} />

	});


	const plan = item.customFields;

	return (

		<div className={"plan-item" + (plan.isRecommended === "true" ? " recommended" : "")}>

			<div className="plan-type">
				{plan.isRecommended === "true" &&
					<div className="recommendation">Recommended</div>
				}
				<div className="title-bar">
					<h3>{plan.title}</h3>
				</div>
				<div className="plan-body">
					<div className="plan-image-n-price">
						{plan.icon &&
							<div className="plan-icon"><img src={plan.icon.url} alt={plan.title} /></div>
						}

						<h4 className={currency}>
							<span className={"plan-price"}>{currency === "USD" ? plan.price : plan.priceCDN}</span>
							<span className="plan-price-unit-label" dangerouslySetInnerHTML={{ __html: plan.pricePerUnitLabel }}></span>
						</h4>

						<div className="plan-desc">
							{plan.description}
						</div>


					</div>

				</div>
				<ul className="plan-features">
					{planIncludes}
				</ul>
				{plan.calltoAction &&
					<div className="plan-body">
						{currency !== "CDN" && plan.calltoAction && plan.calltoAction.href &&
							<a className="btn" href={plan.calltoAction.href} target={plan.calltoAction.target}>{plan.calltoAction.text}</a>
						}
						{currency === "CDN" && plan.callToActionCDN && plan.callToActionCDN.href &&
							<a className="btn" href={plan.callToActionCDN.href} target={plan.callToActionCDN.target}>{plan.callToActionCDN.text}</a>
						}
					</div>
				}
			</div>
		</div>

	);

}

class PlanInclude extends React.Component {

	render() {
		return (
			<li>
				{this.props.item.customFields.label}
			</li>
		)
	}
}

export default PricingPlanModule