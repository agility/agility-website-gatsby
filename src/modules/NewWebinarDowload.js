import React, {useRef, useEffect} from 'react';
import { renderHTML } from '../agility/utils'
import PostItemImageVertical from '../modules/DownloadableItem'
import './NewWebinarDowload.scss'
import Spacing from './Spacing';
import { Link } from 'gatsby';
import { animationElementInnerComponent } from '../global/javascript/animation';


const NewDowloadableEbooks = ({ item }) => {
  const { content, cTAButton, listWebinar, buttonItemText = 'Download' } = item?.customFields
  const listWebinars = listWebinar?.map((post, index) => {
    return (
      <div className="col-md-6 col-lg-4 mb-45" key={index}>
        <PostItemImageVertical post={post} buttonItemText={buttonItemText} isVerticalImage= {false} />
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
    { listWebinars && listWebinars.length > 0 && 
    <> <section ref={thisModuleRef} className="mod-webi animation">
      <div className="container ps-rv bg anima-bottom">
        { content &&
          <div className="mx-auto mb-45 last-mb-none max-w-940 text-center beauty-ul" dangerouslySetInnerHTML={renderHTML(content)}></div>
        }
          <div className="row justify-content-evenly">
            { listWebinars }
          </div>
        { cTAButton && cTAButton.href &&
          <div className="text-center mt-35">
            <Link to={cTAButton?.href} className="btn btn-browser-all">
              <span>{cTAButton.text ? cTAButton.text : 'Browser All Downloadable items'}</span>
            </Link>
          </div>
        }
      </div>
    </section>
    <Spacing item={item}/>
    </>
     }
    </>
	);
}

export default NewDowloadableEbooks;
