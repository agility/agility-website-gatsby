import React from 'react';
import { Link, graphql, StaticQuery } from "gatsby"

import "./PricingPlans.scss"

export default props => (
	<StaticQuery
		query={graphql`
		query PricingPlansQuery {
			allAgilityPricingPlan {
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



	let moduleItem = item;
	item = item.customFields;


	const planSet = plans.map(function (plan) {

		return <PlanItem item={plan} key={moduleItem.contentID + "-" + plan.contentID} />
	});

	return (
		<section className="p-w pricing">
			{ item.title &&
				<h2 className="title-component">{item.title}</h2>
			}

			{item.subTitle &&
				<h3 className="subtitle-component">{item.subTitle}</h3>
			}

			<div className="container-my">
				<div className="plan-flex plans-container">
					{ planSet }
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



class PlanItem extends React.Component {

    render() {

		const componentsSortIDs = this.props.item.customFields.componentsSortIDs.split(",");

		const planIncludes = componentsSortIDs.map(sortID => {
			const component = this.props.item.components.find(c => c.contentID === parseInt(sortID));
			return <PlanInclude item={component} key={component.contentID} />

		});

		const plan = this.props.item.customFields;

        return (

            <div className="plan-item">
                <div className="plan-type">
                    <div className="title-bar">
                        <h3>{ plan.title }</h3>
                    </div>
                    <div className="plan-body">
                    { plan.icon &&
                        <div className="plan-icon"><img src={plan.icon.url} alt={ plan.title } /></div>
                    }

                    { plan.pricePerUnitLabel &&
                        <h4 dangerouslySetInnerHTML={{__html: plan.pricePerUnitLabel}}></h4>
                    }

                    </div>
                    <ul className="plan-features">
                        {planIncludes}
                    </ul>
					{ plan.calltoAction &&
                    <div className="plan-body">
                        <a className="btn" href={plan.calltoAction.href} target={plan.calltoAction.target}>{plan.calltoAction.text}</a>
                    </div>
					}
                </div>
            </div>

        );
    }
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
