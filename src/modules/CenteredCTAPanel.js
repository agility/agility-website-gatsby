import React, { useEffect, useRef } from 'react';
import { renderHTML } from '../agility/utils';
import './CenteredCTAPanel.scss'
import Spacing from './Spacing'
import { animationElementInnerComponent } from '../global/javascript/animation'
const CenteredCTAPanel = ({ item }) => {
	const fields = item.customFields;
	const classSection = `module mod-cta ps-rv bg-46 CenteredCTAPanel animation ${fields.darkMode && fields.darkMode === 'true' ? 'dark-mode bg-17 text-white': ''}`
	const btnCta1 = fields.cTA1
	const btnCta2 = fields.cTA2
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
				<div className="triangle-white"></div>
				<div className="container anima-bottom">
					<div className="cta-mx text-center text-white last-mb-none">
						{ fields.title &&
							<h3 className='h2'>{fields.title}</h3>
						}
						{ fields.title &&
							<div className="three-dash-line">
								<span></span>
								<span></span>
								<span></span>
							</div>
						}
						{ fields.description &&
							<div dangerouslySetInnerHTML={renderHTML(fields.description)}></div>
						}
						{ (btnCta1 || btnCta2) &&
							<p>
								{ btnCta1 && btnCta1.href &&
									<a href={btnCta1.href} target={btnCta1.target} className="btn btn-white text-decoration-none">{btnCta1.text}</a>
								}
								{ btnCta2 && btnCta2.href &&
									<a href={btnCta2.href} target={btnCta2.target} className="btn btn-outline-white text-decoration-none">{btnCta2.text}</a>
								}
							</p>
						}
					</div>
				</div>
			</section>
			<Spacing item={item}/>
    </React.Fragment>
	);
}

export default CenteredCTAPanel;
