import Mock from 'mockjs';
import { 
  phoneRandom, 
  numberRandom, 
  moneyRandom,
  nameRandom
} from './utils';
export const teams = Mock.mock({
  "data|5-10" : [{
    "id|+1" : 200,
    "phone" : phoneRandom,
    "teamNum" : numberRandom,
    "teamMoney" : moneyRandom,
    "name" : nameRandom,
    "consumption_money" : moneyRandom
  }]
})  