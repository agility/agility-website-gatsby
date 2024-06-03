import React from "react"


import { renderHTML } from '../agility/utils'
import Helpers from '../global/javascript/Helpers'
import Lazyload from 'react-lazyload'


import './ScheduleADemo.scss'

export default function ScheduleADemo({ item }) {

	console.log("schedule a demo module", item)


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
								<iframe src={item.customFields.schedulerIFrameURL}></iframe>
							</div>
						</div>

					</div>
				</div>

			</section>
		</div>

	);


}