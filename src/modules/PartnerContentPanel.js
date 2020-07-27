import React from 'react';

import "./CaseStudyContentPanel.scss"

const PartnerContentPanel = ({ item, dynamicPageItem }) => {

	//mod - not used
	//const moduleItem = item;
	item = dynamicPageItem.customFields;

	var bgColor = item.brandBGColor;
        var fgColor = item.brandFGColor;

        return (

            <section className="p-w case-study-content-panel" style={{ backgroundColor: bgColor }}>
                <div className="container-my">
				<div className="content-panel-flex">

                        {item.imagePosition === 'left' &&

                                <div className="start-image">
                                    {item.image && item.image != null ? <img src={item.image.url + '?w=500&c=1'} alt={item.image.label} /> : null}
                                </div>

                        }

                            <div className="start-content">
                                <div className="sc-inner">
                                    <div className="image">
                                        {item.studyImage && item.studyImage != null ? <img src={item.studyImage.url} alt="" /> : null}
                                    </div>
                                    <h1 className="h1" style={{ color: fgColor }}>{item.title}</h1>
                                    <div style={{ color: fgColor }} dangerouslySetInnerHTML={{ __html: item.contentPanelCopy }} />
                                </div>
                            </div>



                        {item.imagePosition === 'right' &&

                                <div className="start-image">
                                    <div className="image-inner">
                                        {item.image && item.image != null ? <img src={item.image.url + '?w=500&c=1'} alt={item.image.label} /> : null}
                                    </div>
                                </div>

                        }
                    </div>
                </div>
            </section>
        );
}

export default PartnerContentPanel;
