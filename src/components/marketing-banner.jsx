import React from 'react';
import { hot } from 'react-hot-loader/root'
import './marketing-banner.scss'
import { renderHTML } from '../agility/utils'

class MarketingBanner extends React.Component {

	render() {
		const createMarkup = () => {
			return renderHTML(this.props.message);
		}

		return (

			<div className="marketing-banner">
				<div dangerouslySetInnerHTML={createMarkup()}></div>
			</div>


		);
	}
}
export default hot(MarketingBanner);