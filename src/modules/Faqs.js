import React from 'react';
import { graphql, StaticQuery } from 'gatsby'
import Triangles from "../components/triangles.jsx";
import { renderHTML } from '../agility/utils'
import './Faqs.scss'


export default props => (
	<StaticQuery
		query={graphql`
		query FaqQuery {
			allAgilityFaqItem {
				nodes {
				  customFields {
					question
					answer
				  }
				  contentID
				  languageCode
				  properties {
					referenceName
					itemOrder
				  }
				}
			}
		}

        `}
		render={queryData => {


			//filter out only those logos that we want...
			let faqs = queryData.allAgilityFaqItem.nodes.filter(faq => {
				return faq.properties.referenceName === props.item.customFields.faqs.referencename
			}).sort((a, b) => {
				return a.properties.itemOrder - b.properties.itemOrder
			});

			const viewModel = {
				item: props.item,
				faqs: faqs
			}
			return (
				<Faqs {...viewModel} />
			);
		}}
	/>
)

const Faqs = ({ item, faqs }) => {

	let moduleItem = item;
	item = item.customFields;

	faqs = faqs.map(function (faq) {
		return <FaqsContent key={faq.contentID + "-" + moduleItem.contentID} item={faq.customFields} />
	});

	return (

		<section className="features p-w faqs">
			<Triangles />

			<h2 className="title-component">{item.title}</h2>
			<div className="faqs-wrapper">
				<div className="container-my">
					{faqs}
				</div>
			</div>

		</section>


	);
}


const FaqsContent = ({ item }) => {

	return (
		<div className="faq-item">
			<h3 className="h3">{item.question}</h3>
			<div className="content" dangerouslySetInnerHTML={renderHTML(item.answer)}></div>
		</div>
	);
}
