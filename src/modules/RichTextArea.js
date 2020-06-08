import React from 'react';
import { renderHTML } from '../agility/utils'

import './RichTextArea.scss'

const RichTextArea = ({ item }) => {

	return (
		<section className="rich-text">
			<div className="container-my" dangerouslySetInnerHTML={renderHTML(item.customFields.textblob)}>
			</div>
		</section>
	);
}

export default RichTextArea;
