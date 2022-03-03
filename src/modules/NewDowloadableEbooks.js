import React, { useRef, useEffect } from 'react';
import { renderHTML } from '../agility/utils'
import PostItemImageVertical from '../modules/DownloadableItem'
import Spacing from './Spacing'
import './NewDowloadableEbooks.scss'
import { Link } from 'gatsby'
import { animationElementInnerComponent } from '../global/javascript/animation';

const NewDowloadableEbooks = ({ item }) => {
  const { content, cTAButton, listeBooks } = item?.customFields
  const listEBooks = listeBooks?.map((post, index) => {
    return (
      <div className="col-md-6 col-lg-4 mb-45" key={index}>
        < PostItemImageVertical post={post} isVerticalImage={true} />
      </div>
    )
  })

  /* animation module */
  const thisModuleRef = useRef(null)
  useEffect(() => {
    const scrollEventFunc = () => {
      animationElementInnerComponent(thisModuleRef.current)
    }
    animationElementInnerComponent(thisModuleRef.current)
    window.addEventListener('scroll', scrollEventFunc)

    return () => {
      window.removeEventListener('scroll', scrollEventFunc)
    }
  }, [])

  return (
    <>
      {listEBooks && listEBooks.length > 0 && <>
        <section ref={thisModuleRef} className="animation">
          <div className="container anima-bottom ps-rv bg">
            {content &&
              <div className="mx-auto mb-45 last-mb-none max-w-940 text-center beauty-ul" dangerouslySetInnerHTML={renderHTML(content)}></div>
            }
            <div className="row justify-content-evenly">
              {listEBooks}
            </div>
            {cTAButton && cTAButton.href &&
              <div className="text-center">
                <Link to={cTAButton?.href} className="btn btn-browser-all mb-0 mt-35">
                  <span>{cTAButton.text ? cTAButton.text : 'Browser All Downloadable items'}</span>
                </Link>
              </div>
            }
          </div>
        </section>
        <Spacing item={item} />
      </>
      }
    </>
  );
}

export default NewDowloadableEbooks;
