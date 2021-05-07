import React, { useEffect, useRef } from 'react';
import { graphql, StaticQuery } from "gatsby"
import { renderHTML } from '../agility/utils'
import './TriplePanelModule.scss'
import LazyLoad from 'react-lazyload';
import Spacing from './Spacing'
import Helpers from '../global/javascript/Helpers'
import { animationElementInnerComponent } from '../global/javascript/animation'

export default props => (
	<StaticQuery
			query={graphql`
				query allAgilityPanelContentItems {
					allAgilityPanelContentItems(sort: {fields: properties___itemOrder}) {
						nodes {
							customFields {
								graphic {
									width
									url
									pixelWidth
									pixelHeight
									label
									height
									filesize
								}
								description
								title
							}
							properties {
								referenceName
								itemOrder
							}
						}
					}
				}
			`}
			render={queryData => {
				const referenceName = props.item.customFields.triplePanelItems.referencename
				const tripePanels = queryData.allAgilityPanelContentItems.nodes.filter(obj => { return obj.properties.referenceName === referenceName})
				const viewModel = {
					item: props.item,
					tripePanels
				}
				return (
					<TriplePanelModule {...viewModel} />
				);
			}}
		/>
	)


const TriplePanelModule = ({ item, tripePanels }) => {
	const heading = item.customFields.title
	const des = item.customFields.description
	const btn1 = item.customFields.cTAButton
	const classSection = `module mod-three-columns TriplePanelModule  ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode bg-17 text-white': ''}`
	// console.log('TriplePanelModule', item)
	// console.log('TriplePanelModule Blog', tripePanels)
	const listPanels = tripePanels.map((obj, idx) => {
		const customField = obj.customFields
		return (
			<div className="col-md-4 item-3col anima-bottom delay-4" key={idx}>
				<div className='box-3col'>
					{ customField.graphic && customField.graphic.url &&
						<div className="img-3col d-flex align-items-center justify-content-center">
							<LazyLoad offset={ Helpers.lazyOffset }>
								<img src={customField.graphic.url} alt={customField.graphic.label} />
							</LazyLoad>
						</div>
					}
					<div className="content-3col last-mb-none">
						<h4>{customField.title}</h4>
						<div className={'last-mb-none'} dangerouslySetInnerHTML={renderHTML(customField.description)}></div>
					</div>
				</div>
			</div>
		)
	})

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
		<div className="container last-mb-none max-w-940 text-center animation anima-bottom">
			{ heading &&
				<h2>{heading}</h2>
			}
			{ des &&
				<div dangerouslySetInnerHTML={renderHTML(des)} />
			}
		</div>
		<div className="container small-paragraph animation">
			{ listPanels.length > 0 &&
				<div className="row anima-bottom delay-2">
					{listPanels}
				</div>
			}
			{ btn1 && btn1.href &&
				<div className="cta-3col text-center last-mb-none anima-bottom delay-4">
					<a href={btn1.href} target={btn1.target} className="btn btn-yellow text-decoration-none">{btn1.text}</a>
				</div>
			}
			</div>
		</section>
		<Spacing item={item}/>
	</React.Fragment>
	);
}