import React from 'react';
import { graphql, StaticQuery } from "gatsby"
import { renderHTML } from '../agility/utils'

import "./CaseStudyDetails.scss"
import "./RichTextArea.scss"

export default props => (
	<StaticQuery
		query={graphql`
		query KeyValuePairPartnerDetailsQuery {
			allAgilityKeyValuePair {
			  nodes {
				contentID
				languageCode
				properties {
				  referenceName
				  itemOrder
				}
				customFields {
				  key
				  value
				}
			  }
			}
		  }

        `}
		render={queryData => {

			const metricsReferenceName = props.dynamicPageItem.customFields.metrics.referencename;

			//filter out only those logos that we want...
			let metrics = queryData.allAgilityKeyValuePair.nodes.filter(m => {
				return m.properties.referenceName === metricsReferenceName;
			});


			const viewModel = {
				dynamicPageItem: props.dynamicPageItem,
				item: props.item,
				metrics: metrics
			}
			return (
				<PartnerDetails {...viewModel} />
			);
		}}
	/>
)

const PartnerDetails = ({ item, dynamicPageItem, metrics }) => {

	item = dynamicPageItem.customFields;

	var bgColor = item.bgColor;
	metrics = metrics.map(function (metric) {
		return (
			<div className="metrics-item" style={{ color: bgColor }}>
				<h4 className="h4" dangerouslySetInnerHTML={{ __html: metric.value }}></h4>
				<hr style={{ backgroundColor: bgColor }} />
				<span>{metric.title}</span>
			</div>
		);
	});

	return (
		<section className="p-w case-study-details">
			<div className="container-my">

					{
						metrics && metrics.length > 0 &&
						<div className="col-md-12">
							<div className="case-study-top d-flex jc-sb">
								{metrics}
							</div>
						</div>
					}

					<div className="case-study-details-container">

						<div className="case-study-left">
							<div className="rich-text" dangerouslySetInnerHTML={renderHTML(item.textblob )}></div>
						</div>



					{
						(item.rightContentCopy || item.quote) &&

							<div className="case-study-right">
								<div className="rich-text" dangerouslySetInnerHTML={renderHTML(item.rightContentCopy )}></div>
								{item.quote && <div className="color-text"><p>{item.quote}</p></div> }
							</div>
					}

					</div>



			</div>
		</section>


	);
}
