import React, { useEffect } from 'react'
import LayoutTemplate from "../components/NewLayoutTemplate"
import NewGlobalHeader from '../components/NewGlobalHeader'
import NewGlobalFooter from '../components/NewGlobalFooter'
import SEO from '../components/SEO'

import './detail.scss'

import LazyBackground from '../utils/LazyBackground'

import CenteredContentPanel from '../modules/CenteredContentPanel'
import CaseStudyRotator from '../modules/CaseStudyRotator'
import CaseStudyReskin from '../modules/CaseStudyReskin'
import SingleTestimonialPanel from '../modules/SingleTestimonialPanel'
import { Link } from 'gatsby'
import Slider from 'react-slick'
import ResponsiveImage from '../components/responsive-image'
const CaseStudy = (props) => {

  var classes = 'main-content main page'

  const centeredContent = {
    "contentID": 2552,
    "properties": {
      "state": 2,
      "modified": "2021-05-19T19:41:55.313",
      "versionID": 29876,
      "referenceName": "newpricing_newcenteredcontenac889e",
      "definitionName": "CenteredContentPanel",
      "itemOrder": 0
    },
    "customFields": {
      "title": "Case Studies Headline.",
      "description": "<p>See what our amazing customers and partners have built using Agility CMS.</p>",
      "section": "Case Studies Headline"
    }
  }

  const caseStudyRotator = {
    "contentID": 2230,
    "properties": {
      "state": 2,
      "modified": "2021-05-19T16:48:39.843",
      "versionID": 29688,
      "referenceName": "newhome_newcasestudyrotator",
      "definitionName": "CaseStudyRotator",
      "itemOrder": 0
    },
    "customFields": {
      "title": "See What Others Have Built with Agility",
      "desktopSpace": "100",
      "mobileSpace": "80",
      "cTAbuttonText": "See How",
      "caseStudies": [
        {
          "contentID": 657,
          "properties": {
            "state": 1,
            "modified": "2021-05-06T10:16:20.763",
            "versionID": 28901,
            "referenceName": "casestudies",
            "definitionName": "CaseStudy",
            "itemOrder": 3
          },
          "seo": {
            "metaDescription": null,
            "metaKeywords": null,
            "metaHTML": "<head><title>Case Study: Turning Around Visit Orlando's Ticketing Solution</title></head>",
            "menuVisible": null,
            "sitemapVisible": null
          },
          "customFields": {
            "title": "Visit Orlando: 20% increase in revenue with agile Headless Commerce",
            "textblob": "<h1>Headless ecommerce solution with Agility CMS increases revenue by 20%</h1>\n<p style=\"text-align: center;\"></p>\n<p style=\"text-align: center;\"><iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/MKzwz0j7duA\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen=\"allowfullscreen\"></iframe></p>\n<p style=\"text-align: center;\"></p>\n<h3><br />The Goal</h3>\n<p><a href=\"https://www.visitorlando.com/en-ca\" target=\"_blank\" rel=\"noopener\">visitorldando.com </a>needed to increase engagement and conversion rate metrics to drive more ticket sales, both online and in their Visitor Centres.</p>\n<p>Visit Orlando&rsquo;s main goals were:</p>\n<p>1 | To create a better user experience,</p>\n<p>2 | To easily manage their content across all domains,</p>\n<p>3 | To increase ticket sales while decreasing overall costs</p>\n<p>4 | To personalize their marketing campaigns to a more targeted audience.</p>\n<h2></h2>\n<h3>The Challenge</h3>\n<p>Visit Orlando's digital strategy was in need a major revamp and in 2016 their team began working with Agility CMS to build a plan to bring together all of their digital properties under one umbrella and to unify the processes for managing content.</p>\n<p>Their major pain point was not converting enough ticket sales online.</p>\n<ul>\n<li>Staff had to manually issue tickets because their former site and eCommerce system couldn't handle a ton of traffic and would crash during their busy times.</li>\n<li>Tickets had to be processed in batches (once a day), and because of this, the staff was burdened with the workload while customers were upset that they couldn't purchase last minute tickets.</li>\n<li>This led to a ton of frustration, primarily causing inefficient admin processes and increased costs to run operations.</li>\n<li>What's more, the point of sale (POS) and online ticket purchasing flow was encountering a high decline rate from their online payment processor. Uptime on occasions such as Black Friday and the holiday seasons was also a significant concern.</li>\n</ul>\n<p>Not only was it challenging to manage, but it was also expensive, both from a hosting/software licensing perspective as well as the stress of having to hire more staff to keep up with ticket demand.&nbsp;</p>\n<h3>Our Solution</h3>\n<p>To empower Visit Orlando content management team and increate tickets sales, Agility CMS developed the custom <a href=\"www.agilitycms.com/resources/posts/headless-commerce-explained-definitions-use-cases-and-roadblocks\" target=\"_self\">Headless Commerce</a> solution with the following components:</p>\n<ul>\n<li>Multi-site, multi-channel Content Management</li>\n<li>Ecommerce with Online Ticket Sales</li>\n<li>POS Ticket Sales</li>\n</ul>\n<h3>Results</h3>\n<p>On the first day after the roll-out of the new ticket purchasing website and POS solution, the team lead at Visit Orlando emailed us to show how much more revenue they have saved and increased, just by turning on the new website.</p>\n<p>The user experience was immediately improved not only for the customers browsing online to purchase tickets, but also for the employees taking orders in person, and for the content management team using the backend.</p>\n<ul style=\"list-style-type: square;\">\n<li>Online Revenue was increased by 20%</li>\n<li>Conversion Rate on the website was increased by 10%</li>\n<li>Online Engagement increased by 25%</li>\n<li>CIO and Director both remarked that they had taken a 4-day weekend for Thanksgiving for the first time in many years!</li>\n</ul>\n<h3>Check Out Visit Orlando Site <a href=\"https://www.visitorlando.com\" target=\"_blank\" rel=\"noopener\">Here</a>&nbsp;</h3>\n<h3><a href=\"https://www.visitorlando.com\" target=\"_blank\" rel=\"noopener\"><img width=\"750\" height=\"539\" alt=\"Things to do in Orlando : 20% increase in revenue with agile Headless Commerce\" src=\"https://static.agilitycms.com/annotation-2020-05-16-144929.jpg\" style=\"display: block; margin-left: auto; margin-right: auto;\" /></a></h3>\n<h3></h3>\n<p></p>\n<h3></h3>\n<h3>Read More Success Stories:</h3>\n<ul>\n<li>\n<p><a href=\"https://agilitycms.com/resources/case-studies/cineplex\" target=\"_self\">Cineplex: Movie Theater Giant with Outstanding Content Architecture&nbsp;</a></p>\n</li>\n<li>\n<p><a href=\"https://agilitycms.com/resources/case-studies/hockey-canada\" target=\"_self\">90% Load Time improvement in Hockey Canada&rsquo;s Performance During Peal Times</a></p>\n</li>\n<li><a href=\"https://agilitycms.com/resources/case-studies/scene\" target=\"_self\">Omnichannel Customer Experience for SCENE Rewards Program&nbsp;</a></li>\n</ul>\n<p></p>\n<p></p>\n<p></p>\n<p></p>\n<p></p>",
            "clientNames": "Visit Orlando",
            "uRL": "visit-orlando",
            "image": {
              "label": "visit Orlando - 20% increase in revenue with agile Headless Commerce",
              "url": "https://static.agilitycms.com/case-studies/images/visit-orlando-2_20200516204137_0.jpg",
              "target": null,
              "filesize": 168600,
              "pixelHeight": "788",
              "pixelWidth": "940",
              "height": 788,
              "width": 940
            },
            "customerLogo": {
              "label": "Visit Orlando -  increase in revenue with agile Headless Commerce",
              "url": "https://static.agilitycms.com/logos/visit-orlando-logo.svg",
              "target": null,
              "filesize": 4688,
              "pixelHeight": null,
              "pixelWidth": null
            },
            "cTA": {
              "contentID": 2288,
              "properties": {
                "state": 2,
                "modified": "2021-05-05T15:37:04.747",
                "versionID": 28800,
                "referenceName": "sharedctablocks",
                "definitionName": "CTABlock",
                "itemOrder": 7
              },
              "customFields": {
                "title": "Whitepaper Recommended for you: How Agility CMS Empowers IT, Business, and Marketing Teams Simultaneously",
                "internalTitle": "Whitepaper - How Agility CMS Empowers IT, Business, and Marketing Teams Simultaneously",
                "image": {
                  "label": "How Agility CMS Empowers IT, Business, and Marketing Teams Simultaneously",
                  "url": "https://static.agilitycms.com/resources/gated-content/cta-bottom-blog-gated-content-purple.jpg",
                  "target": null,
                  "filesize": 51996,
                  "pixelHeight": "300",
                  "pixelWidth": "975",
                  "height": 300,
                  "width": 975
                },
                "link": {
                  "href": "https://agilitycms.com/download/how-agility-empowers-it-business-marketing-teams?source=cta-bottom-blogpost",
                  "target": "_self",
                  "text": "Download Now"
                }
              }
            },
            "excerpt": "Agility helped Visit Orlando reduce manual processes and increase revenue by 20%.\r\n",
            "rightContentCopy": "<p>Moving forward, the content team can breathe and roll out ticket purchases quicker and easier with the new POS system. They can also focus on adding new properties onto the platform, both as new website instances or as digital channels if they choose. This greatly reduces the cost of development and training since everyone is working from the same platform.</p>",
            "quote": "\"In December, my team had taken a 4-day weekend for Thanksgiving for the first time in many years, thanks to Agility CMS!\" \r\nShawn Hart, Director of Web Development & Enterprise Applications Visit Orlando\r\n",
            "metrics": {
              "referencename": "casestudies_keyvaluepair172"
            },
            "contentPanelCopy": "Visit Orlando is the official tourism association for Orlando, the most-visited destination in the United States with over 1000 participating companies. Visit Orlando's digital strategy was in need a major revamp. Visit Orlando switched to Agility CMS in 2016 because their site and eCommerce CMS couldn’t handle the traffic and ticket demand they were receiving. After switching to Agility CMS, they saved a fortune on manual processes and saw an instant increase in revenue. ",
            "brandFGColor": "#FFF",
            "brandBGColor": "#4600a8",
            "imagePosition": "left",
            "productsRenderType": "list",
            "cTAID": "2288",
            "cTAName": "Whitepaper Recommended for you: How Agility CMS Empowers IT, Business, and Marketing Teams Simultaneously"
          }
        },
        {
          "contentID": 671,
          "properties": {
            "state": 2,
            "modified": "2021-07-29T16:09:17.577",
            "versionID": 31804,
            "referenceName": "casestudies",
            "definitionName": "CaseStudy",
            "itemOrder": 4
          },
          "seo": {
            "metaDescription": "Read about how Cineplex Entertainment uses Agility and takes advantage of it's Headless CMS capabilities to run a leading website solution.",
            "metaKeywords": "Agility CMS, Fastest CMS, Headless CMS, Cineplex Entertainment, Case Study",
            "metaHTML": "<head><title>Cineplex uses Agility CMS for Blazing Fast Movie Search</title></head>",
            "menuVisible": null,
            "sitemapVisible": null
          },
          "customFields": {
            "title": "Cineplex: 15% increase in ad revenue",
            "textblob": "<h2>Cineplex uses Agility CMS for Blazing Fast Movie Search</h2>\n<h3>The Goal</h3>\n<p>In 2007, <a href=\"http://www.cineplex.com/\" target=\"_blank\" rel=\"noopener\">Cineplex</a> chose Agility&rsquo;s CMS to build their foundational site, citing its scalable, flexible platform that could easily be expanded as the site grew, as well as the strength of Agility&rsquo;s professional services team.</p>\n<p>Cineplex rebuilt the site on Agility&rsquo;s CMS platform in 2010 with the support of Agility&rsquo;s former professional services team, launching a new design and a bigger focus on online sales. The site was integrated with Cineplex&rsquo;s internal systems, which includes their back-end show time and ticketing database, as well as their internal ticket-purchase Ecommerce engine.</p>\n<p>In 2014, Cineplex rebuilt the site again on top of Agility&rsquo;s flexible and intuitive CMS platform&rsquo;s code base. The new site had to be optimized for mobile to provide a user-friendly experience on every screen-size (desktop, tablet, mobile). This newest iteration has a responsive design and uses newer front-end and back-end technologies.</p>\n<h3>The Challenge</h3>\n<p>When Cineplex first came to Agility, they were using a system that didn&rsquo;t allow freedom of design and it was extremely limiting in terms of performance, scalability, usability and multi-lingual capabilities.</p>\n<p>Additionally, at the time Cineplex had just completed a major merger that resulted in a number of different web properties that needed to be brought together. The brand needed a back-end system that would unite its team and provide a seamless and consistent user-experience that allowed them to make frequent updates to the site as new films and show times get frequently added and refreshed through Cineplex&rsquo;s back-end systems. Speed to market was crucial for them as well. They needed to be able to do have things quicker in order to get better conversions.</p>\n<p>At the time, Cineplex also wanted to expand its website to include online sales and ticketing which would include optimization to their movie search functionality.</p>\n<h3>The Solution</h3>\n<p>With each rebuild, Agility&rsquo;s CMS allowed Cineplex to increase the scalability of the site and to optimize their hosting resources. The latest iteration utilizes a new hosting environment across load balanced servers for optimal site speed and performance. The site is now handling more traffic with less CPU load than in previous years.</p>\n<blockquote>\n<p>\"With Agility we can decouple content from code, allowing content editors to work on their updates while we focus on what really matters: making our platform better for our users. With Agility we can decouple content from code, allowing content editors to work on their updates while we focus on what really matters: making our platform better for our users.\" - Vin&iacute;cius Philot, Frontend Web Developer<br /><br /><br /></p>\n</blockquote>\n<h3>The Results</h3>\n<p>The Cineplex team has been extremely happy with the Agility CMS team and platform in each redesign and rebuild of their site.</p>\n<p>Their traffic impressions are now successfully maintained, their backend administration is drastically simplified and streamlined and the overall usability of the site has improved.</p>\n<blockquote>\n<p>\"I love that Agility gives us the ability to quickly iterate and build components. Changes are reflected extremely fast, allowing or team to make decisions on the go and adapt to new needs with fast turnarounds. Agility also has a great support team / community along with their documentation which makes it easy to find solutions if you're not acknowledged with the platform already. The support for multiple platforms / stacks is also an asset\", - &nbsp;Vin&iacute;cius Philot, Frontend Web Developer</p>\n</blockquote>\n<p>Users can also now search for movies significantly easier by using personalization methods what increases customer loyalty.</p>\n<p><iframe width=\"100%\" height=\"314\" allowfullscreen=\"allowfullscreen\" src=\"//www.youtube.com/embed/roi1HmSUpYQ\"></iframe></p>\n<p>Cineplex reported that the Agility CMS is intuitive, easy-to-use and the Cineplex Team can now easily manage their own content and nearly all of their development tasks. The Agility professional services team is always available and brought in on a consultative basis or to handle tricky new code.</p>\n<p>In 2018, Cineplex easily handled:</p>\n<ul>\n<li>500M page views</li>\n<li>82M visits</li>\n<li>32M unique visitors</li>\n</ul>\n<h3>Visit Cineplex site: <a href=\"https://www.cineplex.com\" target=\"_blank\" rel=\"noopener\">Here</a>&nbsp;</h3>\n<p><a href=\"https://www.cineplex.com/\" target=\"_blank\" rel=\"noopener\"><img alt=\"Visit Cineplex site 15% increase in ad revenue\" src=\"https://static.agilitycms.com/case-studies/images/cineplex-screenshot-feb-2019.png\" /></a></p>\n<p></p>\n<div>\n<h3>Customer Success stories for you:</h3>\n<ul>\n<li>\n<p><a href=\"https://agilitycms.com/resources/case-studies/visit-orlando\" target=\"_self\">Agility CMS' Headless ecommerce increase revenue by 20% for&nbsp;Visit Orlando&nbsp;</a></p>\n</li>\n<li>\n<p><a href=\"https://agilitycms.com/resources/case-studies/hockey-canada\" target=\"_self\">90% Load Time improvement in Hockey Canada&rsquo;s Performance During Peal Times</a></p>\n</li>\n<li><a href=\"https://agilitycms.com/resources/case-studies/scene\" target=\"_self\">Omnichannel Customer Experience for SCENE Rewards Program&nbsp;</a></li>\n</ul>\n<p>&nbsp;</p>\n<p></p>\n</div>",
            "clientNames": "Cineplex",
            "uRL": "cineplex",
            "image": {
              "label": "cineplex.com 15% increase in ad revenue",
              "url": "https://static.agilitycms.com/case-studies/images/cineplex4_20200516222705_0.jpg",
              "target": null,
              "filesize": 89366,
              "pixelHeight": "788",
              "pixelWidth": "940",
              "height": 788,
              "width": 940
            },
            "customerLogo": {
              "label": "Cineplex 15% increase in ad revenue",
              "url": "https://static.agilitycms.com/logos/cineplex_logo.svg_20200516222523_0.png",
              "target": null,
              "filesize": 37712,
              "pixelHeight": "456",
              "pixelWidth": "1200",
              "height": 456,
              "width": 1200
            },
            "cTA": {
              "contentID": 1851,
              "properties": {
                "state": 2,
                "modified": "2021-05-05T15:37:25.07",
                "versionID": 28802,
                "referenceName": "sharedctablocks",
                "definitionName": "CTABlock",
                "itemOrder": 4
              },
              "customFields": {
                "title": "Whitepaper Recommended for you: Why Wordpress Wont Help you Scale",
                "internalTitle": "Whitepaper - Why Wordpress Wont Help you Scale",
                "image": {
                  "label": null,
                  "url": "https://static.agilitycms.com/Attachments/NewItems/cta-bottom-blog-posts-whitepaper-wordpress-wont-help-you-scale-3_20200623003541_0.jpg",
                  "target": null,
                  "filesize": 198085,
                  "pixelHeight": "300",
                  "pixelWidth": "975",
                  "height": 300,
                  "width": 975
                },
                "link": {
                  "href": "https://agilitycms.com/download/whitepaper-wordpress-wont-help-you-scale?source=cta-bottom-blogpost",
                  "target": "_self",
                  "text": "Download Now"
                }
              }
            },
            "excerpt": "Cineplex’s move to Agility CMS increased traffic and boosted revenue by 15%.\r\n",
            "rightContentCopy": "<h3><strong>Benefits of Agility CMS for Media and Entertainment Brands:</strong></h3>\r\n<ul>\r\n<li>We bring an industry-leading level of performance to your website. Agility&rsquo;s proprietary caching technology extends the caching capabilities in ASP.NET to provide blazing fast performance on any size of site with any traffic load. Agility also supports load-balanced configurations for your Web site</li>\r\n<li>Create multiple media libraries to store and stream your content, from images, music and video, to PDFs, Flash or Silverlight applications and more</li>\r\n<li>Use our Modules &mdash; widgets &mdash; to add static, dynamic or interactive content. Modules like online forms, image galleries and newsletter subscription boxes</li>\r\n<li>Standardized workflows for your content and media teams. Workflows can be managed automatically or manually, and users can easily follow and define each step</li>\r\n<li>The platform is built for mobile. It includes built-in responsive design capabilities and can build mobile apps and dedicated mobile sites</li>\r\n<li>Sites are search engine optimized and indexed by Google and other search engines</li>\r\n</ul>",
            "quote": "“The platform provides a consistent user experience​ for our content team to easily make updates to movie/theatre details, content and metadata, news, blogs, contests and more.” — Jeffrey Kent, Former Chief Technology Officer at Cineplex",
            "metrics": {
              "referencename": "casestudies_keyvaluepair171"
            },
            "contentPanelCopy": "Cineplex is a top-tier Canadian brand that operates in the Film Entertainment and Content, Amusement and Leisure, and Media sectors. Cineplex welcomes over 70 million guests annually and also operates CineplexStore.com, Cineplex Events,  Cineplex Media, digital place-based media (Cineplex Digital Media), amusement solutions (Player One Amusement Group, The Rec Room. Playdium) and more.",
            "brandFGColor": "#FFF",
            "brandBGColor": "#00235d",
            "imagePosition": "left",
            "productsRenderType": "list",
            "cTAID": "1851",
            "cTAName": "Whitepaper Recommended for you: Why Wordpress Wont Help you Scale"
          }
        },
        {
          "contentID": 909,
          "properties": {
            "state": 1,
            "modified": "2021-05-19T19:55:40.72",
            "versionID": 28917,
            "referenceName": "casestudies",
            "definitionName": "CaseStudy",
            "itemOrder": 6
          },
          "seo": {
            "metaDescription": null,
            "metaKeywords": null,
            "metaHTML": "<head><title>Case Study: 90% Load Time improvement for Hockey Canada</title></head>",
            "menuVisible": null,
            "sitemapVisible": null
          },
          "customFields": {
            "title": "90% improvement in page load time",
            "textblob": "<h2><span lang=\"en-CA\">90% Load Time improvement in Hockey Canada&rsquo;s Performance During Peak Times</span></h2>\n<h2></h2>\n<h3>The Goal</h3>\n<p>When <a href=\"https://www.hockeycanada.ca/en-ca\" target=\"_blank\" rel=\"noopener\">Hockey Canada</a> set out to find a new content management system, the brand&rsquo;s need for a flexible, secure solution was paramount. After an extensive review of platforms, Hockey Canada landed on Agility CMS to rebuild its online presence because of the platform&rsquo;s robust capabilities.</p>\n<h3>The Challenge</h3>\n<p>During large-scale hockey events, fans visit the Hockey Canada website in droves to find game schedules, scores and information about players. Hockey Canada has experienced issues in the past as a result of a previous platform&rsquo;s inability to handle big spikes in traffic.</p>\n<p>Heading into an international tournament in early 2014, it was expected that Hockey Canada&rsquo;s website was going to receive record-breaking amounts of traffic, and Agility needed to be prepared to handle those big numbers to keep the site up and running without any hiccups during peak times.</p>\n<p>The marketing team also wanted to use Google Analytics to easily view statics which seemed to be the perfet fit since you can view your Google Analytics dashboard directly in Agility's CMS.</p>\n<h3>The Solution</h3>\n<p>Prior to the tournament, the Agility team analyzed peak traffic spikes from previous years versus CPU usage and site performance.</p>\n<p>Based on the findings, Agility implemented &ndash; with the help of partner Point Alliance &ndash; updates to the Hockey Canada site. We put a plan in place to ramp up its hosting environment if the load intensified at any point in time, and we tested many different scenarios.</p>\n<p>We also created and tested a new caching algorithm to handle new content being published to the live site during traffic spikes. We used load-testing software to find a benchmark of site performance prior to our updates. Then we ran the same tests against the site after our performance updates to see the impact of the changes made.</p>\n<h3>The Outcome</h3>\n<p>The Hockey Canada website was rebuilt and relaunched on Agility CMS with the help of an implementation partner.</p>\n<p>There was a major improvement in Hockey Canada&rsquo;s performance. Page load times were down by about 90%<span>&nbsp;</span>during peak traffic times, while CPU usage was down by over 60%.</p>\n<p>During the tournament, the Hockey Canada site set three new record highs and received page views in the millions. The site was able to handle it every time without a glitch.</p>\n<h3><strong>Visit the site: <a href=\"https://www.hockeycanada.ca\" target=\"_blank\" rel=\"noopener\">Here</a><a href=\"http://www.hockeycanada.ca/\" target=\"_blank\" rel=\"noopener\"></a></strong></h3>\n<p><strong><img alt=\"Hockey canada website 90% improvement in page load time\" src=\"https://static.agilitycms.com/case-studies/images/hockey-canada-case-study1.png\" /></strong></p>\n<p><strong></strong></p>\n<p><strong>Read More Customer Success stories:</strong></p>\n<ul>\n<li>\n<p><a href=\"https://agilitycms.com/resources/case-studies/cineplex\" target=\"_self\">Cineplex: Movie Theater Giant with Outstanding Content Architecture&nbsp;</a></p>\n</li>\n<li>\n<p><a href=\"https://agilitycms.com/resources/case-studies/visit-orlando\" target=\"_self\">Agility CMS' Headless ecommerce increase revenue by 20% for&nbsp;Visit Orlando&nbsp;</a></p>\n</li>\n<li><a href=\"https://agilitycms.com/resources/case-studies/scene\" target=\"_self\">Omnichannel Customer Experience for SCENE Rewards Program&nbsp;</a></li>\n</ul>\n<p style=\"border-image-outset: 0; border-image-repeat: stretch; border-image-slice: 100%; border-image-source: none; border-image-width: 1; box-sizing: border-box; color: #6d7882; font-family: Muli-Regular,sans-serif; font-size: 16px; font-size-adjust: none; font-stretch: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; letter-spacing: normal; line-height: 1.8; orphans: 2; text-align: left; text-decoration: none; text-indent: 0px; text-transform: none; vertical-align: baseline; -webkit-text-stroke-width: 0px; white-space: normal; word-spacing: 0px; padding: 0px; margin: 0px 0px 20px 0px; border: 0px none currentColor;\"></p>\n<p style=\"border-image-outset: 0; border-image-repeat: stretch; border-image-slice: 100%; border-image-source: none; border-image-width: 1; box-sizing: border-box; color: #6d7882; font-family: Muli-Regular,sans-serif; font-size: 16px; font-size-adjust: none; font-stretch: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; letter-spacing: normal; line-height: 1.8; orphans: 2; text-align: left; text-decoration: none; text-indent: 0px; text-transform: none; vertical-align: baseline; -webkit-text-stroke-width: 0px; white-space: normal; word-spacing: 0px; padding: 0px; margin: 0px 0px 20px 0px; border: 0px none currentColor;\"><img width=\"697\" height=\"302\" style=\"border-image-outset: 0; border-image-repeat: stretch; border-image-slice: 100%; border-image-source: none; border-image-width: 1; box-sizing: border-box; font-family: inherit; font-size: inherit; font-size-adjust: none; font-stretch: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; height: auto; line-height: inherit; max-width: 100%; vertical-align: baseline; padding: 0px; margin: 0px; border: 0px none currentColor;\" alt=\"Agility Free 90% improvement in page load time\" src=\"https://static.agilitycms.com/Gated%20content%2050%20checklist%20illustration-ad.jpg\" /></p>\n<p><strong></strong></p>",
            "clientNames": "Hockey Canada",
            "uRL": "hockey-canada",
            "image": {
              "label": "Hockey Canada 90% improvement in page load time",
              "url": "https://static.agilitycms.com/case-studies/images/hockey_20200516223809_0.jpg",
              "target": null,
              "filesize": 111842,
              "pixelHeight": "788",
              "pixelWidth": "940",
              "height": 788,
              "width": 940
            },
            "customerLogo": {
              "label": "hockey-canada-logo 90% improvement in page load time",
              "url": "https://static.agilitycms.com/logos/1200px-hockey_canada.svg_20190621181917_0.png",
              "target": null,
              "filesize": 94312,
              "pixelHeight": "1123",
              "pixelWidth": "1200",
              "height": 1123,
              "width": 1200
            },
            "cTA": {
              "contentID": 1777,
              "properties": {
                "state": 2,
                "modified": "2021-06-24T16:31:27.477",
                "versionID": 31386,
                "referenceName": "sharedctablocks",
                "definitionName": "CTABlock",
                "itemOrder": 0
              },
              "customFields": {
                "title": "Get Your Free Account Today",
                "internalTitle": "Try Agility Free",
                "subtitle": "Try the power of intuitive Headless CMS with Page Management.",
                "image": {
                  "label": "TRY AGILITY CMS",
                  "url": "https://static.agilitycms.com/Attachments/NewItems/cta-bottom-blog-free_20210624203045_0.jpg",
                  "target": null,
                  "filesize": 57769,
                  "pixelHeight": "300",
                  "pixelWidth": "975",
                  "height": 300,
                  "width": 975
                },
                "link": {
                  "href": "/free",
                  "target": "_self",
                  "text": "Sign Up Now"
                }
              }
            },
            "excerpt": "Agility helped Hockey Canada improve page load speeds by 90% during peak traffic times.",
            "rightContentCopy": "<h3><strong>Benefits of Agility CMS for Media and Entertainment Brands:</strong></h3>\r\n<ul>\r\n<li>We bring an industry-leading level of performance to your website. Agility&rsquo;s proprietary caching technology extends the caching capabilities in ASP.NET to provide blazing fast performance on any size of site with any traffic load. Agility also supports load-balanced configurations for your Web site</li>\r\n<li>Create multiple media libraries to store and stream your content, from images, music and video, to PDFs, Flash or Silverlight applications and more</li>\r\n<li>Use our Modules &mdash; widgets &mdash; to add static, dynamic or interactive content. Modules like online forms, image galleries and newsletter subscription boxes</li>\r\n<li>Standardized workflows for your content and media teams. Workflows can be managed automatically or manually, and users can easily follow and define each step</li>\r\n<li>The platform is built for mobile. It includes built-in responsive design capabilities and can build mobile apps and dedicated mobile sites</li>\r\n<li>Sites are search engine optimized and indexed by Google and other search engines</li>\r\n</ul>",
            "quote": "\"The Agility team is knowledgeable and works diligently to ensure the success of its clients. The platform is flexible and powerful enough for all of our projects while remaining approachable for a range of non-technical staff.\" — Craig Cameron, Director, Web and Digital Properties at Hockey Canada",
            "metrics": {
              "referencename": "casestudies_keyvaluepair242"
            },
            "contentPanelCopy": "With Agility CMS,  the Hockey Canada site set three new record highs and received page views in the millions. The site was able to handle it every time without a glitch.",
            "brandFGColor": "#FFF",
            "brandBGColor": "#BCBCBC",
            "imagePosition": "left",
            "productsRenderType": "list",
            "cTAID": "1777",
            "cTAName": "Get Your Free Account Today"
          }
        }
      ],
      "caseStudies_ValueField": "657,671,909"
    }
  }

  return (
    <LayoutTemplate>
      <SEO page={{ seo: {} }} />
      <NewGlobalHeader />
      <main className={classes}>
        {/* <AgilityPageTemplate {...viewModel} /> */}
        <CaseStudyBanner />
        <CaseStudyGallery />

        <CaseStudyRotator item={caseStudyRotator} />
        {/* <CaseStudyRelatedResources /> */}

      </main>
      <NewGlobalFooter />
    </LayoutTemplate>
  )
}

export default CaseStudy



const CaseStudyBanner = ({ }) => {
  return (
    <>
      <section className="">
        <div className="container">
          <div className="row">
            <div className="col col-lg-6 col-cs-left ps-rv">
              <div className="in-left d-flex flex-column h-100">
                <div className="d-table w-100">
                  <div className="d-table-cell align-middle last-mb-none">
                    <h1>Case Studies Headline</h1>
                    <p>See how agility CMS helped Visit Orlando increase revenue by 20%</p>
                  </div>
                </div>
                <div className="ps-rv cs-feature">
                  <div className="row">
                    <div className="col col-lg-4">
                      <div className="cs-f-item small-paragraph last-mb-none">
                        <h2 className="mb-0 text-white">10%</h2>
                        <p>Conversion rate increased</p>
                      </div>
                    </div>
                    <div className="col col-lg-4">
                      <div className="cs-f-item small-paragraph last-mb-none">
                        <h2 className="mb-0 text-white">20%</h2>
                        <p>Conversion rate increased</p>
                      </div>
                    </div>
                    <div className="col col-lg-4">
                      <div className="cs-f-item small-paragraph last-mb-none">
                        <h2 className="mb-0 text-white">50%</h2>
                        <p>Conversion rate increased</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-lg-6 col-cs">
              <div className="in-right h-100">
                <LazyBackground className="case-ban-bg h-100 bg" src="https://static.agilitycms.com/case-studies/images/visit-orlando-2_20200516204137_0.jpg?w=800&q=60" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="space-100"></div>
    </>
  )
}

const CaseStudyGallery = () => {

  const fakeImg = {
    "label": "TRY AGILITY CMS",
    "url": "https://static.agilitycms.com/Attachments/NewItems/cta-bottom-blog-free_20210624203045_0.jpg",
    "target": null,
    "filesize": 57769,
    "pixelHeight": "300",
    "pixelWidth": "975",
    "height": 300,
    "width": 975
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 650,
    arrows: true,
    rows: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  }
  const galleries = [1, 2, 3].map((i, index) => {
    return (
      <div key={index} className="gal-item">
        <ResponsiveImage img={fakeImg} />
      </div>
    )
  });
  return (
    <>
      <section className="case-d-gallery">
        <Slider {...settings} className="gal-slider">
          {galleries}
        </Slider>
      </section>
    </>
  )
}

// const CaseStudyRelatedResources = () => {


//   const resources = [1, 2, 3];

//   const ResourcesItem = ({ resource }) => {

//     const imgUrl = `https://static.agilitycms.com/case-studies/images/hockey_20200516223809_0.jpg?w=800&q=60`
//     return (
//       <div className="relate-re-box">
//         <div className="overflow-hidden">
//           <LazyBackground className="relate-re-thumb transition-25 bg" src={imgUrl} />
//         </div>
//         <div className="relate-re-cont">
//           <h3>Building an Ecommerce Website with Agility</h3>
//           <Link to="#" className="link-line line-purple">Readmore</Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <>
//       <section className="related-resources">
//         <div className="container">
//           <div className="text-center">
//             <h2>View Related Resources</h2>
//           </div>
//           <div className="row">
//             {resources.map((res, index) => {
//               return <div key={index} className="col-md-6 col-lg-4">
//                 <ResourcesItem />
//               </div>
//             })}
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }