import React from 'react';


const CenteredCTAPanel = ({ item }) => {


	item = item.customFields;
	console.log("CenteredCTAPanel", item)


	return (
		<section className="right-or-left-content">
			<h2>{item.title}</h2>

		</section>
	);
}

export default CenteredCTAPanel;
