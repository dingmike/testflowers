import Mock from 'mockjs';
import { 
  nameRandom, 
  imgRandom470x160, 
  contentRandom,
} from './utils';

export const SAclassify = Mock.mock({
  "data|2" :[{
    "id|+1" : 200,
    "name|+1" : [
      "星火花海",
      "圈圈圈水世界",
      "箩箩箩水世界"
    ]
  }]
})
export const PRclassify = Mock.mock({
  "data|5-10" : [{
    "id|+1" : 300,
    "name|+1" : nameRandom
  }]
})

export const PRclassify1 = Mock.mock({
  "data|5-10" : [{
    "id|+1" : 300,
    "name|+1" : nameRandom
  }]
})


export const crowdList = Mock.mock({
  "data|8-55" : [{
    "spotId|+1": 4,
    "name": nameRandom,
    "fundingNumber|+13": "1534925194645664149",
    "money|1": [6000,3000,4500,1200],
    "accomplishMoney": function(){
      return this.money - 500
    },
    "accomplish": 0,
    "spotDetails": "<p>相信我，不赚钱 我做你爷爷。</p>",
    "notes": contentRandom,
    "masterImg" : imgRandom470x160
  }]
})

export const context = `
<h2>酒品介绍</h2>
<p>中国西南第一大高山溶洞，分布着23个各具特色的溶洞，是世界罕见的高山溶洞群。</p>
<p>这些溶洞反映了地球3.5－4亿年间变化的中国龙门山泥盆系标准地质剖面。
</p>
<p>除了别具特色的自然资源外，景区还有西羌晚会、高空滑道、滑草滑雪等娱乐项目。</p> ,
"notes" : 
<p>中国西南第一大高山溶洞，分布着23个各具特色的溶洞，是世界罕见的高山溶洞群。</p>
<p>这些溶洞反映了地球3.5－4亿年间变化的中国龙门山泥盆系标准地质剖面。
</p>
<p>除了别具特色的自然资源外，景区还有西羌晚会、高空滑道、滑草滑雪等娱乐项目。</p>
<h2>窖酒详情</h2>
<p>中国西南第一大高山溶洞，分布着23个各具特色的溶洞，是世界罕见的高山溶洞群。</p>
<p>这些溶洞反映了地球3.5－4亿年间变化的中国龙门山泥盆系标准地质剖面。
</p>
<p>除了别具特色的自然资源外，景区还有西羌晚会、高空滑道、滑草滑雪等娱乐项目。</p> ,
"notes" : 
<p>中国西南第一大高山溶洞，分布着23个各具特色的溶洞，是世界罕见的高山溶洞群。</p>
<p>这些溶洞反映了地球3.5－4亿年间变化的中国龙门山泥盆系标准地质剖面。
</p>
<p>除了别具特色的自然资源外，景区还有西羌晚会、高空滑道、滑草滑雪等娱乐项目。</p>`

export const crowdDetail = Mock.mock({
  "data": {
    "spotId": 4,
    "name": "红河州", //标题
    "fundingNumber": "1534925194645664149",//编号
    "money": 6000, //所需积分
    "accomplishMoney": 3120, //已筹积分
    "accomplish": 9, //参与人数
    "spotDetails": context, //介绍
    "notes": contentRandom,//须知
    "masterImg": "http://placeimg.com/640/400/Nature/Grayscale,http://placeimg.com/640/400/Nature/Sepia,http://placeimg.com/640/400/Nature"
  }
})
