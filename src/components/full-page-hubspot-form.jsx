import React, { useEffect, useState } from 'react';
import './full-page-form.scss'
import Form from './_form.jsx'
import { renderHTML } from '../agility/utils'
import Helpers from '../global/javascript/Helpers'
import Lazyload from 'react-lazyload'
import { Script } from "gatsby"

const FullPageHubspotForm = (props) => {

	const [loaded, setLoaded] = useState(false)

	const { portalId, formId } = JSON.parse(props.hubspotForm);

	const divID = `form_${formId}`;

	useEffect(() => {
		//load the script on the client side...
		if (typeof window === "undefined") return

		if (loaded) return

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
						target: `#${divID}`
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
		<div id="form-page">
			<section className={"form-container "} >
				<div className="container-my">
					<div className="form-panel">
						<div className="form-left">
							<h1>{props.title}</h1>
							<h3 className="h3">{props.subTitle}</h3>
							<div dangerouslySetInnerHTML={renderHTML(props.text)}></div>
						</div>
						<div className="form-right" >
							<Lazyload offset={Helpers.lazyOffset}><img src="/images/triangle-pattern.svg" className='img-form-top' alt='Form Triangle Pattern' loading="lazy" /></Lazyload>
							<div className="wrap-f-right">

								<div id={divID}></div>


							</div>
							<Lazyload offset={Helpers.lazyOffset}><img src="/images/triangle-pattern.svg" className='img-form-bottom' alt='Form Triangle Pattern' loading="lazy" /></Lazyload>
						</div>

					</div>
				</div>
			</section>
		</div>

	);

}
export default FullPageHubspotForm;