import React from 'react';
import PostUtil from '../utils/post-util.js';
import { renderHTML } from '../agility/utils'

class Form extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			isValidated: false,
			isInvalid: false,
			isSuccess: false,
			isError: false,
			isSubmitting: false
		};

		this.validate = this.validate.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.submitData = this.submitData.bind(this);
		this._renderErrorMessage = this._renderErrorMessage.bind(this);
		this._renderForm = this._renderForm.bind(this);
		this._renderInvalidMessage = this._renderInvalidMessage.bind(this);
		this._renderSuccessMessage = this._renderSuccessMessage.bind(this);

	}

	componentDidMount() {
		this.focus()
		this.checkValue()
	}
	/**
	 * Them main function that validates the form and fills in the error messages.
	 * @returns bool Returns a boolean showing if the form is valid for submission or not.
	 **/
	validate() {

		//this.formEl is a reference in the component to the form DOM element.
		const formEl = this.formEl;
		const formLength = formEl.length;

		//do a pre-trim on all the values...
		for (let i = 0; i < formLength; i++) {
			//the i-th child of the form corresponds to the forms i-th input element
			const elem = formEl[i];

			//don't bother with hidden elems or buttons
			if (elem.type) {
				const elemType = elem.type.toLowerCase();
				if (elemType === "hidden"
					|| elemType === "submit"
					|| elemType === "button") {
						continue;
				}
			}

			if (elem.value && elem.value.trim) {
				//trim the value
				elem.value = elem.value.trim();

			}

		}

		/*
		* The checkValidity() method on a form runs the
		* html5 form validation of its elements and returns the result as a boolean.
		* It returns 'false' if at least one of the form elements does not qualify,
		* and 'true', if all form elements are filled with valid values.
		*/
		if (formEl.checkValidity() === false) {

			var invalidElements = [];

			for (let i = 0; i < formLength; i++) {
				//the i-th child of the form corresponds to the forms i-th input element
				const elem = formEl[i];

				// If element is type=hidden, then ignore it.
				if (elem.type.toLowerCase() === 'hidden') {
					continue;
				}


				/*
				* errorLabel placed next to an element is the container we want to use
				* for validation error message for that element
				*/
				const errorLabel = elem.parentNode.querySelector(".invalid-feedback");

				/*
				* A form element contains also any buttuns contained in the form.
				* There is no need to validate a button, so, we'll skip that nodes.
				*/
				if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
					/*
					* Each note in html5 form has a validity property.
					* It contains the validation state of that element.
					* The elem.validity.valid property indicates whether the element qualifies its validation rules or no.
					* If it does not qualify, the elem.validationMessage property will contain the localized validation error message.
					* We will show that message in our error container if the element is invalid, and clear the previous message, if it is valid.
					*/
					if (!elem.validity.valid) {
						let msg = elem.getAttribute("message");
						if (msg) {
							errorLabel.textContent = msg;
						} else {
							errorLabel.textContent = elem.validationMessage;
						}
						invalidElements.push(elem);
						errorLabel.parentElement.classList.add('status-invalid')
					} else {
						errorLabel.textContent = "";
						errorLabel.parentElement.classList.remove('status-invalid')
					}
				}
			}

			if (invalidElements.length > 0) {
				invalidElements[0].focus();
			}

			//Return 'false', as the formEl.checkValidity() method said there are some invalid form inputs.
			return false;
		} else {
			//The form is valid, so we clear all the error messages
			for (let i = 0; i < formLength; i++) {
				const elem = formEl[i];
				const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
				if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
					errorLabel.textContent = "";
				}
			}

			//Return 'true', as the form is valid for submission
			return true;
		}
	};
	checkFocus(){
		const form = document.querySelector('.form-container form')
		if (form !== null) {
			const input = form.querySelectorAll('input,textarea')
			Array.from(input).forEach((item,index) => {
				item.parentElement.classList.remove('status-focus')
			})
		}
	}
	checkValue(){
		const form = document.querySelector('.form-container form')
		if (form !== null) {
			const input = form.querySelectorAll('input,textarea')
			Array.from(input).forEach((item,index) => {
				if(item.value  === '') {
					item.parentElement.classList.remove('status-active')
				} else {
					item.parentElement.classList.add('status-active')
				}
			})
		}
	}
	focus() {
		const form = document.querySelector('.form-container form')
		if (form !== null) {
			const input = form.querySelectorAll('input,textarea')
			Array.from(input).forEach((item,index) => {
				item.addEventListener('focus', (event) => {
					this.checkFocus()
					this.checkValue()
					item.parentElement.classList.add('status-focus')
				});
				item.addEventListener('keydown', (event) => {
					this.checkValue()
				});
			})
		}
		document.addEventListener('click', (event) =>  {
			let $target = event.target
			if(!$target.closest('.form-item')) {
				this.checkFocus()
				this.checkValue()
			}
		});
	};
	/**
	* This is the method that is called on form submit.
	* It stops the default form submission process and proceeds with custom validation.
	**/
	submitHandler(event) {

		event.preventDefault();
		try {
			//If the call of the validate method was successful, we can proceed with form submission. Otherwise we do nothing.
			if (this.validate()) {

				const form = event.target;
				let data = {};

				//grab all the name/value pairs for the inputs in this form


				[...form.elements].forEach((input) => {

					if (!input.value || input.value === "") return;

					let name = (!input.name) ? input.id : input.name;

					if (!name) return;
					data[name] = input.value;
				});

				if (this.props.beforeSubmit) {
					//hit the callback beforeSubmit
					if (!this.props.beforeSubmit(data)) {
						//actually do the submission
						this.submitData(data);
					}
				} else {
					this.submitData(data);
				}

			} else {
				this.setState({ isSuccess: false, isValidated: true, isInvalid: true, isError: false });

			}
		} catch (err) {
			console.warn("Error submitting data", err);
			this.setState({ isSuccess: false, isValidated: true, isInvalid: false, isError: true });
		}
		return false;
	};

	submitData(data) {

		this.setState({ isSubmitting: true });

		PostUtil.postData(
			this.props.postURL,
			data
		).then(response => {

			const email = data.email
			//and response in the 200s is ok
			if (response.status < 200 && response.status > 299) {
				this.setState({ isError: true, isSubmitting: false, isSuccess: false, isInvalid: false });
				return;
			}

			//MOD JOELV - APRIL 2021 - Associate the email to Active Campaign...
			try {

				const vgoAlias = typeof window.visitorGlobalObjectAlias === 'undefined' ? 'vgo' : window.visitorGlobalObjectAlias;
				var visitorObject = window[vgoAlias];
				if (email && typeof visitorObject !== 'undefined') {
					if (console) console.log("setting active campaign user to ", email)
					visitorObject('setEmail', email);
					visitorObject('update');
				} else {
					if (console) console.log("could not set active campaign user", email, visitorObject)
				}

			} catch (error) {
				if (console) console.log("Error sending Email to Active Campaign", error)
			}


			// redirect if a redirect url has been set...
			if (this.props.redirectURL !== undefined
				&& this.props.redirectURL
				&& this.props.redirectURL.href) {
					const redirectUrl =  this.props.redirectURL.href
					setTimeout(function() {
						window.location.href = redirectUrl;
					}, 500)

				return;
			};

			//otherwise, just set the state to success
			this.setState({ isError: false, isSubmitting: false, isSuccess: true, isInvalid: false });
		}).catch(err => {
			this.setState({ isError: true, isSubmitting: false, isSuccess: false, isInvalid: false });
		});
	}

	_renderSuccessMessage() {

		var self = this;




		if (self.props.conversionScript) {
			//dynamically inject the conversion script
			const idStr = "conversion-script"
			if (document.getElementById(idStr) === null) {
				let s = document.createElement('script');
				s.setAttribute("id", idStr);
				s.innerHTML = self.props.conversionScript;
				document.body.appendChild(s);
			}
		}

		return (
			<div className="form-success">
				<div dangerouslySetInnerHTML={ renderHTML(this.props.thanksMessage)} />
			</div>
		);
	}

	_renderInvalidMessage() {
		// let msg = this.props.validationMessage;
		// if (!msg) msg = "Please check your values and try again.";
		// return (
		// 	<div className={"alert"} role="alert">
		// 		<div dangerouslySetInnerHTML={ renderHTML( msg) } />
		// 	</div>
		// );
	}

	_renderErrorMessage() {
		let msg = this.props.errorMessage;
		if (!msg) msg = "An error occurred while submitting the form.  Please try again.";

		return (
			<div className={"alert"} role="alert">
				<div dangerouslySetInnerHTML={ renderHTML( msg) } />
			</div>
		);
	}

	_renderForm(props) {

		//Add bootstrap's 'was-validated' class to the forms classes to support its styling
		var classNames = [];

		// if (props.className) {
		// 	classNames = [props.className];
		// 	delete props.className;
		// }

		if (this.state.isValidated) {
			classNames.push("was-validated");
		}

		var invalidMessage = null;
		var errorMessage = null;

		if (this.state.isInvalid) {
			classNames.push("is-invalid");
			invalidMessage = this._renderInvalidMessage();

		}

		if (this.state.isError) {
			errorMessage = this._renderErrorMessage();
		}

		let btnClass = props.btnStyles + (this.state.isSubmitting ? " submitting" : "");
		// let submitMsg = this.state.isSubmitting ? "Send Message" : "Send Message";
		// let submitMsg = "Send Message";
		let submitMsg = this.props.submitButtonLabel ?? "Send Message";
		if (this.state.isSubmitting) {
			btnClass += " submitting";
			classNames.push(" submitting");
		}

		const createSubmissionCopyMarkup = () => {

			return  renderHTML(this.props.submissionCopy)
		}

		return (
			<form
				// {...props}
				className={classNames.join(" ")}
				noValidate
				ref={form => (this.formEl = form)}
				onSubmit={this.submitHandler}

			>
				{this.props.children}

				<div className="rich-text" dangerouslySetInnerHTML={createSubmissionCopyMarkup()}></div>

				<div className="form-item submit 12 last-mb-none">
					<button type="submit" className={btnClass} disabled={this.state.isSubmitting} ><span>{submitMsg}</span></button>
				</div>

				{invalidMessage}
				{errorMessage}

			</form >
		);
	}

	/**
	* Render the component as a regular form element with appended children from props.
	**/
	render() {


		//ensure we have what we need
		if (!this.props.postURL || this.props.postURL === "") {
			return (
				<p>Please ensure a submission URL has been specified.</p>
			);
		}


		if (this.state.isSuccess) {
			return this._renderSuccessMessage();
		} else {
			return this._renderForm(this.props);
		}
	}
}

export default Form;