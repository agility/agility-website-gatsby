import React from 'react';
import { renderHTML } from '../agility/utils'
import "./call-to-action.scss"


const CallToAction = ({ item }) => {

	const cta = item.customFields;
	if (!cta) return null;
	return (
		<div className="call-to-action">

			{cta.title && <h2 className="title-component">{cta.title}</h2>}

			{cta.subtitle && <h3 className="subtitle">{cta.subtitle}</h3>}

			{cta.richText && <div className="rich" dangerouslySetInnerHTML={renderHTML(cta.richText)}></div>}

			{cta.link && cta.image &&
				<a href={cta.link.href} target={cta.link.target} title={cta.link.title}><img src={cta.image.url} alt={cta.image.label} loading="lazy" /></a>
			}

		</div>
	);

}

export default CallToAction;