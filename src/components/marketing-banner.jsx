import React from 'react';
import { hot } from 'react-hot-loader/root'
import './marketing-banner.scss'

class MarketingBanner extends React.Component {

    render() {
        const createMarkup = () => {
            return {__html: this.props.message}
        }
        
        return (

            <div className="marketing-banner">
                <div dangerouslySetInnerHTML={createMarkup()}></div>
            </div>


        );
    }
}
export default hot(MarketingBanner);