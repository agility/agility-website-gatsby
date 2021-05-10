import React, { useEffect, useRef, useState } from 'react';
import { Link, graphql, StaticQuery } from "gatsby";
import Spacing from './Spacing';
import { animationElementInnerComponent } from '../global/javascript/animation'

import LazyBackground from '../utils/LazyBackground';


import "./StarterTemplateListing.scss"

import './StarterTemplateListing.scss'
export default props => (
	<StaticQuery
		query={graphql`
		query StarterTemplateListQuery {
			allAgilityProjectTemplate(sort: {fields: properties___itemOrder, order: ASC}, filter: {customFields: {showOnWebsite: {eq: "true"}}}) {
			  nodes {
				contentID
				languageCode
				properties {
				  itemOrder
				}
				customFields {
				  name
				  previewURL
				  qATemplateID
				  templateID
				  image {
					url
				  }
				  documentationLink {
					href
				  }
				  description
				  slug
				  showOnWebsite
				}
				frameworks {
				  contentID
				  customFields {
					title
					logo {
					  url
					  label
					}
				  }
				}
			  }
			}
		  }


	`}
	render={queryData => {
		const templates = queryData.allAgilityProjectTemplate.nodes;
		const viewModel = {
			moduleItem: props.item,
			templates
		}
		return (
			<StarterTemplateListing {...viewModel} />
		);
	}}
	/>
)
const StarterTemplateListing = ({ moduleItem, templates }) => {

	// console.log('templates', templates)
	useEffect(() => {
		equalHeightContent()
		const resizeWindow = (e) => {
			equalHeightContent();
		}
		window.addEventListener('resize', resizeWindow)
		
		return () => {
			window.removeEventListener('resize', resizeWindow)
		}
	}, [])

	const equalHeightContent = () => {
		const contents = document.querySelectorAll('.starter-content')
		let itemPerRows = [];
		if (!contents.length) {
			return false;
		}
		Array.from(contents).forEach((ele) => {
			ele.style.height = '';
		})

		let offset = contents[0].offsetTop;
		let height = contents[0].clientHeight;
		if (window.innerWidth > 767) {
			Array.from(contents).forEach((ele) => {
				if (ele.offsetTop !== offset) {
					Array.from(itemPerRows).forEach(itemRow => {
						itemRow.style.height = height + 'px';
					})

					offset = ele.offsetTop;
					height = ele.clientHeight;
					itemPerRows = [];
				} else {
					itemPerRows.push(ele);
					if (ele.clientHeight > height) {
						height = ele.clientHeight;
					}
				}
			})
			// console.log(height, offset, itemPerRows)

			Array.from(itemPerRows).forEach(itemRow => {
				itemRow.style.height = height + 'px';
			})

		}
		return true;
	}
	const templates2 = templates.map((template, index) => {
		return <div className="col-md-6 col-xl-4 stater-col" key={moduleItem.contentID + "-" + template.contentID}>
						<StarterCard moduleItem={moduleItem} template={template} index={index} />
					</div>
	});

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
			<section className="getting-starter" ref={ thisModuleRef }>
				<div className="container">
					<div className="text-center starter-head mx-auto animation anima-bottom last-mb-none">
						{ moduleItem.customFields.section &&
							<h5>{ moduleItem.customFields.section }</h5>
						}
						{ moduleItem.customFields.title &&
							<h1 className="">{ moduleItem.customFields.title }</h1>
						}
						{ moduleItem.customFields.description &&
							<p>{ moduleItem.customFields.description }</p>
						}
					</div>
					<div className="row animation anima-bottom delay-2 row-custom justify-content-center">
						{ templates2 }
					</div>
				</div>
			</section>
			<Spacing item={moduleItem}/>
		</React.Fragment>
	)
}


const StarterCard = ({ moduleItem, template, index }) => {
	let item = template.customFields;
	const url = `/starters/${item.slug}`

	const frameworks = template.frameworks;

	return (
		<div className="starter-card ps-rv">
			<LazyBackground className="starter-thumb ps-rv bg lazy" src={ item.image.url }>
				<div className="ps-as stater-hover d-flex align-items-center justify-content-center">
					{ moduleItem.customFields.viewDetailsLabel &&
						<Link to={url} className="btn btn-arrow">{moduleItem.customFields.viewDetailsLabel}</Link>
					}
				</div>
			</LazyBackground>
			<div className="starter-content last-mb-none small-paragraph ps-rv">
				{ item.name &&
					<h2 className='h4'><Link to={url}>{ item.name }</Link></h2>
				}
				{ item.description &&
					<p>{ item.description }</p>
				}
			</div>
			<div className="starter-logo">
			{ frameworks.map(framework => (
					<div key={framework.contentID} className="framk-logo d-flex align-items-center">
						<h5>Developed With:</h5><img src={framework.customFields.logo.url} alt={framework.customFields.logo.label}/>
					</div>
				))
			}
			</div>
			<Link to={url} className="ps-as"><span className='sr-only'>{moduleItem.customFields.viewDetailsLabel}</span></Link>
		</div>
	)
}
