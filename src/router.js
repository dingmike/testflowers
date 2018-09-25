import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import Layout from './routes/Layout';

function RouterConfig({ history, app }) {
  // 404页
  const Error404PageComponent = dynamic({
    component : () => import('./routes/404'),
    models : () => [import("./models/error404")],
    app
  })
  // 登陆
  const LoginPageComponent = dynamic({
    component : () => import('./routes/Login'),
    models : () => [import('./models/login')],
    app
  })
  // 注册
  const SignInPageComponent = dynamic({
    component : () => import('./routes/SignIn'),
    models : () => [import('./models/signIn')],
    app
  })
  // 找回密码
  const RetrievePageComponent = dynamic({
    component : () => import('./routes/Retrieve'),
    models : () => [import('./models/retrieve')],
    app
  })
  // 主页
  const HomePageComponent = dynamic({
    component : () => import('./routes/Home'),
    models : () => [import('./models/home')],
    app
  })
  // 用户管理页
  const ApplicationPageComponent = dynamic({
    component : () => import('./routes/Application'),
    models : () => [import('./models/application')],
    app
  })
  // 众筹页
  const CrowdPageComponent = dynamic({
    component : () => import('./routes/Crowd'),
    models : () => [import('./models/crowd')],
    app
  })
  // 众筹详情页
  const CrowdDetailPageComponent = dynamic({
    component : () => import('./routes/Crowd/Detail'),
    models : () => [import('./models/crowd')],
    app
  })
  // 我的团队
  const ItemPageComponent = dynamic({
    component : () => import('./routes/Teams'),
    models : () => [import('./models/teams')],
    app
  })
  // 种酒页面
  const WinePageComponent = dynamic({
    component : () => import('./routes/Wine'),
    models : () => [import('./models/wine')],
    app
  })
  // 种酒商品详情
  const WineDetailPageComponent = dynamic({
    component : () => import('./routes/Wine/Detail'),
    models : () => [import('./models/wine')],
    app
  })
  // 设置收货地址
  const AddressPageComponent = dynamic({
    component : () => import('./routes/User/Address'),
    models : () => [import('./models/user/address')],
    app
  })
  const SettingsPageComponent = dynamic({
    component : () => import('./routes/User/Settings'),
    models : () => [import('./models/user/userSettings')],
    app
  })
  const CertificationPageComponent = dynamic({
    component : () => import('./routes/User/Certification'),
    models : () => [import('./models/user/certification')],
    app
  })
// 景点展示列表和详情页面begin
  const ScenicsDetailPageComponent = dynamic({
    component : () => import('./routes/Scenics/Detail'),
    models : () => [import('./models/scenics')],
    app
  })
  const ScenicsPageComponent = dynamic({
    component : () => import('./routes/Scenics'),
    models : () => [import('./models/scenics')],
    app
  })
// 景点展示列表和详情页面end

// 安全设置页面begin
  const SafetyPageComponent = dynamic({
    component : () => import('./routes/User/Safety'),
    models : () => [import('./models/user/safety')],
    app
  })
  // 安全设置页面end
  const RefersDetailPageComponent = dynamic({
    component : () => import('./routes/Refers/Detail'),
    models : () => [import('./models/refers')],
    app
  })
  const RefersPageComponent = dynamic({
    component : () => import('./routes/Refers'),
    models : ()=> [import('./models/refers')],
    app
  })
  // 新闻
  const NewsPageComponent = dynamic({
    component : () => import('./routes/News'),
    models : () => [import('./models/news')],
    app
  })
  // 新闻详情
  const NewsDetailPageComponent = dynamic({
    component : () => import('./routes/News/detail'),
    models : () => [import('./models/news')],
    app
  })
  // 公告
  const NoticePageComponent = dynamic({
    component : () => import('./routes/Notice'),
    models : () => [import('./models/notice')],
    app
  })

  // 我的窖酒订单
  const OrdersPageComponent = dynamic({
    component : () => import('./routes/Orders'),
    models : () => [import('./models/orders')],
    app
  })

  const OrdersDetailPageComponent = dynamic({
    component : () => import('./routes/Orders/Details'),
    models : () => [import('./models/orders')],
    app
  })
  // 现金余额
  const CashPageComponent = dynamic({
    component : () => import('./routes/Cash'),
    models : () => [import('./models/cash')],
    app
  })
  // 购买种酒明细
  const WinesDetailPageComponent = dynamic({
    component : () => import('./routes/Cash/WinesDetail'),
    models : () => [import('./models/cash')],
    app
  })
  // 现金充值明细
  const RechargesPageComponent = dynamic({
    component : () => import('./routes/Cash/RechargeDetail'),
    models : () => [import('./models/cash')],
    app
  })
  // 分成业绩明细
  const PerformancePageComponent = dynamic({
    component : () => import('./routes/Cash/PerformanceDetail'),
    models : () => [import('./models/cash')],
    app
  })
  // 分成业绩明细
  const PerformanceIntePageComponent = dynamic({
    component : () => import('./routes/Integral/PerformanceDetail'),
    models : () => [import('./models/cash')],
    app
  })
  // 支付宝微信充值明细
  const ChargesPageComponent = dynamic({
    component : () => import('./routes/Cash/Charge'),
    models : () => [import('./models/cash')],
    app
  })
  // 分红积分明细
  const DividendPageComponent = dynamic({
    component : () => import('./routes/Cash/Dividend'),
    models : () => [import('./models/cash')],
    app
  })
  // 收入/支出明细
  const InoutPageComponent = dynamic({
    component : () => import('./routes/Cash/InOut'),
    models : () => [import('./models/cash')],
    app
  })
  // 提现明细
  const WithdrawalsPageComponent = dynamic({
    component : () => import('./routes/Cash/Withdrawals'),
    models : () => [import('./models/cash')],
    app
  })

  // 我的分红积分
  const IntegralPageComponent = dynamic({
    component : () => import('./routes/Integral'),
    models : () => [import('./models/integral')],
    app
  })
  // 转入分红积分明细
  const InIntegralPageComponent = dynamic({
    component : () => import('./routes/Integral/In'),
    models : () => [import('./models/integral')],
    app
  })
  // 转出分红积分明细
  const OutIntegralPageComponent = dynamic({
    component : () => import('./routes/Integral/Out'),
    models : () => [import('./models/integral')],
    app
  })
  // 投资项目积分
  const InvestsPageComponent = dynamic({
    component : () => import('./routes/Integral/Invests'),
    models : () => [import('./models/integral')],
    app
  })
  // 我的投资项目
  const InvestmentPageComponent = dynamic({
    component : () => import('./routes/Investment'),
    models : () => [import('./models/investment')],
    app
  })
  // 我的投资项目详情
  const InvestmentDetailPageComponent = dynamic({
    component : () => import('./routes/Investment/Detail'),
    models : () => [import('./models/investment')],
    app
  })
  // 查看物流
  const LogisticsPageComponent = dynamic({
    component : () => import('./routes/Logistics'),
    models : () => [import('./models/logistics')],
    app
  })
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route path="/" exact render={()=><Redirect to="/home"/>} />
          <Route path="/home" exact component={HomePageComponent}/>

          <Route path="/crowd" exact component={CrowdPageComponent}/>
          <Route path="/crowd/detail" exact component={CrowdDetailPageComponent}/>

          <Route path="/login" exact component={LoginPageComponent} />
          <Route path="/signIn" exact component={SignInPageComponent} />
          <Route path="/retrieve" exact component={RetrievePageComponent} />

          <Route path= "/home/scenics" exact component={ScenicsPageComponent}/>
          <Route path= "/home/scenics/detail" exact component={ScenicsDetailPageComponent}/>

          <Route path= "/home/refers" exact component={RefersPageComponent}/>
          <Route path= "/home/refers/detail" exact component={RefersDetailPageComponent}/>

          <Route path="/wine" exact component={WinePageComponent}/>
          <Route path="/wine/detail" exact component={WineDetailPageComponent}/>

          <Route path="/news" exact component={NewsPageComponent}/>
          <Route path="/news/detail" exact component={NewsDetailPageComponent}/>
          <Route path="/notice" exact component={NoticePageComponent}/>

          <Route path="/application" exact component ={ApplicationPageComponent}/>
          <Route path="/application/safety" exact component={SafetyPageComponent}/>
          <Route path="/application/teams" component={ItemPageComponent} />
          <Route path="/application/userSettings" exact component={SettingsPageComponent}/>
          <Route path="/application/certification" exact component={ CertificationPageComponent }/>
          <Route path="/application/address" exact component={AddressPageComponent}/>

          <Route path="/application/orders" exact component={OrdersPageComponent}/>
          <Route path="/application/orders/detail" exact component={OrdersDetailPageComponent}/>

          <Route path="/application/cash" exact component={CashPageComponent}/>
          <Route path="/application/cash/wines" exact component= {WinesDetailPageComponent} />
          <Route path="/application/cash/recharges" exact component= {RechargesPageComponent} />
          <Route path="/application/cash/charge" exact component= {ChargesPageComponent} />
          <Route path="/application/cash/performance" exact component= {PerformancePageComponent} />


          <Route path="/application/cash/dividend" exact component= {DividendPageComponent} />
          <Route path="/application/cash/inOut" exact component= {InoutPageComponent} />
          <Route path="/application/cash/withdrawals" exact component= {WithdrawalsPageComponent} />


          <Route path="/orders/logistics" exact component= {LogisticsPageComponent} />

          <Route path="/application/integral" exact component= {IntegralPageComponent} />
          <Route path="/application/integral/inIntegral" exact component= {InIntegralPageComponent} />
          <Route path="/application/integral/outIntegral" exact component= {OutIntegralPageComponent} />
          <Route path="/application/integral/invests" exact component= {InvestsPageComponent} />
          <Route path="/application/integral/performanceInte" exact component= {PerformanceIntePageComponent} />


          <Route path="/application/investment" exact component= {InvestmentPageComponent} />
          <Route path="/application/investment/detail" exact component= {InvestmentDetailPageComponent} />

          <Route component={Error404PageComponent}/>
        </Switch>
      </Layout>
    </Router>
  )
}

export default RouterConfig;
