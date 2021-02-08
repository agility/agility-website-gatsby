import React from 'react';

import PostUtil from '../utils/post-util.js';
import { getLeadSource } from '../utils/lead-utils.js'
import Lazyload, {forceVisible} from 'react-lazyload'
import { Link, graphql, StaticQuery } from "gatsby"
import { renderHTML } from '../agility/utils'

import Helpers from '../global/javascript/Helpers'
//TODO: switch the bottom links to Link...


import './NewGlobalFooter.scss'

//MOD: joelv - moved this here from the LayoutTemplate component
import '../global/_media.scss'

export default props => (
	<StaticQuery
		query={graphql`
      query NewGlobalFooterQuery {
				agilityGlobalFooter {
					customFields {
					subscribeTitle
					subscribeRedirect
					subscribePOSTUrl
					subscribeEmailPlaceholder
					subscribeDescription
					subscribeButtonLabel
					subscribeConfirmationMessage
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
					properties {
						itemOrder
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
					properties {
						itemOrder
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
					properties {
						itemOrder
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
					properties {
						itemOrder
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
					properties {
						itemOrder
					}
					}
				}
				agilitySubscribedThankYou {
					customFields {
						textblob
					}
				}
		  }


        `}
		render={queryData => {


			const viewModel = {
				thanks: queryData.agilitySubscribedThankYou,
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
			subscribeButtonLabel: "Sign up"
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

		this.setState({ isSubmitting: true, subscribeButtonLabel: "Sign up"});
		forceVisible()

		PostUtil.postData(
			postURL,
			data
		).then(response => {
			// window.location.href = postRedirect;
			if(response.status===202){
				document.querySelectorAll('.foter-subscribe')[0].classList.add('thanks-subs')
			}
			// console.table('response', response)
		}).catch(err => {

			this.setState({
				isSubmitting: false,
				subscribeButtonLabel: "Sign up"
			});
		});

	}

	render() {

		let item = this.props.item.customFields;
		let thankText = this.props.item.customFields.subscribeConfirmationMessage
		// console.log('thanks Text: ',thankText)
		// console.log('Footer', this.props)
		let sortFunc = (a, b) => {  return a.properties.itemOrder - b.properties.itemOrder; }

		let column1Links = this.props.item.column1Links.sort(sortFunc);
		let column2Links = this.props.item.column2Links.sort(sortFunc);
		let column3Links = this.props.item.column3Links.sort(sortFunc);
		let followLinks = this.props.item.followLinks.sort(sortFunc);
		let bottomLinks = this.props.item.bottomLinks.sort(sortFunc);

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
				var img = <Lazyload offset={ Helpers.lazyOffset }><img src={lnk.customFields.logo.url} alt={lnk.customFields.logo.label}></img></Lazyload>;
				var a = <a rel="noopener noreferrer" href={lnk.customFields.followURL.href} target={lnk.customFields.followURL.target} title={lnk.customFields.title}>{img}</a>
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
						<Link to={lnk.customFields.uRL.href} target={lnk.customFields.uRL.target}>{lnk.customFields.title}</Link>
					</li>
				);
			})

			return links;
		}

		const getYear = () => {
			const d = new Date();
			return d.getFullYear();
		}
		const classSub = `foter-subscribe small-paragraph `
		return (

			// </footer>
			<footer className="foter p-w bg-46" >
				<div className="container-my container">
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

						<div className={classSub}>{/*  remove class thanks-subs"> */}
							<Lazyload offset={ Helpers.lazyOffset }><img src="/images/bg-top.svg" className='img-footer img-fo-top' alt='mail thank you'></img></Lazyload>
							<div className="box-sub">
								<span>{item.subscribeTitle}</span>
								<p>{item.subscribeDescription}</p>
								{typeof window !== 'undefined' &&
									<form onSubmit={this.submitHandler} action="" className="foter-subscribe-form">
										<label htmlFor='email-subscribe' className="sr-only">email</label>
										<input type="email" placeholder={item.subscribeEmailPlaceholder} id="email-subscribe" name="email" disabled={this.state.isSubmitting} required />
										<button type="submit" className="btn btn-outline-white text-decoration-none" ><span>{this.state.subscribeButtonLabel}</span></button>
										<div  className='loading-sub text-center'>
										<Lazyload offset={ Helpers.lazyOffset }><img src='/images/ajax-loader-white.svg' alt='loading'></img></Lazyload>
										</div>
										<input type="hidden" name="_autopilot_session_id" />
									</form>
								}

							</div>
							<div className="box-thanks justify-content-between flex-wrap align-items-center">
							<div className='image-thanks order-md-2 w-100'>
							<Lazyload offset={ Helpers.lazyOffset }><img src="/images/mail.svg" alt='mail thank you'></img></Lazyload>
								</div>
								<div className="col-left-thanks last-mb-none text-white small-paragraph" dangerouslySetInnerHTML={renderHTML(thankText)}></div>
							</div>
							<Lazyload offset={ Helpers.lazyOffset }><img src="/images/bg-top.svg" className='img-footer img-fo-bot' alt='mail thank you'></img></Lazyload>
						</div>

					</div>
					}

					<div className="foter-copyright">
						<ul className="foter-copyright-menu">
							<li>{item.copyright} {getYear()}</li>
							<li>
								<ul className="d-flex flex-wrap">
									{outputBottomLinks(bottomLinks)}
								</ul>
							</li>
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


