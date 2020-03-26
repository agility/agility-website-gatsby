import React from 'react';

import './Callout.scss'

const Callout = ({ item }) => {

	item = item.customFields;
	const callout = item.callout.customFields;
console.log("callout", item)
	var isPrimaryColor = item.theme === 'primary';
	var calloutClasses = 'features p-w callout' + (!isPrimaryColor ? ' callout-secondary' : '');
	var buttonClasses = 'btn' + (!isPrimaryColor ? ' btn-secondary' : '');

	return (

		<section className={calloutClasses}>
			{callout.title && callout.title.length > 0 &&
			<h3>{callout.title}</h3>
			}
			{callout.caption && callout.caption.length > 0 &&
			<p>{callout.caption}</p>
			}
			{callout.link &&
			<a href={callout.link.href} className={buttonClasses} target={callout.link.target}>{callout.link.text}</a>
			}
		</section>


	);
}

export default Callout;
