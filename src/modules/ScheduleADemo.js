import React from "react"


import { renderHTML } from '../agility/utils'
import Helpers from '../global/javascript/Helpers'
import Lazyload from 'react-lazyload'


import './ScheduleADemo.scss'
import { Helmet } from "react-helmet"

export default function ScheduleADemo({ item }) {

	console.log("schedule a demo module", item)


	return (
		<div id="scheduler-page">
			<Helmet>
				<script type="text/javascript" src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"></script>
			</Helmet>
			<section className={"scheduler-container "} >
				<div className="scheduler-inner">
					<div className="scheduler-panel">
						<div className="scheduler-left">
							<div dangerouslySetInnerHTML={renderHTML(item.customFields.leftPanelContent)}></div>
						</div>
						<div className="scheduler-right" >
							<div className="wrap-f-right">
								<iframe src={item.customFields.schedulerIFrameURL}></iframe>
							</div>
						</div>

					</div>
				</div>

			</section>
		</div>

	);


}