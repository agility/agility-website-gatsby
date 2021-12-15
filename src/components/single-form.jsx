import React from 'react';
import './full-page-form.scss'
import Form from './_form.jsx'
import { renderHTML } from '../agility/utils'
import Helpers from '../global/javascript/Helpers'
import Lazyload from 'react-lazyload'
import './single-form.scss'
class SingleForm extends React.Component {
	render() {
		var btnStyles = 'btn btn-yellow';
		return (
			<div id="" className="single-form">
				<div className="form-container">
					<div className="form-panel">
						<div className="form-right">
							<Form
								beforeSubmit={this.beforeSubmit}
								postURL={this.props.postURL}
								thanksMessage={this.props.thanksMessage}
								conversionScript={this.props.conversionScript}
								redirectURL={this.props.redirectURL}
								errorMessage={this.props.errorMessage}
								validationMessage={this.props.validationMessage}
								btnStyles={btnStyles}
								submissionCopy={this.props.submissionCopy}
								submitButtonLabel={ this.props.submitButtonLabel }
							>
								<h3 className="form-title">{this.props.formTitle}</h3>
								{this.props.children}
							</Form>
						</div>

					</div>
				</div>
			</div>

		);
	}
}
export default SingleForm;