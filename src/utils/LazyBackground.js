import React from 'react';

function elementInViewport(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= -500
    && rect.left >= -1000
    && rect.top <= ((window.innerHeight || document.documentElement.clientHeight) + 500)
  )
}

export default class LazyImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    }

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.handleScroll();

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (!this.state.loaded && elementInViewport(this.bgElm) && this.bgElm.offsetWidth > 0) {
      // Load real image
      const imgLoader = new Image();
      imgLoader.src = this.props.src;
      imgLoader.onload = () => {
        if (this.bgElm) {
          this.bgElm.setAttribute(
            `style`,
            `background-image: url('${this.props.src}')`
          );
        }

        this.setState({
          loaded: true
        });
      }
    }
  }

  render() {
    return (
      <div ref={bgElm => this.bgElm = bgElm} className={this.props.className}>
        { this.props.children }
      </div>
    )
  }
}