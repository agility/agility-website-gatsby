import React from 'react';

import './ContentPanel.scss'
import FormField from '../components/_form-field.jsx'

import Form from '../components/_form.jsx'
import { getLeadSourceDetailForForm } from '../utils/lead-utils.js'
import { renderHTML } from '../agility/utils'

import Triangles from "../components/triangles.jsx"

const ContentPanelForm = ({ item }) => {

	item = item.customFields;
	let panel =item.panel.customFields;

	return (
		<section className="front-start front-start-landing p-w">
				<Triangles />


                <div className={panel.enableBackgroundImage ? 'rotated-bg' : ''}></div>

                <div className="container-my">

                    <div className="start-content">
                        {item.landingLogo &&
                            <div className="landing-logo"><a href="/"><img src={item.landingLogo.url} alt="" /></a></div>
                        }
                        <h1 dangerouslySetInnerHTML={renderHTML(panel.title)}></h1>
                        <div dangerouslySetInnerHTML={renderHTML(panel.textblob )} />
                        <div className="start-buttons">
                            {panel.primaryButton &&
                                <a href={panel.primaryButton.href} target={panel.primaryButton.target} className="btn">{panel.primaryButton.text}</a>
                            }
                            {panel.secondaryButton &&
                                <a href={panel.secondaryButton.href} target={panel.secondaryButton.target} className="btn-link">{panel.secondaryButton.text} <span><img src="https://static.agilitycms.com/layout/img/ico/gray.svg" alt={panel.secondaryButton.text} /></span></a>
                            }
                        </div>
                    </div>

                    <div className="start-form right">
                        <Form
                            beforeSubmit={item.beforeSubmit}
                            postURL={item.submissionPOSTURL}
                            thanksMessage={item.thanksMessage}
                            conversionScript={item.conversionScript}
                            redirectURL={item.redirectURL}
                            errorMessage={item.errorMessage}
                            validationMessage={item.validationMessage}
                            submissionCopy={item.submissionCopy}
                        >
                            <h3 className="form-title">{item.rightColumnTitle}</h3>

                            <FormField id="firstname" label="First Name">
                                <input id="firstname" className="changed" type="text" placeholder="First Name" required />
                            </FormField>

                            <FormField id="lastname" label="Last Name">
                                <input id="lastname" className="changed" type="text" placeholder="Last Name" required />
                            </FormField>

                            <FormField id="email" label="Email">
                                <input id="email" className="changed" type="email" placeholder="Email" required />
                            </FormField>

                            {/* <FormField id="phonenumber" label="Phone">
                                <input id="phonenumber" className="changed" type="tel" placeholder="xxx-xxx-xxxx" minLength="9" maxLength="20" required />
                            </FormField> */}

                            <FormField id="company" label="Company">
                                <input id="company" className="changed" type="text" placeholder="Company" required />
                            </FormField>

                            <FormField id="comment" label="Comment">
                                <textarea id="comment" className="changed"  placeholder="Questions or Comments" ></textarea>
                            </FormField>

                            <input type="hidden" id="leadsourcedetail" name="leadsourcedetail" value={getLeadSourceDetailForForm(item.formID)} />
                            <input type="hidden" name="_autopilot_session_id" />

                            <p className="disclaimer">We will never share your email without your permission.<br />View our <a href="/privacy-policy" target="_blank">Privacy Policy</a></p>
                        </Form>
                    </div>

                </div>


            </section>
	);
}

export default ContentPanelForm;
