import React from 'react';
import Countries from '../../static/data/countries.json'
import FullPageForm from '../full-page-form.jsx'
import FormField from '../_form-field.jsx'
//import Countries from '../static/data/countries.json'
import { getLeadSourceDetailForForm } from '../../utils/lead-utils.js'
import Select from 'react-select';



const ContactUs = ({ item }) => {

	//console.log("contact us", item)
	item = item.customFields;


	// var countryOptions = Countries.map(country => {
	// 	return <div key={country.country} className="option"><button onClick={getCountryValue}>{country.country}</button></div>

	// });

	const roleOptions = [
		{ value: "C-Suite", label: "C-Suite" },
		{ value: "Marketer", label: "Marketer" },
		{ value: "Procurement", label: "Procurement" },
		{ value: "Developer", label: "Developer" },
		{ value: "IT", label: "IT" },
		{ value: "Partner", label: "Partner" }
	];

	const handleRoleChange = selectedOption => {
		document.getElementById("role").value = selectedOption.value;
	};

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
		>
			<FormField id="firstname" label="First Name">
				<input id="firstname" className="changed" type="text" placeholder="First Name" required />
			</FormField>
			<FormField id="lastname" label="Last Name">
				<input id="lastname" className="changed" type="text" placeholder="Last Name" required />
			</FormField>
			<FormField id="email" label="Email">
				<input id="email" className="changed" type="email" placeholder="Email" required />
			</FormField>
			{/* <FormField id="phonenumber" label="Phone">
                    <input id="phonenumber" className="changed" type="tel" placeholder="Phone" minLength="9" maxLength="20" required />
                </FormField> */}

			<FormField id="company" label="Company">
				<input id="company" className="changed" type="text" placeholder="Company" required />
			</FormField>

			<FormField id="role" label="Role">

				<Select className="react-select" classNamePrefix="rs"
					onChange={handleRoleChange}
					options={roleOptions}
					placeholder="Role"
				/>



				<input id="role" name="role" required className="hidden" />



                </FormField>

				<FormField id="comment" label="Comment">
					<input id="comment" className="changed" placeholder="Questions or Comments" />
				</FormField>

				<input type="hidden" id="leadsourcedetail" name="leadsourcedetail" value={getLeadSourceDetailForForm(item.formID)} />
				<input type="hidden" name="_autopilot_session_id" />



            </FullPageForm>


        );

}
export default ContactUs;