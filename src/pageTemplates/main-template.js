import React from 'react';
import ContentZone from '../agility/components/ContentZone'

const MainTemplate = (props) => {
	return (
		<div className="main-template">
			<ContentZone name="Main" {...props} />
		</div>
	);
}
export default MainTemplate;
