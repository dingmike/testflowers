import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PlaceImg from '../assets/loading.png'
class Image extends Component {
  static defaultProps = {
    placeholder : PlaceImg,
    alt : '图片君',
    onClick : () =>  null
  }
  constructor(props){
    super(props)
    this.state = {
      loading : true,
      width : 0
    }
    this.el = null;
  }
  renderPlaceHolder(){
    if(this.state.loading){
      const holderH = this.props.scale * this.state.width;
      return (
        <div
          style={{
            height : holderH,
            backgroundImage: `url("${this.props.placeholder}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize : 'cover'
          }}
        ></div>
      )
    }else {
      return null
    }
  }
  componentDidMount(){
    const width = document.body.offsetWidth
    this.setState({
      width : width
    })
  }
  renderImage(){
    return (
      <img 
        src={this.props.src} 
        alt={this.props.alt}
        style={{ 
          width : "100%",
          display: this.state.loading ? "none" : "block"
        }}
        onLoad={()=>{
          this.setState({
            loading : false
          })
          window.dispatchEvent(new Event('resize'))
        }}
      />
    )
  }
  render(){
    return (
      <div
        onClick={this.props.onClick}
      >
        {this.renderImage()}
        {this.renderPlaceHolder()}
      </div>
    )
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  placehoder : PropTypes.string,
  scale : PropTypes.number,
  alt : PropTypes.string,
  onClick : PropTypes.func
}

export default Image;