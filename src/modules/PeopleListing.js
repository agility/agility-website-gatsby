import React from 'react';
import { graphql, StaticQuery } from "gatsby"
import "./PeopleListing.scss"

export default props => (
	<StaticQuery
		query={graphql`
		query LeadershipTeamQuery {
			allAgilityPerson(filter: {properties: {referenceName: {eq: "leadershipteam"}}}, sort: {fields: properties___itemOrder, order: ASC}) {
			  nodes {
				contentID
				languageCode
				customFields {
				  fullName
				  headshot {
					label
					url
				  }
				  jobTitle
				  summary
				}
			  }
			}
		  }
        `}
		render={queryData => {

			//filter out only those logos that we want...
			let team = queryData.allAgilityPerson.nodes;


			const viewModel = {
				item: props.item,
				team: team
			}
			return (
				<PeopleListing {...viewModel} />
			);
		}}
	/>
)

const PeopleListing = ({ item, team }) => {


	team = team.map(function (t) {
		return <PeopleListingContent item={t} key={item.contentID + "-" + t.contentID} />
	})

	return (

		<section className="features p-w people-listing">

			<h2 className="title-component">{item.customFields.title}</h2>
			<p className="intro">{item.customFields.subtitle}</p>
			<div className="container-my">
				<div className="team-content">

					{team}
				</div>
			</div>
		</section>


	);
}


const PeopleListingContent = ({ item }) => {

	item = item.customFields;

	return (
		<div className="team-item">

			<div className="image">
				{item.headshot && item.headshot != null && item.headshot.url
					? <img src={item.headshot.url} alt="" />
					: null
				}
			</div>
			<div className="content">
				<h4 className="h4">{item.fullName}</h4>
				<em>{item.jobTitle}</em>
				<div className="text" dangerouslySetInnerHTML={{ __html: item.summary }}></div>
			</div>
		</div>

	);

}