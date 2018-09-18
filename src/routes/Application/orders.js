import React from 'react';
import { List, Icon } from 'antd-mobile';
import IconItem from '../../components/CustomItem';

import styles from './orders.less';
import PedingIcon from '../../assets/pending.png';
import ProceIcon from '../../assets/processed.png';
import ReceivedIcon from '../../assets/received.png';
import ReceivingIcon from '../../assets/receiving.png';
import OutIcon from '../../assets/out.png';

const ListItem = List.Item;

export default ({ name, gotoOrders }) => 
  <div className={ styles.wrapper }>
    <List>
      <ListItem 
        extra={
          <div className={ styles.extra } onClick={()=>gotoOrders('all')}>
            <span className={ styles.text }>全部窖酒</span>
            <Icon type="right"/>
          </div>}
        >
          我的窖酒
        </ListItem>
        <div className={ styles.items }>
          <IconItem text="待窖藏" icon={PedingIcon} onClick={()=>gotoOrders("stay")}/>
          <IconItem text="已窖藏" icon={ProceIcon} onClick={()=>gotoOrders("dispose")}/>
          <IconItem text="已转出" icon={OutIcon} onClick={()=>gotoOrders("out")}/>
          <IconItem text="申请启坛" icon={ReceivingIcon} onClick={()=>gotoOrders("apply")}/>
          <IconItem text="已启坛" icon={ReceivedIcon} onClick={()=>gotoOrders("complete")}/>
        </div>
    </List>
  </div>