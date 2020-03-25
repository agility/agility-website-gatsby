import React from 'react';

import PostUtil from '../utils/post-util.js';
import { getLeadSource } from '../utils/lead-utils.js'

import { graphql, StaticQuery } from "gatsby"

//TODO: switch the bottom links to Link...
//import { Link, graphql, StaticQuery } from "gatsby"


import './GlobalFooter.scss'

//MOD: joelv - moved this here from the LayoutTemplate component
import '../global/_media.scss'

export default props => (
	<StaticQuery
		query={graphql`
        query GlobalFooterQuery {
			agilityGlobalFooter {
				customFields {
					subscribeTitle
					subscribeRedirect
					subscribePOSTUrl
					subscribeEmailPlaceholder
					subscribeDescription
					subscribeButtonLabel
					followTitle
					copyright
					column3Title
					column2Title
					column1Title
				}
				column1Links {
					contentID
					customFields {
						title
						uRL {
						href
						target
						text
						}
					}
				}
				column2Links {
					contentID
					customFields {
						title
						uRL {
						href
						target
						text
						}
					}
				}
				column3Links {
					contentID
					customFields {
						title
						uRL {
						href
						target
						text
						}
					}
				}
				followLinks {
					contentID
					customFields {
						title
						followURL {
							href
							target
							text
						}
						logo {
							label
							url
						}
					}
				}
				bottomLinks {
					contentID
					customFields {
						title
						uRL {
							target
							text
							href
						}
					}
				}
			}
		}

        `}
		render={queryData => {


			const viewModel = {
				item: queryData.agilityGlobalFooter,
				isLandingPage: props.isLandingPage

			}
			return (
				<Footer {...viewModel} />
			);
		}}
	/>
)

class Footer extends React.Component {

	constructor(props) {
		super(props);

		if (typeof window === 'undefined') {
			return;
		}

		this.state = {
			isSubmitting: false,
			subscribeButtonLabel: "Subscribe"
		};

		this.submitHandler = this.submitHandler.bind(this);

	}

    /**
	* This is the method that is called on form submit.
	* It stops the default form submission process and proceeds with custom validation.
	**/
	submitHandler(event) {

		event.preventDefault();

		let postURL = this.props.item.customFields.subscribePOSTUrl;
		let postRedirect = this.props.item.customFields.subscribeRedirect;

		const form = event.target;
		let data = {};

		//grab all the name/value pairs for the inputs in this form
		[...form.elements].forEach((input) => {
			if (!input.value || input.value === "") return;
			if (!input.name) return;
			data[input.name] = input.value;
		});

		if (!data["email"]) return;

		let leadSourceDetail = "newsletter-subscribe-form--" + window.location.pathname.replace(/\//g, '-') + "--" + getLeadSource();

		data["leadsourcedetail"] = leadSourceDetail;

		this.setState({ isSubmitting: true, subscribeButtonLabel: "Subscribing..." });


		PostUtil.postData(
			postURL,
			data
		).then(response => {
			window.location.href = postRedirect;
		}).catch(err => {

			this.setState({
				isSubmitting: false,
				subscribeButtonLabel: "Subscribe"
			});
		});

	}

	render() {

		let item = this.props.item.customFields;

		let column1Links = this.props.item.column1Links;
		let column2Links = this.props.item.column2Links;
		let column3Links = this.props.item.column3Links;
		let followLinks = this.props.item.followLinks;
		let bottomLinks = this.props.item.bottomLinks;

		const outputLinks = (lst) => {
			let links = []
			if (!lst || lst.length === null) return null;

			lst.forEach(lnk => {

				links.push(<li className="foter-menu-li" key={lnk.contentID + "-footer"}><a href={lnk.customFields.uRL.href} target={lnk.customFields.uRL.target}>{lnk.customFields.title}</a></li>)
			});

			return <ul>{links}</ul>;
		};

		const outputFollowLinks = (lst) => {
			let links = []
			if (!lst || lst.length === null) return null;

			lst.forEach(lnk => {
				var img = <img src={lnk.customFields.logo.url} alt={lnk.customFields.logo.label}></img>;
				var a = <a href={lnk.customFields.followURL.href} target={lnk.customFields.followURL.target} title={lnk.customFields.title}>{img}</a>
				links.push(<li className="foter-menu-li" key={lnk.contentID}>{a}</li>)
			});

			return links;
		};

		const outputBottomLinks = (lst) => {
			let links = [];
			if (!lst || lst.length === 0) return null;

			lst.forEach(lnk => {
				links.push(
					<li key={lnk.contentID}>
						<a href={lnk.customFields.uRL.href} target={lnk.customFields.uRL.target}>{lnk.customFields.title}</a>
					</li>
				);
			})

			return links;
		}

		const getYear = () => {
			const d = new Date();
			return d.getFullYear();
		}

		return (

			// </footer>
			<footer className="foter p-w" >
				<div className="container-my">
					{ this.props.isLandingPage === false &&
					<div className="foter-inner">

						<ul className="foter-menu menu-product">
							<li className="foter-menu-li title"><span>{item.column1Title}</span></li>
							{outputLinks(column1Links)}
						</ul>
						<ul className="foter-menu menu-about">
							<li className="foter-menu-li title"><span>{item.column2Title}</span></li>
							{outputLinks(column2Links)}
						</ul>
						<ul className="foter-menu menu-information">
							<li className="foter-menu-li title"><span>{item.column3Title}</span></li>
							{outputLinks(column3Links)}
						</ul>

						<div className="foter-subscribe">
							<span>{item.subscribeTitle}</span>
							<p>{item.subscribeDescription}</p>
							{typeof window !== 'undefined' &&
								<form onSubmit={this.submitHandler} action="" className="foter-subscribe-form">
									<input type="email" placeholder={item.subscribeEmailPlaceholder} name="email" disabled={this.state.isSubmitting} required />
									<input type="submit" value={this.state.subscribeButtonLabel} />
									<input type="hidden" name="_autopilot_session_id" />
								</form>

							}

						</div>

					</div>
					}

					<div className="foter-copyright">
						<ul className="foter-copyright-menu">
							<li>{item.bottomCopyright} {getYear()}</li>
							{outputBottomLinks(bottomLinks)}
						</ul>

						<ul className="menu-social">
							{outputFollowLinks(followLinks)}
						</ul>
					</div>
				</div>
			</footer>


		);
	}
}


