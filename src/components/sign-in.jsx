import React from 'react';
import './sign-in.scss'


class SignIn extends React.Component {

	outputLinks() {

		const links = this.props.preHeaderLinks.map(function (f) {
			return <TopHeaderLink data={f.customFields.uRL} key={f.customFields.title} />
		})
		return links;

	}
	render() {

		function setNativeValue(element, value) {
			const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
			const prototype = Object.getPrototypeOf(element);
			const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

			if (valueSetter && valueSetter !== prototypeValueSetter) {
				prototypeValueSetter.call(element, value);
			} else {
				valueSetter.call(element, value);
			}
		}

		function showSearch(b) {
			b.target.classList.toggle('close');
			var searchFrame = document.querySelector('.search-frame');
			searchFrame.classList.toggle('open');
			// document.getElementById('frontend-only').classList.toggle('search-open');
			document.querySelector('html').classList.toggle('search-open');

			var searchInput = document.querySelector('.search-input')

			setNativeValue(searchInput, '');
			searchInput.dispatchEvent(new Event('input', { bubbles: true }));

			searchInput.focus();

		}

		return (
			<div className="sign-in p-w d-none">
				<div className="container-my">
					<ul className="sign-in-list">
						{this.props.preHeaderPrimaryButton &&
							<li><a href={this.props.preHeaderPrimaryButton.href} target={this.props.preHeaderPrimaryButton.target} className="btn">{this.props.preHeaderPrimaryButton.text}</a></li>
						}
						{this.outputLinks()}
					</ul>
					<button className="open-search" onClick={showSearch}></button>
				</div>
			</div>
		);
	}
}
export default SignIn;

class TopHeaderLink extends React.Component {

	render() {

		return (
			<li><a href={this.props.data.href} target={this.props.data.target} className="sign-in-help">{this.props.data.text}</a></li>
		);
	}
}

