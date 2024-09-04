import React, { useEffect } from "react"


import { renderHTML } from '../agility/utils'
import Helpers from '../global/javascript/Helpers'
import Lazyload from 'react-lazyload'


import './ScheduleADemo.scss'
import { Helmet } from "react-helmet"

export default function ScheduleADemo({ item }) {

	useEffect(() => {
		if (typeof window === "undefined") return

		//add the script to the page dynamically
		const script = document.createElement("script");
		script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
		script.async = true;
		document.body.appendChild(script);

		return () => {
			if (typeof window === "undefined") return
			//clean up the script when the component is unmounted
			document.body.removeChild(script);
		}

	}, [])


	return (
		<div id="scheduler-page">

			<section className={"scheduler-container "} >
				<div className="scheduler-inner">
					<div className="scheduler-panel">
						<div className="scheduler-left">
							<div dangerouslySetInnerHTML={renderHTML(item.customFields.leftPanelContent)}></div>
						</div>
						<div className="scheduler-right" >
							<div className="wrap-f-right">
								<div className="meetings-iframe-container" data-src={item.customFields.schedulerIFrameURL}></div>
							</div>
						</div>

					</div>
				</div>

			</section>
		</div>

	);


}