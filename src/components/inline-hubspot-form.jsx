import React, { useEffect, useState } from 'react';
import './full-page-form.scss'
import { renderHTML } from '../agility/utils'
import Helpers from '../global/javascript/Helpers'
import Lazyload from 'react-lazyload'
import { Script } from "gatsby"

const InlineHubspotForm = (props) => {

	const [loaded, setLoaded] = useState(false)

	const { portalId, formId } = JSON.parse(props.hubspotForm);


	const divID = `form_${formId}`;
	let redirectUrl = props.redirectURL ? props.redirectURL.href : undefined;




	useEffect(() => {
		//load the script on the client side...
		if (typeof window === "undefined") return

		if (loaded) return

		if (redirectUrl) {
			let url = window.location.href
			url = url.substring(0, url.indexOf("/", "https://".length))
			redirectUrl = `${url}${redirectUrl}`
		}

		console.log("HUBSPOT FORM INLINE, Redir URL:", redirectUrl)

		setTimeout(function () {
			if (formId) {
				//add the hubspot embed
				let script = document.createElement("script")
				script.src =
					"//js.hsforms.net/forms/v2.js"
				script.async = true
				script.onload = () => {
					window.hbspt.forms.create({
						portalId,
						formId,
						target: `#${divID}`,
						redirectUrl: redirectUrl

					});
				}
				document.body.appendChild(script)
			}

			setLoaded(true)
		}, 100)
	}, [])


	if (!formId) {
		return null
	}




	// var overallColour = props.colour;

	// var isPrimaryTheme = overallColour === 'yellow';
	// var btnStyles = 'btn' + (isPrimaryTheme ? ' btn-secondary' : '');
	var btnStyles = 'btn btn-yellow';
	return (

		<div id={divID}></div>

	);

}
export default InlineHubspotForm;