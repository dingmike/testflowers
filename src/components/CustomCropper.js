import React, { Component } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css'

class CustomCropper extends Component {
  constructor(props){
    super(props)
    this.el = React.createRef()
  }
  static defaultProps = {
    src : '',
    alt : '',
    viewMode : 1,
    dragMode: "crop",
    scalable : false,
    zoomable : false,
    style : {
      width : '300px',
      height : "300px"
    },
    ready : () => null,
    cropend : () => null
  }
  componentDidMount(){
    const opt = this.props;
    new Cropper(this.el,{
      aspectRatio: 1,
      ...opt
    })
  }
  render(){
    const { 
      style,
      src,
      alt,
    } = this.props;
    return (
      <div style={style}>
        <img 
          ref={(ref)=>this.el = ref}
          src={src}
          alt={alt}
        />
      </div>
    )
  }
}

export default CustomCropper;