import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import {
  PullToRefresh,
  ActivityIndicator,
  NavBar,
  Icon
} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { StickyContainer, Sticky } from 'react-sticky';
import styles from './index.less';
import moment from 'moment';
class Recharges extends Component{
  componentDidMount(){
    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.el).offsetTop;
    this.props.dispatch({
      type : 'cash/setHeight',
      payload : hei
    })
  }
  render(){
    const { cash , dispatch } = this.props;
    const { loading, height, performance, pagination:{
      isLast=false,
      page=1,
      type=1, //1-余额 2-积分 3-全部
      pageSize=10
    }} = cash;
    return (
      <StickyContainer>
        <Sticky>
          {
            ({
              style
            })=> (
              <NavBar
                mode="light"
                style={{
                  ...style,
                  zIndex: 5,
                  boxShadow : "0 1px 1px #ABABAB"
                }}
                leftContent={<Icon type="left" style={{ color : '#333'}}/>}
                onLeftClick={()=>{
                  dispatch(routerRedux.go(-1))
                }}
              >
                收入明细
              </NavBar>
            )
          }
        </Sticky>
        <ActivityIndicator toast animating={loading} text="数据装填中..."/>
        <PullToRefresh
          ref={el => this.el = el }
          style={{
            height: height,
            overflow: 'auto',
          }}
          direction="up"
          indicator={{
            deactivate : '上拉加载更多'
          }}
          distanceToRefresh={80}
          onRefresh={()=>{
            if(isLast){
              return null
            }else {
              dispatch({ type : 'cash/queryMorePerformance', payload : { nextPage : page + 1, pageSize: pageSize, type }})
            }
          }}
        >
          {
            performance.map((re,index)=>
              <div
                className={styles.list}
                key={`${re.userId}-${index}`}
              >
                <div className={ styles.header }>
                  {/*<p className={ styles.headerName }>{re.details}</p>*/}
                  {/*<p className={ styles.headerNumber }>+{re.money}</p>*/}
                  <p className={ styles.headerName } style={{color:'#9E0F15'}}>￥ {re.transMoney}</p>
                </div>
                <div className={ styles.msg }>
                  <p>返利来至下级用户：{re.transPhone}</p>
                  <p>{moment(re.creatTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                </div>
              </div>
            )
          }
        <p className={styles.bottomMsg }>{isLast? "到底啦！再拉也刷不出来啦~~~" : "上拉加载更多"}</p>
        </PullToRefresh>
      </StickyContainer>
    )
  }
}
export default connect(({cash})=>({cash}))(Recharges)
