import Mock from 'mockjs';
import { 
  // titleRandom,
  TitleRandom, 
  // contentRandom,
  longContentRandom,
  // nameRandom,
  imgRandom320x200
} from './utils';

export const allOrder = Mock.mock({
  "data|10-15" : [{
    "orderId|+1": 254564546323,
    "name": TitleRandom,
    "liquorCategory": 1,
    "categoryName": null,
    "largessIntegral|1": [1000,1500,2000,500,2500,5000],
    "context": longContentRandom,
    "cellarNumber": 0,
    "img": imgRandom320x200,
    "standard|1": [1000,1500,2000,500,2500],
    "number|1": [1,2,3,4]
  }]
})
