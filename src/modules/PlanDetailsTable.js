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
                                {/* <th className="plan">Nano</th> */}
                                <th className="plan">Small</th>
                                <th className="plan">Pro</th>
                                <th className="plan enterprise">Enterprise</th>
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
                                <td className="feature">Monthly Price w/ Annual Plan</td>
                                <td>-</td>
                                {/* <td>$47</td> */}
                                <td>$279</td>
                                <td>$879</td>
                                <td>$4,879</td>
                            </tr>
                            <tr>
                                <td className="feature">Monthly Price w/ Monthly Plan</td>
                                <td>-</td>
                                {/* <td>$57</td> */}
                                <td>$349</td>
                                <td>$1,059</td>
                                <td>$5,879</td>
                            </tr>
                            <tr>
                                <td className="feature">Annual Plan Savings</td>
                                <td>-</td>
                                {/* <td>21%</td> */}
                                <td>20%</td>
                                <td>17%</td>
                                <td>17%</td>
                            </tr>
                            <tr>
                                <td className="feature">Payment Type</td>
                                <td>-</td>
                                {/* <td>Credit Card</td> */}
                                <td>Credit Card</td>
                                <td>Credit Card</td>
                                <td>Credit Card or Invoice</td>
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
                                {/* <td><i className="checkmark"></i></td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Built-in CDN</td>
                                <td><i className="checkmark"></i></td>
                                {/* <td><i className="checkmark"></i></td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Webhooks</td>
                                <td><i className="checkmark"></i></td>
                                {/* <td><i className="checkmark"></i></td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                        </tbody>

                        <thead className="sub-title">
                            <tr>
                                <th colSpan="5">
                                    Platform Details
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="feature">Users</td>
                                <td>1</td>
                                {/* <td>5</td> */}
                                <td>5</td>
                                <td>10</td>
                                <td>50</td>
                            </tr>
                            <tr>
                                <td className="feature">Additional Users (monthly)</td>
                                <td>-</td>
                                {/* <td>$20 /user</td> */}
                                <td>$20 /user</td>
                                <td>$20 /user</td>
                                <td>$20 /user</td>
                            </tr>
                            <tr>
                                <td className="feature">Bandwidth (monthly)</td>
                                <td>1 GB</td>
                                {/* <td>10 GB</td> */}
                                <td>250 GB</td>
                                <td>500 GB</td>
                                <td>2 TB</td>
                            </tr>
                            <tr>
                                <td className="feature">Additional Bandwidth (monthly)</td>
                                <td>$65 /TB</td>
                                {/* <td>$65 /TB</td> */}
                                <td>$65 /TB</td>
                                <td>$65 /TB</td>
                                <td>$65 /TB</td>
                            </tr>
                            <tr>
                                <td className="feature">Requests (monthly)</td>
                                <td>100k</td>
                                {/* <td>250k</td> */}
                                <td>2M</td>
                                <td>5M</td>
                                <td>5M</td>
                            </tr>
                            <tr>
                                <td className="feature">Additional Requests (monthly)</td>
                                <td>$5 /M</td>
                                {/* <td>$5 /M</td> */}
                                <td>$5 /M</td>
                                <td>$5 /M</td>
                                <td>$5 /M</td>
                            </tr>
                        </tbody>

                        <thead className="sub-title">
                            <tr>
                                <th colSpan="5">
                                    Components
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="feature"><a href="#componentContentManagement" title="Content Management">Content Management</a></td>
                                <td><i className="checkmark"></i></td>
                                {/* <td><i className="checkmark"></i></td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr id="componentContentManagement">
                                <td className="feature"><a href="#componentEcommerce" title="Ecommerce">Ecommerce</a></td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature"><a href="#componentEcommerce" title="Ticketing">Ticketing</a></td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature"><a href="#componentSearch" title="Search">Search</a></td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                        </tbody>

                        <thead className="title">
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
                                {/* <td className="plan">Nano</td> */}
                                <td className="plan">Small</td>
                                <td className="plan">Pro</td>
                                <td className="plan">Enterprise</td>
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
                                <td className="feature">Media and Documents Library</td>
                                <td><i className="checkmark"></i></td>
                                {/* <td><i className="checkmark"></i></td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">User Generated Content (UGC)</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Sync Architecture</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
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
                            <tr>
                                <td className="feature">Locales</td>
                                <td>2</td>
                                {/* <td>2</td> */}
                                <td>2</td>
                                <td>5</td>
                                <td>25</td>
                            </tr>
                            <tr id="componentEcommerce">
                                <td className="feature">Content Items</td>
                                <td>100</td>
                                {/* <td>1,000</td> */}
                                <td>5,000</td>
                                <td>50,000</td>
                                <td>1 Million</td>
                            </tr>
                            <tr>
                                <td className="feature">Pages</td>
                                <td>10</td>
                                {/* <td>25</td> */}
                                <td>500</td>
                                <td>1,000</td>
                                <td>10,000</td>
                            </tr>
                            <tr>
                                <td className="feature">Digital Channels</td>
                                <td>1</td>
                                {/* <td>1</td> */}
                                <td>1</td>
                                <td>5</td>
                                <td>5</td>
                            </tr>
                        </tbody>

                        <thead className="title">
                            <tr>
                                <th colSpan="5">
                                    Ecommerce
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="plans-sub-heading">
                                <td>&nbsp;</td>
                                <td className="plan">Free</td>
                                {/* <td className="plan">Nano</td> */}
                                <td className="plan">Small</td>
                                <td className="plan">Pro</td>
                                <td className="plan">Enterprise</td>
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
                                <td className="feature">Products</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Ticketing</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Order Management</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Customer Management</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Subscription Management</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Custom Reports</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Point of Sale (POS)</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
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
                            <tr id="componentSearch">
                                <td className="feature">Products</td>
                                <td>-</td>
                                {/* <td>-</td> */}
                                <td>500</td>
                                <td>25,000</td>
                                <td>50,000</td>
                            </tr>
                            <tr>
                                <td className="feature">Tickets</td>
                                <td>-</td>
                                {/* <td>-</td> */}
                                <td>500</td>
                                <td>25,000</td>
                                <td>50,000</td>
                            </tr>
                        </tbody>

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
                                {/* <td className="plan">Nano</td> */}
                                <td className="plan">Small</td>
                                <td className="plan">Pro</td>
                                <td className="plan">Enterprise</td>
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
                                {/* <td>&nbsp;</td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Daily Crawl</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">404 Tracking</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Built-In Reports</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Multi-Domain Indexing</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td>&nbsp;</td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Custom Page Ranking</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
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
                                {/* <td>-</td> */}
                                <td>1,000 items</td>
                                <td>10,000 items</td>
                                <td>100,000 items</td>
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
                                {/* <td className="plan">Nano</td> */}
                                <td className="plan">Small</td>
                                <td className="plan">Pro</td>
                                <td className="plan">Enterprise</td>
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
                                <td className="feature">Online Help Site</td>
                                <td><i className="checkmark"></i></td>
                                {/* <td><i className="checkmark"></i></td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Email</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Phone</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td>&nbsp;</td>
                                <td><i className="checkmark"></i></td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Dedicated Account Manager</td>
                                <td>&nbsp;</td>
                                {/* <td>&nbsp;</td> */}
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td><i className="checkmark"></i></td>
                            </tr>
                            <tr>
                                <td className="feature">Service Level Agreement</td>
                                <td>-</td>
                                {/* <td>-</td> */}
                                <td>Included</td>
                                <td>Included</td>
                                <td>Included</td>
                            </tr>
                            <tr>
                                <td className="feature">Performance</td>
                                <td>Throttled</td>
                                {/* <td>Throttled</td> */}
                                <td>Medium</td>
                                <td>High</td>
                                <td>High</td>
                            </tr>
                            <tr>
                                <td className="feature">Uptime</td>
                                <td>-</td>
                                {/* <td>-</td> */}
                                <td>99%</td>
                                <td>99.5%</td>
                                <td>99.95%</td>
                            </tr>
                        </tbody>

                        <thead className="sub-title">
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
                                {/* <td>-</td> */}
                                <td>-</td>
                                <td>Available</td>
                                <td>Available</td>
                            </tr>
                        </tbody>



                    </table>

                </div>
            </section>


	);
}

export default PlanDetailsTable;
