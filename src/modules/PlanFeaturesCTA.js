import React from 'react';
import { graphql, StaticQuery } from "gatsby"
import "./PlanFeaturesCTA.scss"

export default props => (
	<StaticQuery
		query={graphql`
		query AllCTAPricingPlansQuery {
			allAgilityPricingPlanTierFeature {
			  nodes {
				contentID
				languageCode
				properties {
				  referenceName
				  itemOrder
				}
				customFields {
				  title
				}
			  }
			}
		  }

        `}
		render={queryData => {

			//filter out only those logos that we want...
			let features = queryData.allAgilityPricingPlanTierFeature.nodes;

			const refName = props.item.customFields.planFeatureList.customFields.features.referencename;

			//mod - not used
			//const sortIDs = props.item.customFields.planFeatureList.customFields.featureSortIDs;
			//let sortIDAry = sortIDs.split(",");

			features = features.filter(f => {
				return f.properties.referenceName === refName;
			});

			const viewModel = {
				item: props.item,
				features: features
			}
			return (
				<PlanFeaturesCTA {...viewModel} />
			);
		}}
	/>
)

const PlanFeaturesCTA = ({ item , features}) => {


	const moduleItem = item;
	item = item.customFields;

	//not used....
	//const featureListItem = item.planFeatureList.customFields;

	const planFeatures = features.map(function (f) {
		return <PlanFeature title={f.customFields.title} key={f.contentID + "-"+ moduleItem.contentID} />
	});

	return (

		<section className="plan-features-cta">
			<div className="container-my">
				<div className="content-features">
					<div className="cta-content">
						<div className="content" dangerouslySetInnerHTML={{ __html: item.cTAContent }}></div>
						<div className="button">
							<a href={item.primaryButton.href} target={item.primaryButton.target} className="btn">{item.primaryButton.text}</a>
						</div>
					</div>


					<div className="features-list">
						<h4>{ item.planFeaturesTitle }</h4>
						<ul>
							{planFeatures}
						</ul>
					</div>
				</div>
			</div>
		</section>


	);
}


const PlanFeature = ({title}) => {

        return (
            <li><i className="check"></i> {title}</li>
        )

}
