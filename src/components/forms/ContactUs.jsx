import React, { useState } from 'react';

import FullPageForm from '../full-page-form.jsx'
import FormField from '../_form-field.jsx'
import Countries from '../../static/data/countries.json'
import { getLeadSourceDetailForForm } from '../../utils/lead-utils.js'


const ContactUs = ({ item }) => {

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
		>
			{firstNameLabel &&
				<FormField id="firstname" label={firstNameLabel}>
					<input id="firstname" className="changed" type="text" placeholder={firstNameLabel} required />
				</FormField>
			}
			{lastNameLabel &&
				<FormField id="lastname" label={lastNameLabel}>
					<input id="lastname" className="changed" type="text" placeholder={lastNameLabel} required />
				</FormField>
			}
			{companyLabel &&
				<FormField id="company" label={companyLabel}>
					<input id="company" className="changed" type="text" placeholder={companyLabel} required />
				</FormField>
			}

{jobTitleLabel && jobTitleOptions &&
				<>
					<FormField id="jobtitle" label={jobTitleLabel}>
						<select id="jobtitle" name="rolefield" required className="changed" style={{ display: "block", }} onChange={(e) => setJobTitle(e.target.value)}>
							<option></option>
							{jobTitleOptions.split(",").map(j => {
								return <option key={j}>{j.trim()}</option>
							})}
						</select>
					</FormField>

					<FormField id="jobtitleother" label={`${jobTitleLabel} - Other`} style={{ display: jobTitle === "Other" ? "block" : "none" }}>
						<input id="jobtitleother" className="changed" type="text" placeholder={`${jobTitleLabel} - Other`} onChange={(e) => setJobTitleOther(e.target.value)} />
					</FormField>

				</>
			}

			{jobFunctionLabel && jobFunctionOptions &&
				<>
					<FormField id="jobfunction" label={jobFunctionLabel}>
						<select id="jobfunction" name="rolefield" required className="changed" style={{ display: "block", }} onChange={(e) => setJobFunction(e.target.value)}>
							<option></option>
							{jobFunctionOptions.split(",").map(j => {
								return <option key={j}>{j.trim()}</option>
							})}
						</select>
					</FormField>

					<FormField id="jobfunctionother" label={`${jobFunctionLabel} - Other`} style={{ display: jobFunction === "Other" ? "block" : "none" }}>
						<input id="jobfunctionother" className="changed" type="text" placeholder={`${jobFunctionLabel} - Other`}  onChange={(e) => setJobFunctionOther(e.target.value)}/>
					</FormField>

				</>
			}


			{emailLabel &&
				<FormField id="email" label={emailLabel}>
					<input id="email" className="changed" type="email" placeholder={emailLabel} required />
				</FormField>
			}
			{phoneLabel &&
				<FormField id="phonenumber" label={phoneLabel}>
					<input id="phonenumber" className="changed" type="tel" placeholder={phoneLabel} minLength="9" maxLength="20" message="Please enter your phone number." required />
				</FormField>
			}
			{countryLabel &&
				<FormField id="country" label={countryLabel}>
					<select id="country" className="changed" required>
						<option></option>
						{Countries.map(c => {
							return <option key={c.country}>{c.country}</option>
						})}
					</select>
				</FormField>
			}


			<input type="hidden" id="leadsourcedetail" name="leadsourcedetail" value={getLeadSourceDetailForForm(item.formID)} />
			<input type="hidden" name="_autopilot_session_id" />
			<input type="hidden" name="jobtitle" value={jobTitle === "Other" ? jobTitleOther : jobTitle} />
			<input type="hidden" name="jobfunction" value={jobFunction === "Other" ? jobFunctionOther : jobFunction} />

		</FullPageForm >


	);

}
export default ContactUs;