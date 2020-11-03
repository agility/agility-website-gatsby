import React, { Component } from 'react';
import FeatureBlock from "../components/feature-block"
import Triangles from "../components/triangles"

import './FeatureBlocks.scss'

class FeatureBlocks extends Component {


	render() {

		//adjust the item...
		let item = this.props.item.customFields;

		var features = item.featureBlocks.map(function (f) {
			return <FeatureBlock data={f.customFields} key={f.contentID} />;
		})

		return (

			<section id="sec-2" className="benefits p-w">
				<Triangles />

				{item.background &&
					<div className="rotated-bg"></div>
				}

				{item.title &&
					<h2 className="title-component">{item.title}</h2>
				}

				<div className="ben-items container">
					<div className="container-my">
						<div className="ben-items-forslider my-slider" id="slider">
							{features}
						</div>

						{item.primaryButton && item.primaryButton.href &&
							<div className="ben-button">
								<a href={item.primaryButton.href} target={item.primaryButton.target} className="btn">{item.primaryButton.text}</a>
							</div>
						}

					</div>
				</div>



			</section>


		);
	}


}

export default FeatureBlocks;
