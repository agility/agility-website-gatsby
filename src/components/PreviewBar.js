import React, { Component, useEffect, useState } from 'react';

import './PreviewBar.scss'

export default function PreviewBar() {

  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.location.host === "agilitycms.com") return;


    setIsPreview(true)


  }, [])

  if (!isPreview) return null

  return (
    <div id="preview-panel">
      <div className='p-title'>Preview Mode</div>
      <div>
        <img src="https://api.netlify.com/api/v1/badges/fed484bc-3589-48e1-8f46-30c657ff44be/deploy-status" alt="Netlify Deployment Status" />

      </div>

      <div>
        <button type="button" onClick={() => setIsPreview(false)}>X</button>
      </div>
    </div >
  )



}


