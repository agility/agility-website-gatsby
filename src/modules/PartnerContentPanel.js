import React, { useEffect, useRef, useState } from 'react';
import IntegrationDetailBanner from './IntegrationDetailBanner'

import "./CaseStudyContentPanel.scss"

const PartnerContentPanel = ({ item, dynamicPageItem }) => {
    item = dynamicPageItem.customFields;
    var bgColor = item.brandBGColor;
    var fgColor = item.brandFGColor;
    const [isIntegration, setIsIntegration] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const detectIntegration = () => {
        const detectIntegration = window.location.pathname.includes('/integrations')
        setIsIntegration(detectIntegration)
        setIsLoaded(true)
    }

    useEffect(() => {
        detectIntegration()

        /* animation module */
        // const scrollEventFunc = () => {
        // 	animationElementInnerComponent(bannerRef.current)
        // }
        // animationElementInnerComponent(bannerRef.current)
        // window.addEventListener('scroll', scrollEventFunc)

        return () => {
            // window.removeEventListener('scroll', scrollEventFunc)
        }
    }, []);

    return (
        <React.Fragment>
            {isLoaded && isIntegration && <IntegrationDetailBanner item={item} dynamicPageItem={dynamicPageItem}/>}
            {isLoaded && !isIntegration && <section className="p-w case-study-content-panel" style={{ backgroundColor: bgColor }}>
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
            </section>}
        </React.Fragment>
    );
}

export default PartnerContentPanel;
