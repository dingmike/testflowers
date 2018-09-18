import { TESTTOKEN } from './src/utils';
import {
  homeBanner,
  RollBanner,
  scenics,
  refers,
  scenicDetail,
  moreScenics,
  referDetail
} from './mock/home';
import {
  SAclassify,
  PRclassify,
  PRclassify1,
  crowdList,
  crowdDetail
} from './mock/crowd';
import {
  teams,
  address,
  payDetail,
  topUpCashPage1,
  topUpCashPage2,
  dividend1,
  dividend2,
  inOut1,
  inOut2,
  wineDetail,
  withdraw2,
  withdraw1
} from './mock/application';
import { wineList, wineList1 } from './mock/wine';
import { allOrder } from './mock/orders';

export default {
  // 登陆
  "POST /front/user/login": (req, res) => {
    const { phone, password } = req.body
    if (phone === '13778072462' && password === 'e10adc3949ba59abbe56e057f20f883e') {
      res.send({
        msg: '登陆成功！',
        code: 200,
        data: {
          token: TESTTOKEN
        }
      })
    } else {
      res.send({
        code: 301,
        msg: '账号或密码错误！'
      })
    }
  },
  // 注册
  "POST /front/user/register": (req, res) => {
    const opt = req.body;
    res.send({
      code: 200,
      msg: "注册成功."
    })
  },
  // 查看用户信息
  "POST /front/user/query": (req, res) => {
    const { token } = req.body;
    if (token && token === TESTTOKEN) {
      res.send({
        msg: '成功',
        code: 200,
        data: {
          id: 2000,
          name: null,
          headImg: 'https://placeimg.com/320/320/people',
          cashBalance: 1000.12,
          prIntegral: 1000.12,
          cpIntegral: 1000.12,
          pid: 123456789,
          rank: 1152,
          rankName: '普通会员',
          phone: '13778072462',
          teamNum: 10,
          teamMoney: 100000.23,
          nickName: 'Stephen Curry',
          recommendName: '杨晓'
        }
      })
    } else {
      res.send({
        code: 2001,
        msg: 'token失效.'
      })
    }
  },
  // 主页轮播图接口
  "POST /front/product/query": (req, res) => {
    res.send({
      code: 200,
      msg: '成功',
      ...homeBanner
    })
  },
  // 主页滚动新闻接口
  "POST /front/notice/query": (req, res) => {
    const { type } = req.body;
    res.send({
      code: 200,
      msg: "成功",
      ...RollBanner
    })
  },
  // 主页景点展示接口
  "POST /front/sightSpot/query": (req, res) => {
    const { pageSize, pageNo } = req.body
    if (pageNo) {
      res.send({
        code: 200,
        msg: '成功',
        ...moreScenics
      })
      return 
    }
    res.send({
      code: 200,
      msg: '成功',
      ...scenics
    })
  },
  // 查看景点详情
  "POST /front/sightSpot/queryById": (req, res) => {
    const { id } = req.body;
    res.send({
      code: 200,
      msg: "成功",
      ...scenicDetail
    })
  },
  // 主页入园参考接口
  "POST /front/garden/query": (req, res) => {
    res.send({
      code: 200,
      msg: '成功',
      ...refers
    })
  },
  "POST /front/garden/queryById": (req, res) => {
    res.send({
      code: 200,
      msg: '成功',
      ...referDetail
    })
  },
  // 获取验证码
  "POST /front/user/getCode": (req, res) => {
    const { phone } = req.body
    res.send({
      code: 200,
      msg: '成功'
    })
  },
  //查看众筹和种酒的分类类目
  "POST /front/category/query": (req, res) => {
    const { typeId, pid } = req.body;
    if (!typeId) {
      res.send({
        code: 300,
        msg: '没有typeId参数'
      })
      return
    }
    if (!pid) {
      res.send({
        code: 200,
        msg: '成功',
        ...SAclassify
      })
      return
    } else {
      if (pid == SAclassify.data[0].id) {
        res.send({
          code: 200,
          msg: '成功',
          ...PRclassify1
        })
        return
      } else {
        res.send({
          code: 200,
          msg: '成功',
          ...PRclassify
        })
        return
      }
    }
  },
  // 众筹分类列表
  "GET /front/fundingProduct/list": (req, res) => {
    res.send({
      "code": 200,
      "msg": "成功",
      ...crowdList
    })
  },
  // 众筹项目列表
  "GET /front/fundingProduct/index": (req, res) => {
    res.send({
      "code": 200,
      "msg": '成功',
      ...crowdDetail
    })
  },
  // 参与众筹
  "POST /front/fundingProduct/investment": (req, res) => {
    res.send({
      code: 200,
      msg: '成功',
      data: null
    })
  },
  // 获取种酒类目下的List
  "POST /front/LiquorProduct/queryByCategoryId": (req, res) => {
    const { id } = req.body
    if (id === "200") {
      res.send({
        "code": 200,
        "msg": "成功",
        ...wineList
      })
      return
    }
    if (id === "201") {
      res.send({
        "code": 200,
        "msg": "成功",
        ...wineList1
      })
      return
    }
  },
  // 种酒详情
  "POST /front/LiquorProduct/queryById/": (req, res) => {
    const { id } = req.body
    res.send({
      "code": 200,
      "msg": "成功",
      ...wineDetail
    })
  },
  // 购买种酒
  "POST /front/LiquorProduct/buy": (req, res) => {
    const { payPassWord } = req.body;
    console.log(payPassWord)
    if (payPassWord !== "851020") {
      res.send({
        code: 300,
        msg: '支付密码错误',
        data: null
      })
      return
    } else {
      res.send({
        code: 200,
        msg: '成功',
        data: null
      })
    }
  },
  // 查看我的团队
  "POST /front/user/queryDowmUser": (req, res) => {
    const { id } = req.body;
    res.send({
      code: 200,
      msg: '成功',
      ...teams
    })
  },


  // 查看收货地址
  "POST /front/ReceivingAddress/query": (req, res) => {
    const { token } = req.body;
    res.send({
      code: 200,
      msg: '成功',
      ...address
    })
  },
  // 删除收获地址
  "POST /front/ReceivingAddress/delete": (req, res) => {
    const { id, token } = req.body
    console.log(id, token)
    res.send({
      msg: "成功",
      code: 200,
    })
  },
  // 设置默认收获地址
  "POST /front/ReceivingAddress/Isdefault": (req, res) => {
    const { id, token } = req.body
    console.log(id, token)
    res.send({
      msg: '成功',
      code: 200
    })
  },
  // 实名认证
  "POST /front/user/RealName": (req, res) => {
    const { ..._ } = req.body;
    console.log(_)
    res.send({
      msg: '成功',
      code: 200
    })
  },
  // 新增收货地址
  "POST /front/ReceivingAddress/save": (req, res) => {
    const { token, city, isDefault, dist } = req.body;
    console.log(token, city, isDefault, dist)
    res.send({
      msg: '收货地址添加成功',
      code: 200
    })
  },
  // 更新收货地址
  "POST /front/ReceivingAddress/update": (req, res) => {
    const { id, token } = req.body
    console.log(id, token)
    res.send({
      msg: '收货地址修改成功',
      code: 200
    })
  },
  // 绑定银行卡
  "POST /front/userInfo/binding": (req, res) => {
    const opt = req.body;
    console.log(opt)
    res.send({
      msg: "绑定成功",
      code: 200
    })
  },
  /* 修改支付密码和登陆密码 
   * type 
   * 1.修改登陆密码
   * 2.修改支付密码
   */
  "POST /front/user/updatePassword": (req, res) => {
    const { password } = req.body
    if (password === '123456') {
      res.send({
        msg: "修改成功",
        code: 200
      })
    } else {
      res.send({
        code: 300,
        msg: '原密码错误'
      })
    }
  },
  // 购买种酒明细
  "POST /front/userWallte/queryZj": (req, res) => {
    res.send({
      code: 200,
      msg: '成功',
      ...payDetail
    })
  },
  // 查看现金余额、分红积分、记录
  "POST /front/userRecharge/query": (req, res) => {
    const { status, page } = req.body;
    if (status === "1" && page === "1") {
      res.send({
        code: 200,
        "msg": "成功",
        ...topUpCashPage1
      })
    }
    if (status === '1' && page === "2") {
      res.send({
        code: 200,
        msg: '成功',
        ...topUpCashPage2
      })
    }
    if (status === "2" && page === "1") {
      res.send({
        code: 200,
        "msg": "成功",
        ...dividend1
      })
    }
    if (status === "2" && page === "2") {
      res.send({
        code: 200,
        "msg": "成功",
        ...dividend2
      })
    }
  },
  // 转账记录
  "POST /front/userTransfer/query": (req, res) => {
    const { inOut, page } = req.body
    if (page === "1") {
      res.send({
        code: 200,
        msg: '成功',
        ...inOut1
      })
    }
    if (page === "2") {
      res.send({
        code: 200,
        msg: '成功',
        ...inOut2
      })
    }
  },
  "POST /front/UserWithdraw/query": (req, res) => {
    const { page } = req.body
    if (page === '1') {
      res.send({
        code: 200,
        msg: '成功',
        ...withdraw1
      })
    }
    if (page === "2") {
      res.send({
        code: 200,
        msg: '成功',
        ...withdraw2
      })
    }
  },
  // 计算提现手续费
  "POST /front/UserWithdraw/calculate": (req, res) => {
    const { money } = req.body;
    let m = Number(money);
    let s = m * .95
    let tax = 0;
    let f = m * .05
    res.send({
      "code": 200,
      "msg": "成功",
      "data": {
        "actual": s.toFixed(2),
        "tax": tax.toFixed(2),
        "formalities": f.toFixed(2)
      }
    })
  },
  // 申请提现
  "POST /front/UserWithdraw/initiate": (req, res) => {
    const { payPassWord, money, token } = req.body;
    if (token === TESTTOKEN) {
      res.send({
        code: 200,
        msg: '成功',
        data: null
      })
    }
    if (token !== TESTTOKEN) {
      res.send({
        code: 2001,
        msg: 'token失效',
        data: null
      })
    }
  },
  //查看转账用户的用户名
  "POST /front/user/queryName": (req, res) => {
    const { phone } = req.body;
    if (phone === "13778072462") {
      res.send({
        code: 200,
        msg: '成功',
        data: '*志'
      })
      return
    }
    if (phone === "13777777777") {
      res.send({
        code: 200,
        msg: '成功',
        data: '**旭'
      })
      return
    }
    res.send({
      code: 300,
      msg: "没有这个用户",
      data: null
    })
  },
  // 转账现金余额
  "POST /front/user/transferBalance": (req, res) => {
    res.send({
      code: 200,
      msg: '成功'
    })
  },
  // 查看窖藏列表
  "POST /front/cellarOrder/queryByStatus": (req, res) => {
    res.send({
      code: 200,
      msg: '成功',
      ...allOrder
    })
  },
  // 查看窖藏详情
  "POST /front/cellarOrder/queryById": (req, res) => {
    res.send({
      code: 200,
      msg: '成功',
      "data": {
        "imgDescArr": [
          "http://placeimg.com/460/200/any",
          "http://placeimg.com/460/200/any",
          "http://placeimg.com/460/200/any",
          "http://placeimg.com/460/200/any"
        ],
        "payMoney": 2000000,
        "name": "高原女儿红",
        "number": 1,
        "specs": 1000,
        "giveIntegral": 5000,
        "orderId": "20180820163421346001",
        "creatTime": Date.now(),
        "orderStatus": 2,
        "cellarNumber": null,
        "context": null,
        "cellarTime": null,
        "status": "申请启坛"
      }
    })
  },
  "POST /front/user/updateNickName" : (req, res) => {
    res.send({
      code : 200,
      msg  : '成功',
      data : null
    })
  }
}
