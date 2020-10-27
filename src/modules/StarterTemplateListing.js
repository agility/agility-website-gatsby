import React, { useEffect, useState } from 'react';
import { Link, graphql, StaticQuery } from "gatsby";
import Spacing from './Spacing';

import LazyBackground from '../utils/LazyBackground';


import "./StarterTemplateListing.scss"

import './StarterTemplateListing.scss'
export default props => (
	<StaticQuery
		query={graphql`
		query StarterTemplateListQuery {
			allAgilityProjectTemplate(sort: {fields: properties___itemOrder, order: ASC}) {
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

	console.log('moduleItem', moduleItem)
	const cardPerPage = 6;
	let quantityPage = Math.ceil(templates.length / cardPerPage);
	const [currentPage, setCurrentPage] = useState(0);
	useEffect(() => {
		init()
		equalHeightContent()

		window.addEventListener('resize', (e) => {
			equalHeightContent();
		})
	})
	const init = () => {
		let url_string = window.location.href;
		let url = new URL(url_string);
		let page = url.searchParams.get('page');
		page = page - quantityPage < 0 ? page : quantityPage
		let current = (page - 1) >= 0 ? (page - 1) : 0
		// console.log(current)
		setCurrentPage(current);
		window.history.replaceState({},'', '/starters?page='+ (current + 1) +'');
	}
	const currentList = templates.filter((item, idx) => {
		if (idx < cardPerPage * currentPage + cardPerPage) {
			return item;
		}
	});

	const loadMoreAction = () => {
		setCurrentPage(currentPage + 1);
		window.history.replaceState({},'', '/starters?page='+ (currentPage + 2) +'');
	}

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
	const templates2 = currentList.map((template, index) => {
		return <div className="col-md-6 col-xl-4 stater-col" key={moduleItem.contentID + "-" + template.contentID}>
						<StarterCard moduleItem={moduleItem} template={template} index={index} />
					</div>
	});


	return (
		<React.Fragment>
			<section className="getting-starter">
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
					<div className="row animation anima-bottom delay-2">
						{ templates2 }
					</div>
					{ currentPage < quantityPage - 1 &&
						<div className="text-center btn-load-more  animation anima-bottom delay-4">
							<span className={`text-decoration-none btn btn-outline-primary`} onClick={() => {loadMoreAction(); }}>Load More</span>
						</div>
					}


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
				<Link to={url} className="ps-as stater-hover d-flex align-items-center justify-content-center">
					{ moduleItem.customFields.viewDetailsLabel &&
						<Link to={url} className="btn btn-arrow">{moduleItem.customFields.viewDetailsLabel}</Link>
					}
				</Link>
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
					<div key={framework.contentID} className="framk-logo">
						<img src={framework.customFields.logo.url} alt={framework.customFields.logo.label}/>
					</div>
				))
			}
			{ moduleItem.customFields.viewDetailsLabel &&
				<Link to={url} className="ps-as d-lg-none"><span className='sr-only'>{moduleItem.customFields.viewDetailsLabel}</span></Link>
			}
			</div>
		</div>
	)
}
