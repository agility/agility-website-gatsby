import React from 'react';

import './RichTextArea.scss'
import './FeatureList.scss'
const FeatureList = ({ item }) => {
	const moduleItem = item.customFields;
	item = item.customFields;
	var features = item.featureList.map(function (f) {
		return <FeatureListItem item={f} key={f.contentID + "-" + moduleItem.contentID} />;
	})
	return (
		<section className="triangle-feature-list">
			<div className="container-my">
				<div className="">
					<div className="feature-set rich-text">
						<h2>{ item.title }</h2>
						<h3>{ item.subTitle }</h3>

						<ul className="feature-list">
							{features}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}

export default FeatureList;
const FeatureListItem = ({item}) => {
	return (
		<li>
			<h4>{item.customFields.title}</h4>
			<div dangerouslySetInnerHTML={{ __html: item.customFields.textblob }} />
		</li>
	);
}