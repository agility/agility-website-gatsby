import React from 'react';
import { renderHTML } from '../agility/utils'
import './FeaturedPlanCTA.scss'

const FeaturedPlanCTA = ({ item }) => {
	return (
		<div className="container-my">
			<section className="featured-plan-cta">
				<h4 dangerouslySetInnerHTML={renderHTML(item.customFields.title)}></h4>
				<div className="desc" dangerouslySetInnerHTML={renderHTML(item.customFields.textblob)}></div>
				{ item.customFields.primaryButton && item.customFields.primaryButton.href &&
					<a href={item.customFields.primaryButton.href} className="btn" title={item.customFields.primaryButton.text}>{item.customFields.primaryButton.text}</a>
				}
			</section>
		</div>
	);
}

export default FeaturedPlanCTA;
