import React from 'react';
import RichTextArea from './RichTextArea.js'


const SubscribedThankYou = ({ item }) => {


	if (typeof window === 'undefined'
	|| ! window.location
	|| ! window.location.search
	|| window.location.search.toLowerCase().indexOf("subscribed=true") === -1) {
		return <div></div>;
	}

	return (
		<RichTextArea item={item} />
	);
}

export default SubscribedThankYou;
