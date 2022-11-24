import React, { useState } from 'react';

import FullPageForm from '../full-page-form.jsx'
import FormField from '../_form-field.jsx'
import Countries from '../../static/data/countries.json'
import { getLeadSourceDetailForForm } from '../../utils/lead-utils.js'


const FullPageDownloadEbookForm = ({ item }) => {

	const [jobFunction, setJobFunction] = useState("")
	const [jobTitle, setJobTitle] = useState("")
	const [jobTitleOther, setJobTitleOther] = useState("")
	const [jobFunctionOther, setJobFunctionOther] = useState("")

	item = item.customFields;

	const firstNameLabel = item.firstNameLabel
	const lastNameLabel = item.lastNameLabel
	const emailLabel = item.emailLabel
	const phoneLabel = item.phoneLabel
	const companyLabel = item.companyLabel
	const countryLabel = item.countryLabel
	const jobTitleLabel = item.jobTitleLabel
	const jobTitleOptions = item.jobTitleOptions
	const jobFunctionLabel = item.jobFunctionLabel
	const jobFunctionOptions = item.jobFunctionOptions
	const allowGmail = item.allowGmail ? item.allowGmail : "false"
	const useSalesRepSpecificRedirect = item.useSalesRepSpecificRedirect ? item.useSalesRepSpecificRedirect : "false"

	const autopilotJourneyTrigger = item.autopilotJourneyTrigger || ""

	return (
		<FullPageForm
			colour={item.backgroundColour}
			title={item.leftColumnTitle}
			subTitle={null}
			text={item.leftColumnBody}
			formTitle={item.rightColumnTitle}
			thanksMessage={item.thanksMessage}
			conversionScript={item.conversionScript}
			redirectURL={item.redirectURL}
			postURL={item.submissionPOSTURL}
			submissionCopy={item.submissionCopy}
			submitButtonLabel={item.submitButtonLabel}
			allowGmail={allowGmail}
			useSalesRepSpecificRedirect={useSalesRepSpecificRedirect}

		>

			<FormField id="firstname" label={firstNameLabel}>
				<input id="firstname" className="changed" type="text" placeholder={firstNameLabel} required />
			</FormField>
			<FormField id="lastname" label={lastNameLabel}>
				<input id="lastname" className="changed" type="text" placeholder={lastNameLabel} required />
			</FormField>
			<FormField id="company" label={companyLabel}>
				<input id="company" className="changed" type="text" placeholder={companyLabel} required />
			</FormField>
			<FormField id="email" label={emailLabel}>
				<input id="email" className="changed" type="email" placeholder={emailLabel} required />
			</FormField>
			<FormField id="phonenumber" label={phoneLabel}>
				<input id="phonenumber" className="changed" type="tel" placeholder={phoneLabel} minLength="9" maxLength="20" message="Please enter your phone number." required />
			</FormField>

			<input type="hidden" id="leadsourcedetail" name="leadsourcedetail" value={getLeadSourceDetailForForm(item.formID)} />
			<input type="hidden" name="_autopilot_session_id" />
			<input type="hidden" name="journeytrigger" value={autopilotJourneyTrigger} />


		</FullPageForm >


	);

}
export default FullPageDownloadEbookForm;