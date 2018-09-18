import React from 'react';
import { 
  ActivityIndicator, 
  NavBar, 
  Icon, 
  Button, 
  Modal,
  DatePicker,
  List
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { StickyContainer, Sticky } from 'react-sticky'
import ItemCard from './itemCard'
import styles from './index.less';
import { routerRedux } from 'dva/router';

const ListItem = List.Item;

const QueryForm = createForm()(({
        form : {
          getFieldProps,
          getFieldValue,
          getFieldsValue
        }
      })=> 
        <div>
          <List renderHeader={ <span>选择要查询的时间段</span> }>
            <DatePicker 
              mode="date"
              minDate={new Date(2015, 1, 1, 0, 0, 0)}
              maxDate={new Date(Date.now())}
              {...getFieldProps('beginTime',{
                initialValue : new Date(Date.now())
              })}
            >
              <ListItem wrap>开始时间</ListItem>
            </DatePicker>
            <DatePicker 
              mode="date"
              minDate={getFieldValue('beginTime')}
              maxDate={new Date(Date.now())}
              {...getFieldProps('endTime',{
                initialValue : new Date(Date.now())
              })}
            >
              <ListItem wrap>结束时间</ListItem>
            </DatePicker>
          </List>
          <List 
            renderHeader={
              <p>选择时间段后点击查询查看统计数据</p>
            }
          >
            <ListItem extra={0}>
                新增人数
              </ListItem>
              <ListItem extra={0}>
                业绩统计
              </ListItem>
              <Button 
                type="warning" 
                onClick={()=>{
                  const value = getFieldsValue();
                  console.log(value)
                }}
              >查询</Button>
          </List>
        </div>
      )
function Teams({ teams, dispatch }) {
  const { team, loading, showModal } = teams;
  return (
    <StickyContainer>
      <Sticky>
        {
          ({
            style
          })=> (
            <NavBar
              style={{ ...style, zIndex: 5 }}
              mode="light"
              leftContent={<Icon type="left" style={{ color : '#333'}}/>}
              onLeftClick={()=>{
                dispatch(routerRedux.go(-1))
              }}
            >
              我的团队
            </NavBar>
          )
        }
      </Sticky>
      <div>
        {
           team.map((t,index)=> (
            <ItemCard 
              {...t} 
              key={`${t.id}-${index}`}
              onClick={
                ()=>dispatch(routerRedux.push({
                  pathname : '/application/teams',
                  search: `?id=${t.id}`
                }))
              }
            />
          ))
        }
      </div>
      <ActivityIndicator toast text="加载中..." animating={loading}/>
      <Modal 
        visible={showModal}
        transparent
        closable
        onClose={()=>dispatch({ type : 'teams/hideModal'})}
        title="新增业绩"
        popup
        animationType="slide"
      >
        <QueryForm />
      </Modal>
      <div className={ styles.bottom }>
        <Button 
          type="warning" 
          onClick={
            ()=>dispatch({
              type : 'teams/showModal'
            })
          } >查看新增业绩</Button>
      </div>
    </StickyContainer>
  )
}

export default connect(({ teams }) => ({ teams }))(Teams)


