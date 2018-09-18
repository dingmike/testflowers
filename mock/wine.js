import Mock from 'mockjs';
import { 
  TitleRandom,
  contentRandom,
  imgRandom320x200
} from './utils';
export const wineList = Mock.mock({
  "data|8-12" : [{
    "id|+1" : 1,
    "name" : TitleRandom,
    "largessIntegral": 5000,
    "liquorCategory" : 1,
    "context" : contentRandom,
    "cellarNumber" : 0,
    "img" : imgRandom320x200,
    "standard": 1000
  }]
})


export const wineList1 = Mock.mock({
  "data|8-12" : [{
    "id|+1" : 10,
    "name" : TitleRandom,
    "largessIntegral": 3000,
    "liquorCategory" : 1,
    "context" : contentRandom,
    "cellarNumber" : 0,
    "img" : imgRandom320x200,
    "standard": 500
  }]
})