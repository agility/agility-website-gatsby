import React from 'react';

class Triangles extends React.Component {
	constructor() {
		super()
	}

	render() {

		return (
			<div className="canvas" id="canvas-2">
				<div className="img">
					<i className="item twentyone w58 yellow_triangle"></i>
					<i className="item twentytwo w58 green_triangle rotate"></i>
					<i className="item twentythree w58 green_triangle"></i>
					<i className="item twentyfour w58 green_triangle rotate"></i>
					<i className="item twentyfive w58 yellow_triangle"></i>
					<i className="item twentysix w58 green_triangle"></i>
					<i className="item twentyseven w58 green_triangle"></i>
					<i className="item twentyeight w58 yellow_triangle"></i>
					<i className="item twentynine w58 green_triangle"></i>
					<i className="item thirty w58 green_triangle rotate"></i>
				</div>
			</div>
        );
	}

}

export default Triangles;