import React, {  useEffect, useState } from 'react';
import { queryString } from "../utils/lead-utils"

import "./RichTextArea.scss"

const TestDrive = ({ item }) => {

	const [loading, setLoading] = useState(true)
	const [data, setData] = useState(null)

	useEffect(() => {


		//load the g2 script...
		if (typeof window === 'undefined') return;

		if (data) return;

		let guid = queryString("guid")
		let url = `https://agilitycms-preview.netlify.app/.netlify/functions/testdrive?guid=${guid}`;

		fetch(url, {
			method: 'get',
			mode: 'cors',
			headers: {}
		}).then(response => response.json())
		.then(data => {

			setData(data);
			setLoading(false);
		}).catch (err => {
			console.error(err);
		})
	});

	const style = {
		margin: 0,
		paddingTop: 0
	}

	if (loading) {
		return (
			<section className="rich-text" style={style}>
                <div className="container p-w-small" style={style}>
                <h2>Agility Test Drive</h2>
				<h3>Loading...</h3>
				</div>
			</section>
		)
	}

	if (data.isError) {
		return (
			<section className="rich-text" style={style}>
				<div className="container p-w-small" style={style}>
				<h2>Agility Test Drive</h2>
				<h3>Error loading test drive details.</h3>
					<div>{data.msg}</div>
				</div>
			</section>
		)
	}

		return (
			<section className="rich-text" style={style}>
					<div className="container p-w-small" style={style}>
					<h2>Agility Test Drive</h2>

					<p>Hello there!</p>

					<p>You have been granted access to an Agility Test Drive instance.</p>

					<p>Please login to the <a href={"http://manager-ca.agilitycms.com/" + data.instanceManifest.websiteName}>Content Manager</a> using the following information:</p>
					<ul>
						<li>Email/Username: <b>{data.emailAddress}</b></li>
						<li>Password: <a href="http://manager-ca.agilitycms.com/forgot-password">Set your Password</a></li>
						<li>*Note: If you already have an Agility account, you can use your current password to login. </li>
					</ul>

					<h3>Website information</h3>
					<ul>
						<li>Website URL: <a href={data.instanceManifest.appServiceUrl} target="_blank">{data.instanceManifest.appServiceUrl}</a></li>
						<li>Source Code: <a href={data.instanceManifest.sourceCodeUrl}>Download</a></li>
					</ul>

					<p>Please see our <a href="https://help.agilitycms.com/hc">Help Center</a> for support and documentation.</p>
					<p>If you have any trouble getting access to this instance or have any questions, please contact <a href="mailto:support@agilitycms.com">Support</a> for assistance.</p>
									</div>
				</section>
		);

}

export default TestDrive;
