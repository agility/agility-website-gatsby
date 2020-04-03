import React from 'react';
import { renderHTML } from '../agility/utils'

import "./InfoBox.scss"

const InfoBox = ({item, dynamicPageItem}) => {

	let tagStr = null;

	if (dynamicPageItem && dynamicPageItem.properties.definitionName === "BlogTag") {
		tagStr = `${dynamicPageItem.customFields.title} Posts`
	}

	return (
		<div className="info-box">
                <h4 className="h4">{item.customFields.heading}</h4>
				{ tagStr && <h5>{tagStr}</h5>}
                <div className="about">
                    <div dangerouslySetInnerHTML={renderHTML(item.customFields.textblob)}></div>
                </div>
            </div>
	);
}

export default InfoBox;
