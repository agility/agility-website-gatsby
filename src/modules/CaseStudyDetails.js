import React from 'react';
import { renderHTML } from '../agility/utils'
import CallToAction from "../components/call-to-action.jsx"
import "./CaseStudyDetails.scss"
import "./RichTextArea.scss"

const CaseStudyDetails = ({ item, dynamicPageItem }) => {

	let caseStudy = dynamicPageItem.customFields;
	let bgColor = caseStudy.brandBGColor;

	let metrics = null;
	if (caseStudy.metrics && caseStudy.metrics.length && caseStudy.metrics.length > 0)
	{

         metrics = caseStudy.metrics.map(function (item) {
            return (
                <div className="metrics-item" style={{ color: bgColor }}>

                    <h4 className="h4" dangerouslySetInnerHTML={renderHTML(item.value)}></h4>
                    <hr style={{ backgroundColor: bgColor }} />
                    <span>{item.title}</span>
                </div>
            );
		});
	}

        return (
            <section className="p-w case-study-details">
                <div className="container-my">
					{ metrics && metrics.length > 0 &&
						<div className="col-md-12">
							<div className="case-study-top d-flex jc-sb">
								{metrics}
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

export default CaseStudyDetails;
