import React from 'react';
import { getLeadSource, getAutopilotSession } from '../utils/lead-utils.js'

import './LandingPageHeader.scss'


const LandingPageHeaderForm = ({ item }) => {

	item = item.customFields;

	let sectionStyle = {
		backgroundImage: 'url(' + item.backgroundImage.url + ')',
	};

	return (
		<section style={sectionStyle} className="landing-page-header">
			<div className="container-my">
				<div className="header-content">
					{
						item.logo &&
						<div className="logo"><img src={ item.logo.url } alt={item.logo.label} /></div>
					}

					<div className="content" dangerouslySetInnerHTML={{ __html: item.headerContent }}></div>

					{
						item.primaryButton &&
						<div className="button"><a href={item.primaryButton.href} target={item.primaryButton.target} className="btn btn-outline">{item.primaryButton.text}</a></div>
					}
				</div>

				<div className="landing-page-email-form">
					<form>
						<h3 className="form-title">{item.formTitle}</h3>
						<input id="email" className="changed" type="email" placeholder="Enter your email address..." required />

						<button className="btn"
							onClick={(e) => {
								e.preventDefault();
								debugger;

								let emailAddress = document.getElementById('email').value;
								const leadSource = getLeadSource();
								const autopilotSession = getAutopilotSession();

								let href = 'https://account.agilitycms.com/sign-up?product=agility-free';

								if (emailAddress == "") {
									window.alert('Please enter a valid email address');
									return;
								} else {
									href += "&emailAddress=" + emailAddress;
								}
								if (leadSource != "") href += "&leadsource=" + encodeURIComponent(leadSource);
								if (autopilotSession != "") href += "&apsession=" + encodeURIComponent(autopilotSession);

								window.location.href = href;
							}}>
							{item.formButtonLabel}</button>
					</form>

					<p className="disclaimer">We will never share your email without your permission.<br />View our <a href="/privacy-policy" target="_blank">Privacy Policy</a></p>
				</div>


			</div>
		</section>
	);
}

export default LandingPageHeaderForm;
