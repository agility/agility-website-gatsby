import React from 'react';
import ContentZone from '../agility/components/ContentZone'

const Template = (props) => {
	return (

		<div>
			<ContentZone name="Top" {...props} />

			<div className="p-w two-column-page">
				<div className="container-my">
					<div className="row-my">
						<div className="left-col">
							<ContentZone name="Main" {...props} />
						</div>
						<div className="right-col">
							<ContentZone name="RightColumn" {...props} />

						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Template;