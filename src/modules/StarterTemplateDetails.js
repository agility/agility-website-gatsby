import React, {useState,useEffect} from 'react';
import { Link } from 'gatsby'
import { renderHTML } from '../agility/utils'
import './StarterTemplateDetails.scss'
import './RichTextArea.scss'
// import Spacing from './Spacing';
const StarterDetails = ({ item, dynamicPageItem, page }) => {
	const starterTemplate = dynamicPageItem.customFields;
	console.log(dynamicPageItem)
	const [isMobile, setState] = useState(false)
	//const externalLink = "https://manager.agilitycms.com/org/?plan=agility-pro&template=gatsby-blog"
	// const externalLink = `https://manager.agilitycms.com/org/?template=${starterTemplate.slug}`
	const frameworks = starterTemplate.frameworks
	const startproject = starterTemplate.startfreeproject
	// console.log(starterTemplate.description)
	const checkIsMobile = () => {
		if (window.innerWidth <  992) {
			if(!isMobile) {
				setState(true)
			}
		} else {
			if(isMobile) {
				setState(false)
			}
		}
	}
	useEffect(() => {
		checkIsMobile()
		window.addEventListener('resize', checkIsMobile)
  });
	return (
		<React.Fragment>
			<section className='module mod-star-detail animation'>
				<div className='container'>
					<div className='last-md-none wrap-black anima-bottom '>
						<Link to="/starters" className='black-starters'>Back to Starters</Link>
					</div>
					<div className='row justify-content-between'>
						<div className='col-lg-7 last-mb-none anima-left delay-4'>
							{starterTemplate.name && 
								<h1>{starterTemplate.name}</h1>
							}
							{starterTemplate.details &&
								<div className="template-inner-content" dangerouslySetInnerHTML={renderHTML(starterTemplate.details)}>

								</div>
							}
							{isMobile && startproject && startproject.href &&
								<p>
									<Link href={startproject.href} target={startproject.target} className="btn btn-primary text-decoration-none ">{startproject.text}</Link>
								</p>
							}
							{ starterTemplate.image &&
							<div className="star-image">
								<img src={starterTemplate.image.url} alt={starterTemplate.image.label} />
								</div>
							}
						</div>
						<div className='col-lg-4 col-r-start anima-right delay-4'>
							{!isMobile && 
								<div className="template-frameworks-datail ps-rv">
									{frameworks.map(framework => (
										<div className='wrap-img-frame text-center ps-rv' key={framework.contentID}>
											<img src={framework.customFields.logo.url} alt={framework.customFields.logo.label} />
										</div>
									))}
									<div className='content-frameworks last-mb-none ps-rv small-paragraph'>
										{starterTemplate.name && 
											<h3 className='h4'>{starterTemplate.name}</h3>
										}
										{starterTemplate.description && 
											<p>{starterTemplate.description}</p>
										}
										{startproject && startproject.href &&
											<p className='last-mb-none'>
												<Link to={startproject.href} target={startproject.target} className="btn btn-primary text-decoration-none ">{startproject.text}</Link>
											</p>
										}
									</div>
								</div>
							}
							<div className='child-item-right last-mb-none small-paragraph'>
								{starterTemplate.previewURL && 
									<React.Fragment>
										<h4>Preview URL</h4>
										<Link to={starterTemplate.previewURL} target="_blank" rel="noopener">{starterTemplate.previewURL}</Link>
									</React.Fragment>
								}
							</div>
							<div className='child-item-right last-mb-none small-paragraph'>
								{starterTemplate.githubLink && 
									<React.Fragment>
										<h4>Github repo</h4>
										<Link to={starterTemplate.githubLink} target="_blank" rel="noopener">{starterTemplate.githubLink}</Link>
									</React.Fragment>
								}
							</div>
							{starterTemplate.moreinfoHere && 
								<div className='child-item-right last-mb-none small-paragraph' dangerouslySetInnerHTML={renderHTML(starterTemplate.moreinfoHere)}></div>
							}
						</div>
					</div>
				</div>
			</section>
			<section class="mod-space space-80 space-dt-110"></section>
			{/* <Spacing item={dynamicPageItem}/> */}
		</React.Fragment>
	);
}

export default StarterDetails;
