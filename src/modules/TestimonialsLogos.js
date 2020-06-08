import React from 'react';
import { renderHTML } from '../agility/utils'
import ArrayUtils from '../utils/array-utils.js';
import "./TestimonialsLogos.scss"

const TestimonialsLogos = ({ item }) => {

	const moduleItem = item;
	item = item.customFields;
	let testimonials =  ArrayUtils.getRandomElements( item.testimonials, 1);
	let logos = item.logos;



	testimonials = testimonials.map(function (t, index) {
		if (index == 0) {
		return <TestimonialContent item={t} key={t.contentID + "-" + moduleItem.contentID} />
		}
	})

	logos = logos.map(function (logo) {
		return <LogoContent item={logo} key={logo.contentID + "-" + moduleItem.contentID} />
	})


	return (

		<section className="features p-w testimonials-logo-listing">
			<h2 className="title-component" dangerouslySetInnerHTML={renderHTML(item.header)}></h2>
				<div className="container-my">
				<div className="testimonials-logo-list">


						<div className="logo-list">
							<ul>
								{logos}
							</ul>
						</div>

						<div className="testimonials-slider">

								{testimonials}

						</div>


				</div>
			</div>

		</section>


	);
}

export default TestimonialsLogos;



const TestimonialContent = ({item}) => {

		item = item.customFields;

        return (

            <div className="staff-item">
                <div className="item-inner">
                    <div className="image">
                        {item.headshot &&
                            <img src={item.headshot.url + '?w=200&h=200'} alt={item.title} />
                        }
                    </div>

                    {/* <div className="company-logo">
                        {item.companyLogo &&
                            <img src={item.companyLogo.url} alt={item.companyName} />
                        }
                    </div> */}

                    <div className="title">
                        <h3>{item.title}</h3>
                        <span>{item.jobTitle}</span>
                    </div>
                    <p>{item.excerpt}</p>
                </div>
            </div>
        );

}

const LogoContent = ({item}) =>  {

		item = item.customFields;

        return (
            <li>
                {item.logo &&
                    <img src={item.logo.url} alt={item.logo.label} />
                }
            </li>
        );

}
