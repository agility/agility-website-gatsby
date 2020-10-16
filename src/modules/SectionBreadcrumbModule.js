import React from 'react';
import Spacing from './Spacing'
import './SectionBreadcrumbModule.scss'

const SectionBreadcrumbModule = ({ item }) => {
	console.log("SectionBreadcrumbModule", item)

	const heading = item.customFields.sectionBreadcrumb
	const classSection = `SectionBreadcrumbModule animation ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode dark-breadcrum bg-17': ''}`
	return (
		<React.Fragment>
			<section className={classSection}>
				<div className="container last-mb-none anima-bottom">
					<h5>{heading}</h5>
				</div>
			</section>
			<Spacing item={item}/>
		</React.Fragment>
	);
}

export default SectionBreadcrumbModule;
