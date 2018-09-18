/**
 * param  * onClick(cb)
 * default* () => null
 * type   * function
 * 调用时需要手动调用cb函数开始倒计时
 * 
 * param  * time  
 * default* 30
 * type   * Number
 * 倒计时时长，默认30秒
 * 
 * param  * onTimeOver
 * default* ()=> null
 * type   * function
 * 倒计时完成后的执行的方法
 * 
 * param  * disabled
 * default* false
 * type   * boolen
 * 
 */

import { Component, Fragment } from 'react';
import styles from './CountDown.less';
const defaultTime = 30 //默认倒计时秒数
export default class CountDown extends Component {
  constructor(props) {
    super(props)
    this.timeout = null
    this.state = {
      time : 0
    }
  }
  static defaultProps = {
    time : defaultTime,
    onClick : () => null,
    onTimeOver : () => null,
    disabled : false
  }
  componentDidMount(){
    this.setState({
      time : this.props.time
    })
  }
  componentDidUpdate(prevProps, PrevState){
    const { time } = PrevState
    const { time : t, onTimeOver } = prevProps;
    if(time === 1){
      clearInterval(this.timeout)
      this.setState({
        time : t ? t : defaultTime
      })
      onTimeOver()
    }
  }
  componentWillUnmount(){
    clearInterval(this.timeout)
    this.props.onTimeOver()
  }
  handleClick = () => { 
    this.props.onClick(()=>{
      clearInterval(this.timeout)
      this.timeout = setInterval(()=>{
        this.setState({
          time : this.state.time - 1
        })
      }, 1000)
    })
  }
  render() {
    const { disabled } = this.props
    const { time } = this.state;
    return (
      <Fragment>
        { 
          disabled ? 
          <span className={ styles.countCode }>{time}秒后重试</span> 
            : 
          <span 
            className={ styles.code } 
            onClick={this.handleClick}
          >获取验证码</span>}
      </Fragment>
    )
  }
}