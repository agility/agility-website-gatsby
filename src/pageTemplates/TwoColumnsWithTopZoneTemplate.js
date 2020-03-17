import React from 'react';
import ContentZone from '../agility/components/ContentZone'

const Template = (props) => {
	return (

		<div>
			<ContentZone name="Top" {...props} />

			<div class="p-w two-column-page">
				<div class="container-my">
					<div class="row-my">
						<div class="left-col">
							<ContentZone name="Main" {...props} />
						</div>
						<div class="right-col">
							<ContentZone name="RightColumn" {...props} />

						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Template;
