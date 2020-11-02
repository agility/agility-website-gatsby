import React from 'react';
import { hot } from 'react-hot-loader/root'

class FormField extends React.Component {

	constructor(props) {
		super(props)

		this.state = {

		};
	}

	render() {




		return (

			<div className="form-item">
				<div className="invalid-feedback"></div>
				<label htmlFor={this.props.id} >{this.props.label}</label>
				{this.props.children}
				{/* pattern email: [a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,} */}
				{/* <input id={this.props.id} className="form-control" required={this.props.required} name={this.props.label} type={type} />
				 */}

			</div>
		);
	}
}

export default hot(FormField);