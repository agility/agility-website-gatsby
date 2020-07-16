import React, { useState } from 'react';
import { Link, graphql, StaticQuery } from "gatsby"

import { Toggle } from "react-toggle-component";

import "./PricingPlans.scss"

export default props => (
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
					description
					icon {
					url
					}
					isRecommended
					price
					priceCDN
					pricePerUnitLabel
					subtitle
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

				<div className="pricing-currency-toggle">
					<label htmlFor="toggle-currency">
						<span>$USD</span><img src="https://static.agilitycms.com/flags/usa-flag.svg" alt="" />
						<Toggle
							leftKnobColor="#3c3b6e"
							rightKnobColor="#d52b1e"
							leftBorderColor="#3c3b6e"
							rightBorderColor="#d52b1e"
							name="toggle-currency"
							onToggle={toggleCurrency}
						/>

						<span>$CDN</span><img src="https://static.agilitycms.com/flags/canada-flag.svg" alt="" />
					</label>
				</div>

				<div className="plan-flex plans-container">

					{planSet}
				</div>

				<div className="disclaimer">{item.disclaimer}</div>

				<div className="details-button">
					<Link to={item.planDetailsURL.href} className="btn btn-light" title={item.planDetailsURL.label}>{item.planDetailsURL.text}</Link>
					{/* <a href={item.planDetailsURL.href} className="btn btn-light" title={item.planDetailsURL.label}>{item.planDetailsURL.text}</a> */}
				</div>
			</div>
		</section>
	);
}



const PlanItem = ({ currency, item }) => {


	const componentsSortIDs = item.customFields.componentsSortIDs.split(",");

	const planIncludes = componentsSortIDs.map(sortID => {
		const component = item.components.find(c => c.contentID === parseInt(sortID));
		return <PlanInclude item={component} key={component.contentID} />

	});

	const plan = item.customFields;

	return (

		<div className={"plan-item" + (plan.isRecommended === "true" ? " recommended" : "")}>
			<div className="plan-type">
				<div className="title-bar">
					<h3>{plan.title}</h3>
				</div>
				<div className="plan-body">
					<div className="plan-image-n-price">
						{plan.icon &&
							<div className="plan-icon"><img src={plan.icon.url} alt={plan.title} /></div>
						}

						<div className="muted">
							{plan.description}
						</div>

						<h4>
							<span>{currency === "USD" ? plan.price : plan.priceCDN}</span>
							<span dangerouslySetInnerHTML={{ __html: plan.pricePerUnitLabel }}></span>
						</h4>
					</div>

				</div>
				<ul className="plan-features">
					{planIncludes}
				</ul>
				{plan.calltoAction &&
					<div className="plan-body">
						<a className="btn" href={plan.calltoAction.href} target={plan.calltoAction.target}>{plan.calltoAction.text}</a>
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
