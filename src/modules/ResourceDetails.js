import React from 'react';
import { Link } from "gatsby"
import {DateTime} from 'luxon'
import { renderHTML } from '../agility/utils'
import ResponsiveImage from '../components/responsive-image.jsx'
import CallToAction from "../components/call-to-action.jsx"
import './ResourceDetails.scss'
import './RichTextArea.scss'
const ResourceDetails = ({ item, dynamicPageItem }) => {
	let resource = dynamicPageItem.customFields;
	item = item.customFields;

	return (
		<section className="resource-details">
			<div className="rich-text">
				<div className="container p-w-small">
					<h1 className="h1">{resource.title}</h1>
					{resource.subTitle &&
						<h4 className="h4">{resource.subTitle}</h4>
					}
					<div className="meta">

							<div className="author-image">
								<img src={resource.author.customFields.image ? resource.author.customFields.image.url + '?w=100' : "https://static.agilitycms.com/authors/blank-head-profile-pic.jpg?w=100"} alt={resource.author.customFields.title ? resource.author.customFields.title : 'author image'} />
							</div>
							<h5 className="h5">{resource.author.customFields.title}</h5>

						<span className="date">{DateTime.fromISO(resource.date).toFormat("MMM d, yyyy")}</span>
					</div>

					{resource.image &&
						<div className="image">
							<ResponsiveImage img={resource.image}
								breaks={[{ w: 640, max: 640 }, { w: 780, max: 800 }, { w: 1200, max: 1920 }]} />
						</div>
					}

					<div className="content">
						<div dangerouslySetInnerHTML={renderHTML(resource.textblob)}></div>

						<div className="download-button">
							{resource.fileDownload &&
								<a className="btn" href={resource.fileDownload.url} title={resource.fileDownload.label}>{resource.fileDownload.label}</a>
							}
						</div>

						{ resource.cTA && <CallToAction item={resource.cTA} /> }

					</div>

					{
						item.backButton && item.backButton.text && item.backButton.href &&
						<Link to={item.backButton.href} className="back d-flex ai-center"><img src="https://static.agilitycms.com/layout/img/ico/gray.svg" alt={item.backButton.text} /><span>{item.backButton.text}</span></Link>
					}
				</div>
			</div>
		</section>
	);
}

export default ResourceDetails;
