import React, { useEffect, useRef, useState } from 'react';
import './NewPartnerListingModule.scss'
import './CaseStudyReskin.scss'
import { Link } from "gatsby"
import PostItem from './PostItem'

const IntergrationListing = ({ viewModel }) => {
  const classSection = 'module mod-integration-listing similar'

  return <React.Fragment>
    <section className={classSection}>
      <div className="container">
        <div className="text-center">
          <h2>Similar Integrations</h2>
        </div>

        <div className="row listing-wrap">
          {viewModel.similarPartner.map((post, index) => {
            return <div key={index} className="col-xl-4 case-col">
              < PostItem post={post} isIntegration={true} />
            </div>
          })}
        </div>

        <div className="text-center">
          <a className="btn btn-explore-all-integration" href="/partners/integrations">
            <span>Explore All Integrations</span>
          </a>
        </div>
      </div>
    </section>
  </React.Fragment>
}
export default IntergrationListing