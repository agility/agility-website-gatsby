import React, { useEffect, useState } from 'react';
import { Link } from "gatsby"
import moment from 'moment'

import { renderHTML } from '../agility/utils'

import "./StarterTemplateDetails.scss"
import "./RichTextArea.scss"


const StarterDetails = ({ item, dynamicPageItem, page }) => {

	const starterTemplate = dynamicPageItem.customFields;

	//TODO: update the external link...
	const externalLink = "https://manager.agilitycms.com/"
	const frameworks = starterTemplate.frameworks

	return (
		<section className="template-details">
			<div className="container p-w-small rich-text">
				<h1 className="title-component">{starterTemplate.name}</h1>



				<div className="template-image">
					{
						starterTemplate.image &&
						<a href={starterTemplate.previewURL} target="_blank" rel="noopener"><img src={starterTemplate.image.url + "?w=400"} alt={starterTemplate.image.label} /></a>
					}
				</div>

				<div className="template-frameworks">

				{ frameworks.map(framework => (
						<div key={framework.contentID}>
							<img src={framework.customFields.logo.url} alt={framework.customFields.logo.label}/>
						</div>
					)) }

				</div>



					{externalLink &&
						<div className="template-link">
							<a href={externalLink} className="btn">{"Get Started Now"}</a>
						</div>
					}

					<div className="template-content">{starterTemplate.description}</div>



				<Link to="/get-started/starter-templates" className="back d-flex ai-center"><img src="https://static.agilitycms.com/layout/img/ico/gray.svg" alt="" /><span>Back to Template Listing</span></Link>
			</div>
		</section>

	);
}

export default StarterDetails;
