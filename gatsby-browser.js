/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

// import './src/assets/styles/global.scss'
// import './src/assets/javascripts/app'
const AnimationScrollPage = require('./src/global/javascript/animation').default
exports.onRouteUpdate = () => {
  AnimationScrollPage()
}