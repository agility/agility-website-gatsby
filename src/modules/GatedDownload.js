import React from 'react';
import FullPageForm from '../components/full-page-form.jsx'
import FormField from '../components/_form-field.jsx'

import { getLeadSourceDetailForForm } from '../utils/lead-utils.js'

import "./GatedDownload.scss"

const GatedDownload = ({ item }) => {

	item = item.customFields

	const firstNameLabel = item.firstNameLabel ?? 'First Name'
	const lastNameLabel = item.lastNameLabel ?? 'Last Name'
	const emailLabel = item.emailLabel ?? 'Work Email'
	const phoneLabel = item.phoneLabel ?? 'Phone'
	const companyLabel = item.companyLabel ?? 'Company'

	return (
		<FullPageForm
				colour={item.backgroundColour}
				title={item.leftColumnTitle}
				subTitle={null}
				text={item.leftColumnBody}
				formTitle={item.rightColumnTitle}
				conversionScript={item.conversionScript}
				redirectURL={item.redirectURL}
				postURL={item.submissionPOSTURL}
				submissionCopy={item.submissionCopy}
				submitButtonLabel={ item.submitButtonLabel }
			>
				<FormField id="firstname" label={ firstNameLabel }>
					<input id="firstname" className="changed" type="text" placeholder={ firstNameLabel } required />
				</FormField>
				<FormField id="lastname" label={ lastNameLabel }>
					<input id="lastname" className="changed" type="text" placeholder={ lastNameLabel } required />
				</FormField>
				<FormField id="email" label={ emailLabel }>
					<input id="email" className="changed" type="email" placeholder={ emailLabel } required />
				</FormField>
				<FormField id="phonenumber" label={ phoneLabel }>
					<input id="phonenumber" className="changed" type="tel" placeholder="XXX-XXX-XXXX" minLength="9" maxLength="20" required />
				</FormField>

				<FormField id="company" label={ companyLabel }>
					<input id="company" className="changed" type="text" placeholder={ companyLabel } required />
				</FormField>

				<input type="hidden" id="journeytrigger" name="journeytrigger" value={item.autopilotJourneyTrigger} />
				<input type="hidden" id="leadsourcedetail" name="leadsourcedetail" value={getLeadSourceDetailForForm(item.formID)} />
				<input type="hidden" name="_autopilot_session_id" />
			</FullPageForm>
	);
}

export default GatedDownload;
