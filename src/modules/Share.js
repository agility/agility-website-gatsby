import React from 'react';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from 'react-share'

import "./Share.scss"

class Share extends React.Component {


    componentDidMount() {
		if (typeof window === 'undefined') {
			return;
		}


        window.addEventListener('scroll', function() {
            let supportPageOffset = window.pageXOffset !== undefined;
            let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
            let scroll = {
               x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
               y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
            };

            if(scroll.y > 1000){
				let element = document.getElementsByClassName('share')[0]; // target element to change attribute
				if (element && element.classList) {
					element.classList.add('show');//change the attribute.
				}
            } else {
				let element = document.getElementsByClassName('share')[0]; // target element to change attribute
				if (element && element.classList) {
					element.classList.remove('show');
				}
            }
        }, 300);//ms
    }

	render() {

		if (typeof window === 'undefined') {
			return <div className="share"></div>
		}

		const item = this.props.item.customFields;

		return (
            <div className="share">
                <label>{item.shareLabel}</label>
                {item.facebook &&
                <FacebookShareButton quote={document.title} url={window.location.href} className="SocialMediaShareButton">
                    <FacebookIcon size={36} round />
                </FacebookShareButton>
                }
                {item.twitter &&
                <TwitterShareButton quote={document.title}  url={window.location.href} className="SocialMediaShareButton">
                    <TwitterIcon size={36} round />
                </TwitterShareButton>
                }
                {item.linkedIn &&
                <LinkedinShareButton quote={document.title}  url={window.location.href} className="SocialMediaShareButton">
                    <LinkedinIcon size={36} round />
                </LinkedinShareButton>
                }
            </div>

        );
	}

}

export default Share;
