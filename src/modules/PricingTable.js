
import React, { useState } from 'react';
import { graphql, StaticQuery } from "gatsby"

import "./PricingTable.scss"

export default props => (
	<StaticQuery
		query={graphql`
		query PricingTableQuery {
			allAgilityPricingTableItem(sort: {order: ASC, fields: properties___itemOrder}) {
				nodes {
				contentID
				customFields {
					rowLabel
					column1Value
					column2Value
					column3Value
				}
				languageCode
				properties {
					referenceName
				}
				}
			}
		  }
		`}
		render={queryData => {

			//filter by ref name
			const referenceName = props.item.customFields.tableValues.referencename

			//filter out only those items that we want...
			let priceItems = queryData.allAgilityPricingTableItem.nodes.filter(p => {
				return p.properties.referenceName === referenceName
			});



			const viewModel = {
				item: props.item,
				priceItems
			}
			return (
				<PricingTable {...viewModel} />
			);
		}
		}
	/>
)


const PricingTable = ({ item, priceItems }) => {
	const [expanded, setExpanded] = useState(false)


	const moduleItem = item
	item = item.customFields

	return (
		<section class="pricing-table container-my">

			<div class="toggle-vis">
				<button class="btn" onClick={() => setExpanded(!expanded)}>{item.expandButtonLabel}</button>
			</div>

			<div class={"toggle-details " + (expanded ? "expanded" : "")}>
				<h2 className="title-component">{item.title}</h2>
				<div className="table-container">
					<table>
						<thead>
							<tr className="title-row">
								<th></th>
								<th>{item.column1Title}</th>
								<th>{item.column2Title}</th>
								<th>{item.column3Title}</th>
							</tr>
							<tr>
								<th></th>
								<th><a className="btn" href={item.column1Link.href} target={item.column1Link.target}>{item.column1Link.text}</a></th>
								<th><a className="btn" href={item.column2Link.href} target={item.column2Link.target}>{item.column2Link.text}</a></th>
								<th><a className="btn" href={item.column3Link.href} target={item.column3Link.target}>{item.column3Link.text}</a></th>
							</tr>
						</thead>

						<tbody>
							{priceItems.map(priceItem => {
								const p = priceItem.customFields
								return (
									<tr>
										<td className="row-label">{p.rowLabel}</td>
										<td>{p.column1Value}</td>
										<td>{p.column2Value}</td>
										<td>{p.column3Value}</td>
									</tr>
								)
							})}


						</tbody>

					</table>
				</div>

			</div>


		</section>
	)


}
