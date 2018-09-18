import Mock, { Random } from 'mockjs';

export const titleRandom = () => Random.ctitle(20,30)
export const contentRandom = () => Random.cparagraph(20,50)
export const nameRandom = () => Random.ctitle(3,5)
export const cnameRandom = () => Random.cname()
export const phoneRandom = () => Mock.mock({ "phone" : /^1[34578]\d{9}$/ }).phone;
export const numberRandom = () => Random.natural(1, 10);
export const moneyRandom = () => Random.float(1000,300000,0,2);
export const addressRandom = () => `${Random.county(true)} xxx街道xxx路xxx小区xxx单元x楼x号`;

export const imgRandom320x200 = () => Random.image("640x400","#2E4938");
export const imgRandom470x160 = () => Random.image("470x160","#2E4938");

export const longContentRandom = () => Random.cparagraph(100);

export const lookOverNumRandom = () => Random.natural(0,5000);

export const TitleRandom = () => Random.ctitle(3,5)