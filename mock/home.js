import Mock from 'mockjs';
import { 
  titleRandom,
  TitleRandom, 
  contentRandom,
  longContentRandom,
  lookOverNumRandom,
  nameRandom,
  imgRandom320x200
} from './utils';
export const homeBanner = Mock.mock({
  "data|5" : [{
    "imgUrl|+1" : "https://placeimg.com/640/300/nature/sepia",
    "pid|+1" : 200000, 
    "type|1-4" : 1
  }]
})

export const RollBanner = Mock.mock({
  "data|4-7" : [{
    "id|+1" : 300000,
    "title|+1": TitleRandom,
    "content|+1": contentRandom,
    "createTime|+86400000" : 1534149873000 
  }]
})

export const scenics = Mock.mock({
  "data":{
    "contebt|10" : [{
      "id|+1" : 100,
      "img" : "https://placeimg.com/640/400/nature/sepia",
      "title" : nameRandom
    }],
    "page" :  {
      "PageCount": 2,
      "pogeNo": 1,
      "pageSize": 10
    }
  }
})

export const moreScenics = Mock.mock({
  "data": {
    "contebt|10" : [{
      "id|+1" : 100,
      "img" : "https://placeimg.com/640/400/nature/sepia",
      "title" : nameRandom
    }],
    "page" :  {
      "PageCount": 2,
      "pogeNo": 2,
      "pageSize": 10
    }
  }
})

export const scenicDetail = Mock.mock({
  data : {
    imgDesc : [
      "http://placeimg.com/640/336/any",
      "http://placeimg.com/640/336/nature",
      "http://placeimg.com/640/336/nature/sepia"
    ],
    "id" : 1, 
    "title" : TitleRandom,
    "spotDetails" : `
      <p>中国西南第一大高山溶洞，分布着23个各具特色的溶洞，是世界罕见的高山溶洞群。</p>
      <p>这些溶洞反映了地球3.5－4亿年间变化的中国龙门山泥盆系标准地质剖面。
       </p>
      <p>除了别具特色的自然资源外，景区还有西羌晚会、高空滑道、滑草滑雪等娱乐项目。</p>` ,
    "notes" : `
      <p>中国西南第一大高山溶洞，分布着23个各具特色的溶洞，是世界罕见的高山溶洞群。</p>
      <p>这些溶洞反映了地球3.5－4亿年间变化的中国龙门山泥盆系标准地质剖面。
       </p>
      <p>除了别具特色的自然资源外，景区还有西羌晚会、高空滑道、滑草滑雪等娱乐项目。</p>`,
      "openTime" : "9:00 ~ 18:30"
    // context : `
    //   <h2>景点介绍</h2>
    //   <p>中国西南第一大高山溶洞，分布着23个各具特色的溶洞，是世界罕见的高山溶洞群。</p>
    //   <p>这些溶洞反映了地球3.5－4亿年间变化的中国龙门山泥盆系标准地质剖面。
    //   </p>
    //   <p>除了别具特色的自然资源外，景区还有西羌晚会、高空滑道、滑草滑雪等娱乐项目。</p>
    //   <h2>开放时间</h2>
    //   <p>08:00-18:00</p>
    //   <h2>游玩须知</h2>
    //   <p>中国西南第一大高山溶洞，分布着23个各具特色的溶洞，是世界罕见的高山溶洞群。</p>
    //   <p>这些溶洞反映了地球3.5－4亿年间变化的中国龙门山泥盆系标准地质剖面。
    //   </p>
    //   <p>除了别具特色的自然资源外，景区还有西羌晚会、高空滑道、滑草滑雪等娱乐项目。</p>
    // `
  }
})

export const refers = Mock.mock({
  "data|5-10" : {
    "contebt|5-10" : [
      {
        "id|+1" : 1010,
        "img" : "https://placeimg.com/640/250/nature",
        "intro" : longContentRandom,
        "see" : lookOverNumRandom,
        "name" : nameRandom
      }
    ],
    "page" :  {
      "PageCount": 2,
      "pogeNo": 2,
      "pageSize": 10
    }
  }
})

export const referDetail = Mock.mock({
  "data|5-10" : [{
    "id|+1" : 1,
    "name" : TitleRandom,
    "spotDetails": `<p>中国西南第一大高山溶洞，分布着23个各具特色的溶洞，是世界罕见的高山溶洞群。</p>
    <p>这些溶洞反映了地球3.5－4亿年间变化的中国龙门山泥盆系标准地质剖面。
     </p>
    <p>除了别具特色的自然资源外，景区还有西羌晚会、高空滑道、滑草滑雪等娱乐项目。</p> ,
    <p>中国西南第一大高山溶洞，分布着23个各具特色的溶洞，是世界罕见的高山溶洞群。</p>
    <p>这些溶洞反映了地球3.5－4亿年间变化的中国龙门山泥盆系标准地质剖面。
     </p>
    <p>除了别具特色的自然资源外，景区还有西羌晚会、高空滑道、滑草滑雪等娱乐项目。</p>`,
    "openTime" : "9:00 ~ 18:30",
    "notes" : longContentRandom,
    "imgArry" : [
      imgRandom320x200,
      imgRandom320x200,
      imgRandom320x200
    ]
  }]
})