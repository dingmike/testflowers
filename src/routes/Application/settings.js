import React from 'react';
import { List } from 'antd-mobile';
import CustomIcon from '../../components/CustomIcon';

import CompanyIcon from '../../assets/company.png';
import ContactIcon from '../../assets/contact.png';
import SecurityIcon from '../../assets/security.png';
import UserIcon from '../../assets/user.png';
import InvestIcon from '../../assets/invest.png';

import styles from './settings.less';

const ListItem = List.Item;

export default ({
  gotoUserSettings,
  gotoSafetySettings,
  gotoInvestment,
  showCompanyInfo,
  showConnectUs
}) => 
  <div className={ styles.wrapper }>
    <List>
      <ListItem
        arrow="horizontal"
        onClick={gotoInvestment}
      >
        <CustomIcon url={InvestIcon} text="我的投资项目"/>
      </ListItem>
      <ListItem
        arrow="horizontal"
        onClick={gotoUserSettings}
      >
        <CustomIcon url={UserIcon} text="个人设置"/>
      </ListItem>
      <ListItem
        arrow="horizontal"
        onClick={gotoSafetySettings}
      >
        <CustomIcon url={SecurityIcon} text="安全设置"/>
      </ListItem>
      <ListItem
        arrow="horizontal"
        onClick={showCompanyInfo}
      >
        <CustomIcon url={CompanyIcon} text="公司简介"/>
      </ListItem>
      <ListItem
        arrow="horizontal"
        onClick={showConnectUs}
      >
        <CustomIcon url={ContactIcon} text="联系我们"/>
      </ListItem>
    </List>
  </div>