
import { Link } from "gatsby"
import React from "react"
import { renderHTML } from '../agility/utils'

import './RightCTA.scss'

const RightCTA = ({rightCTAButton, rightCTAContent}) => {

  return (
		<>
			{rightCTAContent && rightCTAButton.href &&
				<div className="learn-more-cta bg-58 text-white">
					<div className="d-table w-100">
						<div className="d-table-cell align-middle text-center small-paragraph last-mb-none">
							<div dangerouslySetInnerHTML={renderHTML(rightCTAContent)}></div>
							{ rightCTAButton &&
								<Link to={rightCTAButton.href} className="btn btn-white mb-0">{rightCTAButton.text}</Link>
							}
						</div>
					</div>
				</div>
			}
		</>
  )
}

export default RightCTA