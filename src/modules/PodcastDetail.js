import React from 'react';
import { Link } from "gatsby"
import {DateTime} from 'luxon'
import ResponsiveImage from '../components/responsive-image.jsx'
import { renderHTML } from '../agility/utils'
import "./PodcastDetail.scss"
import "./RichTextArea.scss"

const PodcastDetail = ({ item, dynamicPageItem }) => {

	item = dynamicPageItem.customFields;

	return (
		<section className="podcast-details">
                <div className="rich-text">
                    <div className="container p-w-small">
                        <h1 className="h1">{item.title}</h1>
                        <div className="meta d-flex ai-center">
                            <div className="author d-flex ai-center">
                                <h5 className="h5">Episode #{item.episodeNumber}</h5>
                            </div>
                            <span className="date">{DateTime.fromISO(item.date).toFormat("MMM d, yyyy")}</span>
                        </div>
                        <div className="image" >
                            <ResponsiveImage img={item.mainImage}
                                breaks={[{ w: 640, max: 480 }, { w: 900, max: 400 }, { w: 1200, max: 700 }]} />
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: item.embed }}></div>
                        <div className="content" dangerouslySetInnerHTML={renderHTML(item.textblob) }></div>
                        <Link to="/resources/agileliving" className="back d-flex ai-center"><img src="https://static.agilitycms.com/layout/img/ico/gray.svg" alt="Back to Episodes" /><span>Back to Episodes</span></Link>
                    </div>
                </div>
            </section>
	);
}

export default PodcastDetail;
