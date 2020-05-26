import React from 'react';
import { renderHTML } from '../agility/utils'
import "./call-to-action.scss"


const CallToAction = ({ item }) => {

	const cta = item.customFields;

	return (
		<div className="call-to-action">

			{cta.title && <h3>{ cta.title }</h3>}

			{ cta.subtitle && <h4>{cta.subtitle}</h4> }

			{ cta.richText && <div className="rich" dangerouslySetInnerHTML={renderHTML(cta.richText)}></div> }

			{ cta.link && cta.image &&
			<a href={cta.link.href} target={cta.link.target} title={cta.link.title}><img src={cta.image.url} alt={cta.image.label} /></a>
			}

		</div>
	);

}

export default CallToAction;