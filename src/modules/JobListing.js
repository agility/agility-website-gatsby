import React from 'react';
import { graphql, StaticQuery, Link } from "gatsby"
import { renderHTML } from '../agility/utils'

import "./JobListing.scss"

export default props => (
	<StaticQuery
		query={graphql`
		query JobListingQuery {
			allAgilityJob {
			  nodes {
				properties {
				  referenceName
				  itemOrder
				}
				languageCode
				contentID
				customFields {
				  bottomLink {
					href
					target
					text
				  }
				  icon {
					label
					url
				  }
				  textblob
				  title
				}
			  }
			}
		  }

        `}
		render={queryData => {

			//filter out only those logos that we want...
			let jobs = queryData.allAgilityJob.nodes;

			//filter by tag if neccessary
			jobs = jobs.filter(p => {
				return p.properties.referenceName === "jobpostings";
			});


			const viewModel = {
				item: props.item,
				jobs: jobs
			}
			return (
				<JobListing {...viewModel} />
			);
		}}
	/>
)

const JobListing = ({ item, jobs }) => {

	const moduleItem = item;
	item = item.customFields;

	var jobs = jobs.map(function (f) {

		return <JobContent job={f.customFields} key={moduleItem.contentID + "-" + f.contentID} />;
	})

	return (

		<section className="features  job-listing">

			{item.anchorName &&
				<div id={item.anchorName}></div>
			}

			<h2 className="title-component">{item.title}</h2>
			<div className="container-my">
			<div className="job-listing-wrapper ">

				<div className="job-listing-left">
					<h3>{item.sideTitle}</h3>


					<div className="text" dangerouslySetInnerHTML={renderHTML(item.sideBody)} />
					{item.sideLink &&
						<a className="btn" href={item.sideLink.href} target={item.sideLink.target}>{item.sideLink.text}</a>
					}
				</div>
				<div className="job-listing-right">
					<div className="job-listing-list">
						{jobs}
					</div>
				</div>


			</div>
			</div>
		</section>

	);
}


const JobContent = ({ job }) => {

	return (

			<div className="job-item">
				<div className="item-inner">
					<div className="image">
						<img src={job.icon.url + "?w=200"} alt={job.icon.label} />
					</div>
					<div className="title">
						<h4>{job.title}</h4>
					</div>

					<p dangerouslySetInnerHTML={renderHTML(job.textblob)} />
					{job.bottomLink &&
						<a className="arrow-button" href={job.bottomLink.href} target={job.bottomLink.target}><span>{job.bottomLink.text}</span><img src="https://static.agilitycms.com/layout/img/ico/gray.svg" alt={job.bottomLink.text} /></a>
					}

				</div>
			</div>

	);

}

