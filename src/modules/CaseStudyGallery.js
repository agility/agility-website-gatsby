import Slider from 'react-slick'
import React from 'react';

const CaseStudyGallery = ({ dataList, galleryId, title, settingsOveride }) => {
  const mediaLists = dataList // query?.allAgilityCaseStudy?.edges
  const founded = mediaLists?.filter(i => {
    const galleryidSelect = i.node?.customFields?.gallery?.galleryid || i.node?.customFields?.screenshots?.galleryid
    if (galleryidSelect === galleryId) {
      return i.node.customFields
    }
  })

  let listMedia = []
  if (founded && founded.length > 0) {
    listMedia = founded[0].node.customFields.media
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 250,
    arrows: true,
    rows: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    ...settingsOveride
  }
  const galleries = listMedia?.map((i, index) => {
    return (
      <div key={index} className="gal-item">
        <img src={i.url + '?w=700'} alt={title} />
      </div>
    )
  });

  return (
    <>
      <section className={`case-d-gallery `} >
        {listMedia && listMedia.length > 0 &&
          <Slider {...settings} className={`gal-slider ${galleries?.length > 1 ? 'has-slide' : ''}`}>
            {galleries}
          </Slider>
        }

      </section>
    </>
  )
}

export default CaseStudyGallery