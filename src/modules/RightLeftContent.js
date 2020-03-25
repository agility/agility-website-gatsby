import React from 'react';
import ResponsiveImage from '../components/responsive-image.jsx'

import './RightLeftContent.scss'

const RightLeftContent = ({ item }) => {

	item = item.customFields;

	let sectionStyle = {

	};

	if (item.imagePlacement !== "left") {
		sectionStyle.flexDirection = "row-reverse"
	}

	return (
		<section className="right-left-content">

			{item.background &&
				<div className={'rotated-bg ' + item.background.customFields.renderType}></div>
			}

			<div className="container-my" style={sectionStyle}>
				<div className="rl-image">

					<ResponsiveImage img={item.image}
						breaks={[{ w: 320, max: 380 }, { w: 300, max: 800 }, { w: 480, min: 801 }]} />


				</div>

				<div className="rl-content">
					<h2>{item.heading}</h2>
					<div className="rl-panel">
						<p>{item.description}</p>

						<ul>
							{
								item.bullet1Title &&
								<li>
									<h3>{item.bullet1Title}</h3>
									<div>{item.bullet1}</div>
								</li>
							}
							{
								item.bullet2Title &&
								<li>
									<h3>{item.bullet2Title}</h3>
									<div>{item.bullet2}</div>
								</li>
							}
							{
								item.bullet3Title &&

								<li>
									<h3>{item.bullet3Title}</h3>
									<div>{item.bullet3}</div>
								</li>
							}

						</ul>
					</div>
				</div>
			</div>


			{/* <div className="container p-w-small">
				<div dangerouslySetInnerHTML={renderHTML(item.customFields.textblob)}></div>
			</div> */}
		</section>
	);
}

export default RightLeftContent;
