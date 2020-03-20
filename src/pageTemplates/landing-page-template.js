import React from 'react';
import ContentZone from '../agility/components/ContentZone'

const Template = (props) => {
	return (
		<div className="landing-page-template">
			<ContentZone name="Main" {...props} />
		</div>
	);
}
export default Template;
