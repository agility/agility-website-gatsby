import React from 'react';
import { renderHTML } from '../agility/utils'
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import "./CaseStudyContentPanel.scss"

const CaseStudyContentPanel = ({ item, dynamicPageItem }) => {

	let caseStudy = dynamicPageItem.customFields;

	let bgColor = caseStudy.brandBGColor;
	let fgColor = caseStudy.brandFGColor;

	return (

		<section className="p-w case-study-content-panel" style={{ backgroundColor: bgColor }}>


			<div className="container-my">
				<div className="content-panel-flex">

					{caseStudy.imagePosition === 'left' &&

						<div className="start-image">
							{caseStudy.image && caseStudy.image != null &&
								<AgilityImage image={caseStudy.image} layout="constrained" width="500"   />
							}
						</div>

					}

					<div className="start-content">
						<div className="sc-inner">
							<div className="image">
								{caseStudy.customerLogo && caseStudy.customerLogo != null ? <img src={caseStudy.customerLogo.url} alt={caseStudy.customerLogo.label} /> : null}
							</div>
							<div style={{ color: fgColor }} dangerouslySetInnerHTML={renderHTML(caseStudy.contentPanelCopy)} />
						</div>
					</div>



					{caseStudy.imagePosition === 'right' &&

						<div className="start-image">
							<div className="image-inner">
								{caseStudy.image && caseStudy.image != null ? <img src={caseStudy.image.url + '?w=500&h=500'} alt={caseStudy.image.label} /> : null}
							</div>
						</div>

					}
				</div>
			</div>
		</section>
	);
}

export default CaseStudyContentPanel;
