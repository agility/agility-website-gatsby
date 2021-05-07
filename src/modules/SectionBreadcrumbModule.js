import React, { useEffect, useRef } from 'react';
import Spacing from './Spacing'
import './SectionBreadcrumbModule.scss'
import { animationElementInnerComponent } from '../global/javascript/animation'

const SectionBreadcrumbModule = ({ item }) => {
	const heading = item.customFields.sectionBreadcrumb
	const classSection = `SectionBreadcrumbModule animation ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode dark-breadcrum bg-17': ''}`

	const thisModuleRef = useRef(null)
	/* animation module */
	useEffect(() => {
		const scrollEventFunc = () => {
			animationElementInnerComponent(thisModuleRef.current)
		}
		animationElementInnerComponent(thisModuleRef.current)
		window.addEventListener('scroll', scrollEventFunc)

		return () => {
			window.removeEventListener('scroll', scrollEventFunc)
		}
	}, [])

	return (
		<React.Fragment>
			<section className={classSection} ref={ thisModuleRef }>
				<div className="container last-mb-none anima-bottom">
					<h5>{heading}</h5>
				</div>
			</section>
			<Spacing item={item}/>
		</React.Fragment>
	);
}

export default SectionBreadcrumbModule;
