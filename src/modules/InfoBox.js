import React from 'react';
import { renderHTML } from '../agility/utils'

import "./InfoBox.scss"

const InfoBox = ({ item }) => {

	return (
		<div className="info-box">
                <h4 className="h4">{item.customFields.heading}</h4>
                <div className="about">
                    <div dangerouslySetInnerHTML={renderHTML(item.customFields.textblob)}></div>
                </div>
            </div>
	);
}

export default InfoBox;
