import React from 'react';
import moment from 'moment'
import { Link, graphql, StaticQuery } from "gatsby"

import "./StarterTemplateListing.scss"

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
				}
			}
		}
        `}
		render={queryData => {


			let templates = queryData.allAgilityProjectTemplate.nodes;

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

	const item = moduleItem.customFields;

	templates = templates.map((template, index) => {
		return <StarterTemplate moduleItem={moduleItem} template={template} key={moduleItem.contentID + "-" + template.contentID} index={index} />
	});

	return (
		<section className="template-list">

			<div className="container-my">
				<div className="rotated-bg"></div>

				{item.title &&
					<h2 className="title-component">{item.title}</h2>}
				{item.description &&
					<p className="sub-title">{item.description}</p>}
				<div className="template-list-wrapper">
					{templates}
				</div>
			</div>
		</section>
	)
}

const StarterTemplate = ({ moduleItem, template, index }) => {

	let item = template.customFields;
	const url = `/get-started/starter-templates/${item.slug}`

	return (
		<div className="starter-template">

			<div className="template-image">
				{item.image &&
					<Link to={url}><img src={item.image.url + "?w=600"} alt={item.image.label} loading="lazy" /></Link>}
			</div>
			<div className="template-content">
				<Link to={url}><h2>{item.title}</h2></Link>

				<p>
					{item.description}
				</p>
				<div className="read-more-btn">
					<Link to={url} className="btn">{moduleItem.customFields.viewDetailsLabel}</Link>
				</div>
			</div>
		</div>
	)

}
