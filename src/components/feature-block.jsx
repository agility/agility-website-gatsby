import React from 'react';

import { renderHTML } from '../agility/utils'


class FeatureBlock extends React.Component {
	render() {

		return (
			<div className="ben-item slide">

				{this.props.data.bottomLink ? (
					<div className="img"><a href={this.props.data.bottomLink.href} title={this.props.data.bottomLink.text} target={this.props.data.bottomLink.target}><img src={this.props.data.icon.url} alt={this.props.data.icon.label} /></a></div>
				) : (
						<div className="img"><img src={this.props.data.icon.url} alt={this.props.data.icon.label} /></div>
					)}


				<h3 className="ben-title">{this.props.data.title}</h3>
				{this.props.data.subtitle &&
					<h4 className="ben-subtitle">{this.props.data.subtitle}</h4>
				}
				<div dangerouslySetInnerHTML={renderHTML(this.props.data.textBlob)} />
			</div>
		);
	}
}

export default FeatureBlock;
