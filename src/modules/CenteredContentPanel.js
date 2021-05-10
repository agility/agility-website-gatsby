import React, { useEffect, useRef } from 'react';
import { renderHTML } from '../agility/utils'
import Spacing from './Spacing'
import './CenteredContentPanel.scss'
import { animationElementInnerComponent } from '../global/javascript/animation'

const CenteredContentPanel = ({ item }) => {
	const section = item.customFields.section
	const heading = item.customFields.title
	const des = item.customFields.description
	const btn1 = item.customFields.cTA1
	const btn2 = item.customFields.cTA2
	const classSection = `CenteredContentPanel animation mod-intro hero-text ${item.customFields.darkMode && item.customFields.darkMode === 'true'  ? 'dark-mode': ''}`
	
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
			<div className="container last-mb-none max-w-940 text-center anima-bottom">
				{ section &&
					<h5>{section}</h5>
				}
				{ heading &&
					<h1>{heading}</h1>
				}
				{ des &&
					<div dangerouslySetInnerHTML={renderHTML(des)} />
				}
				{ (btn1 || btn2) &&
					<p>
						{ btn1 && btn1.href &&
							<a href={btn1.href} target={btn1.target} className="text-decoration-none btn btn-primary">{btn1.text}</a>
						}
						{ btn2 && btn2.href &&
							<a href={btn2.href} target={btn2.target} className="text-decoration-none btn btn-outline-primary">{btn2.text}</a>
						}
					</p>
				}
			</div>
		</section>
		<Spacing item={item}/>
		</React.Fragment>
	);
}

export default CenteredContentPanel;
