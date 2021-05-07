import React, {useRef, useEffect } from 'react';
import { renderHTML } from '../agility/utils'
import './TriplePanelComparisonModule.scss'
import LazyLoad from 'react-lazyload'
import Spacing from './Spacing'
import Helpers from '../global/javascript/Helpers'
import { animationElementInnerComponent } from '../global/javascript/animation'

const TriplePanelComparisonModule = ({ item }) => {
	const classSection = `module TriplePanelComparisonModule ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode bg-17 text-white': ''}`

	const heading = item.customFields.title
	const des = item.customFields.description

	const panel1CheckedContent = item.customFields.panel1CheckedContent
	const panel1Title = item.customFields.panel1Title
	const panel1Icon = item.customFields.panel1Graphic && item.customFields.panel1Graphic.url ? item.customFields.panel1Graphic.url : 'images/icon3col.svg'
	const panel1UncheckedContent = item.customFields.panel1UncheckedContent

	const panel2CheckedContent = item.customFields.panel2CheckedContent
	const panel2Title = item.customFields.panel2Title
	const panel2Icon = item.customFields.panel2Graphic && item.customFields.panel2Graphic.url ? item.customFields.panel2Graphic.url : 'images/icon3col.svg'
	const panel2UncheckedContent = item.customFields.panel2UncheckedContent

	const panel3CheckedContent = item.customFields.panel3CheckedContent
	const panel3Title = item.customFields.panel3Title
	const panel3Icon = item.customFields.panel3Graphic && item.customFields.panel3Graphic.url ? item.customFields.panel3Graphic.url : 'images/icon3col.svg'
	const panel3UncheckedContent = item.customFields.panel3UncheckedContent
	const thisModuleRef = useRef(null)


	//item = item.customFields;
	// console.log("TriplePanelComparisonModule", item)

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
				<div className='space-80 space-dt-100'></div>
				<div className="container last-mb-none max-w-940 text-center anima-bottom animation">
				{ heading &&
					<h2>{heading}</h2>
				}
				{ des &&
					<div dangerouslySetInnerHTML={renderHTML(des)} />
				}
				</div>
				<div className="container small-paragraph animation">
				<div className="row anima-bottom delay-2">
					<div className="col-md-4 item-3col item-3col-v2 anima-bottom delay-4">
							<div className="img-3col d-flex align-items-center">
							<LazyLoad offset={ Helpers.lazyOffset }>
								<img src={panel1Icon} alt={panel1Title} />
							</LazyLoad>
							</div>
							<div className="content-3col last-mb-none">
								{ panel1Title &&
									<h4>{panel1Title}</h4>
								}
								<div className="last-mb-none">
									{panel1CheckedContent &&
									<div className="list-check check">{panel1CheckedContent}</div>
									}
									{ panel1UncheckedContent &&
										<div className="list-check uncheck">{panel1UncheckedContent}</div>
									}
								</div>
							</div>
						</div>
						<div className="col-md-4 item-3col item-3col-v2 anima-bottom delay-4">
							<div className="img-3col d-flex align-items-center">
							<LazyLoad offset={ Helpers.lazyOffset }>
								<img src={panel2Icon} alt={panel2Title} />
							</LazyLoad>
							</div>
							<div className="content-3col last-mb-none">
								{ panel2Title &&
									<h4>{panel2Title}</h4>
								}
								<div className="last-mb-none">
									{panel2CheckedContent &&
									<div className="list-check check">{panel2CheckedContent}</div>
									}
									{ panel2UncheckedContent &&
										<div className="list-check uncheck">{panel2UncheckedContent}</div>
									}
								</div>
							</div>
						</div>
						<div className="col-md-4 item-3col item-3col-v2 anima-bottom delay-4">
							<div className="img-3col d-flex align-items-center">
							<LazyLoad offset={ Helpers.lazyOffset }>
								<img src={panel3Icon} alt={panel3Title} />
							</LazyLoad>
							</div>
							<div className="content-3col last-mb-none">
								{ panel1Title &&
									<h4>{panel3Title}</h4>
								}
								<div className="last-mb-none">
									{panel3CheckedContent &&
									<div className="list-check check">{panel3CheckedContent}</div>
									}
									{ panel3UncheckedContent &&
										<div className="list-check uncheck">{panel3UncheckedContent}</div>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Spacing item={item}/>
		</React.Fragment>
	);
}

export default TriplePanelComparisonModule;
