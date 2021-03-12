import React from 'react';

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

				{/* <input id={this.props.id} className="form-control" required={this.props.required} name={this.props.label} type={type} />
				 */}

			</div>
		);
	}
}

export default FormField;