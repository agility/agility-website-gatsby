import React from 'react';
import './full-page-form.scss'
import Form from './_form.jsx'
import { renderHTML } from '../agility/utils'
import Helpers from '../global/javascript/Helpers'
import Lazyload from 'react-lazyload'
class FullPageForm extends React.Component {
	render() {

		// var overallColour = this.props.colour;

		// var isPrimaryTheme = overallColour === 'yellow';
		// var btnStyles = 'btn' + (isPrimaryTheme ? ' btn-secondary' : '');
		var btnStyles = 'btn btn-yellow';
		return (
			<div id="form-page">
				<section className={"form-container "} >
					<div className="container-my">
						<div className="form-panel">
							<div className="form-left">
								<h1>{this.props.title}</h1>
								<h3 className="h3">{this.props.subTitle}</h3>
								<div dangerouslySetInnerHTML={renderHTML(this.props.text)}></div>
							</div>
							<div className="form-right" >
								<Lazyload offset={Helpers.lazyOffset}><img src="/images/triangle-pattern.svg" className='img-form-top' alt='Form Triangle Pattern'></img></Lazyload>
								<div className="wrap-f-right">
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
								<Lazyload offset={Helpers.lazyOffset}><img src="/images/triangle-pattern.svg" className='img-form-bottom' alt='Form Triangle Pattern'></img></Lazyload>
							</div>

						</div>
					</div>
				</section>
			</div>

		);
	}
}
export default FullPageForm;