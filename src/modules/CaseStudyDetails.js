import React from 'react';
import { graphql, StaticQuery } from "gatsby"
import { renderHTML } from '../agility/utils'
import CallToAction from "../components/call-to-action.jsx"
import "./CaseStudyDetails.scss"
import "./RichTextArea.scss"

export default props => (
	<StaticQuery
		query={graphql`
		query KeyValuePairCaseStudyQuery {
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
				<CaseStudyDetails {...viewModel} />
			);
		}}
	/>
)

const CaseStudyDetails = ({ item, dynamicPageItem, metrics }) => {

	let caseStudy = dynamicPageItem.customFields;
	let bgColor = caseStudy.brandBGColor;

	console.log({caseStudy, metrics});

         let metricsOutput = metrics.map(function (m) {

			const mItem = m.customFields;
			const key = item.contentID + "-" + m.contentID;
            return (
                <div className="metrics-item" style={{ color: bgColor }} key={key}>

                    <h4 className="h4" dangerouslySetInnerHTML={renderHTML(mItem.value)}></h4>
                    <hr style={{ backgroundColor: bgColor }} />
                    <span>{mItem.key}</span>
                </div>
            );
		});


        return (
            <section className="p-w case-study-details">
                <div className="container-my">
					{ metricsOutput && metricsOutput.length > 0 &&
						<div className="metrics-wrapper">
							<div className="metrics-listing">
								{metricsOutput}
							</div>
						</div>
					}
					<div className="case-study-details-container">

						<div className="case-study-left">
							<div className="rich-text" dangerouslySetInnerHTML={renderHTML(caseStudy.textblob )}></div>
						</div>


                        {
                            (caseStudy.rightContentCopy || caseStudy.quote) &&

                                <div className="case-study-right">
                                    <div className="rich-text" dangerouslySetInnerHTML={renderHTML(caseStudy.rightContentCopy )}></div>
                                    {caseStudy.quote && <div className="color-text"><p>{caseStudy.quote}</p></div> }
                                </div>
                        }

                    </div>

					{ caseStudy.cTA && <CallToAction item={caseStudy.cTA} /> }
                </div>
            </section>


        );
}

