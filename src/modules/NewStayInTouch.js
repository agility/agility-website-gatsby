import React, { useEffect, useState} from 'react';

import './NewStayInTouch.scss'

const NewStayInTouch = ({ item }) => {

	// const componentName = item.customFields.componentName;

	// const FormToRender = require(`../components/forms/${componentName}.jsx`).default;
	// const moduleProps = {
	// 	item: item
	// }
  // console.log()

	return <section className="bg-46 mod-cta mod-new-stay-in-touch">
    <div className="container">
      <div className="cta-mx text-center text-white last-mb-none">
        <h2>
          {item.customFields.title}
        </h2>
      </div>
      <div className="d-flex justify-content-between wrap-stay-in-touch">
        {item.customFields.socialFollowLinks.map((link, index) => {
          return <a
            key={`link-${link.contentID}`}
            href={link.customFields.followURL.href}
            target={link.customFields.followURL.target}
            className="d-flex align-items-center text-white">
            <span className="icon-image">
              <img src={link.customFields.logo.url} alt="" />
            </span>
            <span>{link.customFields.title}</span>
          </a>
        })}
      </div>
    </div>
  </section>;
}

export default NewStayInTouch;
