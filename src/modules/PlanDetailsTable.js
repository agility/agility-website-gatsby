import React from 'react';
import './PlanDetailsTable.scss'

const PlanDetailsTable = ({ item }) => {

	return (

            <section className="plan-details-table">
                <h1>Compare Package Features &amp; Details</h1>

                <h2>Review and compare all available plan details, features and components. Let's find the plan that works for you.</h2>

                <div className="container-my">

                    <table cellPadding="0" cellSpacing="0">
                        <thead className="main-head">
                            <tr>
                                <th className="null">&nbsp;</th>
                                <th className="plan">Free</th>
                                <th className="plan">Small</th>
								<th className="plan">Medium</th>
                                <th className="plan">Pro</th>
                            </tr>
                        </thead>
                        <thead className="sub-title">
                            <tr>
                                <th colSpan="5">
                                    Pricing (All prices listed are USD)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="feature">Monthly Price</td>
                                <td>-</td>
                                <td>$279</td>
                                <td>$579</td>
                                <td>$879</td>
                            </tr>


                        </tbody>

                        <thead className="sub-title">
                            <tr>
                                <th colSpan="5">
                                    Platform Features
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="feature">REST APIs</td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Built-in CDN</td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Webhooks</td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                        </tbody>

                        <thead className="sub-title">
                            <tr>
                                <th colSpan="5">
                                    Package Limits
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="feature">Users</td>
                                <td>1</td>
                                <td>5</td>
                                <td>10</td>
                                <td>20</td>
                            </tr>

							<tr id="componentEcommerce">
                                <td className="feature">Content Items</td>
                                <td>1,000</td>
                                <td>10,000</td>
                                <td>20,000</td>
                                <td>50,000</td>
                            </tr>
                            <tr>
                                <td className="feature">Digital Channels</td>
                                <td>1</td>
                                <td>1</td>
                                <td>5</td>
                                <td>10</td>
                            </tr>

							<tr>
                                <td className="feature">Locales</td>
                                <td>2</td>
                                <td>2</td>
                                <td>5</td>
                                <td>10</td>
                            </tr>

							<tr>
                                <td className="feature">Additional Users </td>
                                <td>-</td>
                                <td>$15 /user</td>
                                <td>$15 /user</td>
                                <td>$15 /user</td>
                            </tr>
						</tbody>

						<thead className="sub-title">
                            <tr>
                                <th colSpan="5">
                                     Data Limits
                                </th>
                            </tr>
                        </thead>

						<tbody>
							<tr>
                                <td className="feature">Storage</td>
                                <td>1 GB</td>
                                <td>1 TB</td>
                                <td>1 TB</td>
                                <td>1 TB</td>
                            </tr>
                            <tr>
                                <td className="feature">Bandwidth </td>
                                <td>1 GB</td>
                                <td>250 GB</td>
                                <td>250 GB</td>
                                <td>500 GB</td>
                            </tr>

                            <tr>
                                <td className="feature">Requests </td>
                                <td>100k</td>
                                <td>2M</td>
                                <td>5M</td>
                                <td>5M</td>
                            </tr>


							<tr>
                                <td className="feature">Additional Storage</td>
                                <td>$150 /TB</td>
                                <td>$150 /TB</td>
								<td>$150 /TB</td>
								<td>$150 /TB</td>
                            </tr>
							<tr>
                                <td className="feature">Additional Bandwidth </td>
                                <td>$65 /TB</td>
                                <td>$65 /TB</td>
                                <td>$65 /TB</td>
                                <td>$65 /TB</td>
                            </tr>
							<tr>
                                <td className="feature">Additional Requests </td>
                                <td>$5 /1M</td>
                                <td>$5 /1M</td>
                                <td>$5 /1M</td>
                                <td>$5 /1M</td>
                            </tr>

                        </tbody>

                        {/* <thead className="title">
                            <tr>
                                <th colSpan="5">
                                    Content Management
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="plans-sub-heading">
                                <td>&nbsp;</td>
                                <td className="plan">Free</td>
                                <td className="plan">Small</td>
                                <td className="plan">Medium</td>
                                <td className="plan">Pro</td>
                            </tr>
                        </tbody>

                        <thead className="sub-title">
                            <tr>
                                <th colSpan="5">
                                    Features
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="feature">Asset Library</td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">User Generated Content (UGC)</td>
                                <td>&nbsp;</td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Sync Architecture</td>
                                <td>&nbsp;</td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                        </tbody>

                        <thead className="sub-title">
                            <tr>
                                <th colSpan="5">
                                    Details
                                </th>
                            </tr>
                        </thead>

                        <tbody>


                        </tbody> */}


                        <thead className="title">
                            <tr>
                                <th colSpan="5">
                                    Search
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="plans-sub-heading">
                                <td>&nbsp;</td>
                                <td className="plan">Free</td>
                                <td className="plan">Small</td>
                                <td className="plan">Medium</td>
                                <td className="plan">Pro</td>
                            </tr>
                        </tbody>

                        <thead className="sub-title">
                            <tr>
                                <th colSpan="5">
                                    Features
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="feature">Faceted Index</td>
                                <td>&nbsp;</td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Daily Crawl</td>
                                <td>&nbsp;</td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">404 Tracking</td>
                                <td>&nbsp;</td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Built-In Reports</td>
                                <td>&nbsp;</td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Multi-Domain Indexing</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Custom Page Ranking</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                        </tbody>

                        <thead className="sub-title">
                            <tr>
                                <th colSpan="5">
                                    Details
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="feature">Index Size</td>
                                <td>-</td>
                                <td>10,000</td>
                                <td>20,000</td>
                                <td>50,000</td>
                            </tr>
                        </tbody>

                        <thead className="title">
                            <tr>
                                <th colSpan="5">
                                    Support
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="plans-sub-heading">
                                <td>&nbsp;</td>
								<td className="plan">Free</td>
                                <td className="plan">Small</td>
                                <td className="plan">Medium</td>
                                <td className="plan">Pro</td>
                            </tr>
                        </tbody>

                        <thead className="sub-title">
                            <tr>
                                <th colSpan="5">
                                    Details
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="feature">Online Support</td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Email</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Phone</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
								<td>&nbsp;</td>
                                <td><i className="checkmark"></i></td>
                            </tr>

                            <tr>
                                <td className="feature">Service Level Agreement</td>
                                <td>-</td>
                                <td>Included</td>
                                <td>Included</td>
                                <td>Included</td>
                            </tr>
                            <tr>
                                <td className="feature">Performance</td>
                                <td>Throttled</td>
                                <td>Throttled</td>
                                <td>Medium</td>
                                <td>High</td>
                            </tr>
                            <tr>
                                <td className="feature">Uptime</td>
                                <td>-</td>
                                <td>99.5%</td>
                                <td>99.9%</td>
                                <td>99.95%</td>
                            </tr>
                        </tbody>

                        {/* <thead className="sub-title">
                            <tr>
                                <th colSpan="5">
                                    Add Ons
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="feature">Custom Support</td>
                                <td>-</td>
                                <td>-</td>
                                <td>Available</td>
                                <td>Available</td>
                            </tr>
                        </tbody> */}



                    </table>

                </div>
            </section>


	);
}

export default PlanDetailsTable;
