import React from 'react';
import { hot } from 'react-hot-loader/root'
class LazyLoadImage extends React.Component {
  state = { src: null };

  componentDidMount() {
    const { src } = this.props;
    console.log('src: ', src)
    const tagName = 'section'
    const imageLoader = new Image();
    imageLoader.src = src;

    imageLoader.onload = () => {
      this.setState({ src });
    };
  }

  render() {
    return <section {...this.props} style={{ backgroundImage: `url(${this.props.placeholder})` }} />;
  }
}
export default hot(LazyLoadImage);

{/* <LazyLoadImage className="abcde" placeholder='/images/homepage-illustration.png'>
<h1>aaa</h1>
</LazyLoadImage> */}