import React from 'react';
import { graphql, StaticQuery } from 'gatsby'

import './CTABlocks.scss'


export default props => (
	<StaticQuery
		query={graphql`
		query CTAQuery {
			allAgilityCtaBlock {
				nodes {
				  customFields {
					image {
					  url
					  width
					}
					link {
					  href
					  text
					}
					subtitle
					title
				  }
				  languageCode
				  contentID
				  properties {
					referenceName
				  }
				}
			  }

		}

        `}
		render={queryData => {

			//filter out only those logos that we want...
			let blocks = queryData.allAgilityCtaBlock.nodes.filter(cta => {
				return cta.properties.referenceName === props.item.customFields.cTABlocks.referencename
			});

			const viewModel = {
				item: props.item,
				blocks: blocks
			}
			return (
				<CTABlocks {...viewModel} />
			);
		}}
	/>
)

const CTABlocks = ({ item, blocks }) => {

	let moduleItem = item;
	item = item.customFields;

	blocks = blocks.map(function (block) {
		return <CtaBlock item={block} key={block.contentID} />
	})

	return (

		<section className="cta-blocks">
			<div className="container-my">

				{ item.heading &&
				<h2 className="title-component">{item.heading}</h2>
				}
				{ item.subHeading &&
				<h3>{item.subHeading}</h3>
				}
				<div className="block-list">
					{blocks}
				</div>
			</div>
		</section>


	);
}


class CtaBlock extends React.Component {

    render() {

		let item = this.props.item.customFields;

        return (
				<div className="cta-block">
					<a className="cta-block-inner" href={item.link.href} title={item.link.text} target={item.link.target}>
						<div className="image">

							{item.image &&
								<img src={item.image.url} alt={item.link.text} />
							}


						</div>
						<p>{item.title}</p>
						{
							item.subtitle &&
							<p className="cta-subtitle">{item.subtitle}</p>
						}
					</a>
				</div>


        );
    }
}
