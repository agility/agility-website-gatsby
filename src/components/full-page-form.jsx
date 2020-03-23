import React from 'react';
import { hot } from 'react-hot-loader/root'
import './full-page-form.scss'
import FormColours from '../static/data/form-colours.json'
import Form from './_form.jsx'

class FullPageForm extends React.Component {

    render() {

        var overallColour = this.props.colour;

        var isPrimaryTheme = overallColour === 'yellow';
        var btnStyles = 'btn' + (isPrimaryTheme ? ' btn-secondary' : '');

		return (
            <div id="form-page">
                <section className={"form-container " + overallColour} >
                    <div className="container-my">
                        <div className="form-panel">
							<div className="form-left">
								<h2 className="h2">{this.props.title}</h2>
								<h3 className="h3">{this.props.subTitle}</h3>
								<div className="rich-text" dangerouslySetInnerHTML={{ __html: this.props.text }}></div>
							</div>
							<div className="form-right" >

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
								>
									<h3 className="form-title">{this.props.formTitle}</h3>
									{this.props.children}
								</Form>
							</div>

                        </div>
                    </div>
                </section>
            </div>

        );
    }
}
export default hot(FullPageForm);