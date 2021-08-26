import React from 'react';

import { renderHTML } from '../agility/utils'


class FeatureBlock extends React.Component {
	render() {

		if (this.props.data.bottomLink) {
			//whole thing is a link
			return (
				<a className="ben-item slide" href={this.props.data.bottomLink.href} title={this.props.data.bottomLink.text} target={this.props.data.bottomLink.target}>
					<div className="img"><img src={this.props.data.icon.url} alt={this.props.data.icon.label} loading="lazy"/></div>
					<h3 className="ben-title">{this.props.data.title}</h3>
					{this.props.data.subtitle &&
						<h4 className="ben-subtitle">{this.props.data.subtitle}</h4>
					}
					<div dangerouslySetInnerHTML={renderHTML(this.props.data.textBlob)} />
				</a>
			)
		} else {
			//no link
			return (
				<div className="ben-item slide">
					<div className="img"><img src={this.props.data.icon.url} alt={this.props.data.icon.label}  loading="lazy"/></div>
					<h3 className="ben-title">{this.props.data.title}</h3>
					{
						this.props.data.subtitle &&
						<h4 className="ben-subtitle">{this.props.data.subtitle}</h4>
					}
					<div dangerouslySetInnerHTML={renderHTML(this.props.data.textBlob)} />

				</div>
			)
		}
	}
}

export default FeatureBlock;
