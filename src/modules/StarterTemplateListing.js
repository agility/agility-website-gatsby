import React from 'react';
import LazyLoad from 'react-lazyload';
// import { renderHTML } from '../agility/utils';
import LazyBackground from '../utils/LazyBackground'
// import { renderHTML } from '../agility/utils'
import './SingleTestimonialPanel.scss'
import Spacing from './Spacing'

const StarterTemplateListing = ({ item }) => {
  const fields = item.customFields
  console.log('StarterTemplateListing', item)
	const classSection = `StarterTemplateListing ${fields.darkMode && fields.darkMode === 'true' ? 'dark-mode bg-17 text-white': ''}`
  return (
    <React.Fragment>
    <div className={classSection}>
      <section className="module mod-testimonial animation">
        <div className="container">
        </div>
      </section>
    </div>
    <Spacing item={item}/>
    </React.Fragment>
  )
}

export default StarterTemplateListing;
