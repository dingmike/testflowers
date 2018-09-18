import {city as cityJson} from '../assets/city.json';

export const menus = require("./menus").default;
export const request = require('./request').default;

export const prefixURI = '';
export const TESTTOKEN = 'abcdefghijklmn123456789';

export const delay = timeout => new Promise((resolve, reject)=> {
  setTimeout(resolve,timeout)
})

const P = cityJson.filter( p =>{
  return p.item_code.substr(2,4) === "0000"
})

const C = cityJson.filter( c =>{
  return c.item_code.substr(4,2) === "00" && c.item_code.substr(2,2) !== "00";
})

const A = cityJson.filter( a =>{
  return a.item_code.substr(4,2) !== "00"
}).map( a => {
  return {
    value : a.item_name,
    label : a.item_name,
    code : a.item_code
  }
})

const cityAppendAreas = C.map( i => {
  let CC = i.item_code.substr(0, 4)
  let child = A.filter(a => a.code.substr(0,4)===CC)
  return {
    value : i.item_name,
    label : i.item_name,
    code : i.item_code,
    children : child
  }
})

export const addresses = P.map( i => {
  let CC = i.item_code.substr(0, 2)
  let child = cityAppendAreas.filter( city => city.code.substr(0,2) === CC  )
  return {
    value : i.item_name,
    label : i.item_name,
    code : i.item_code,
    children : child
  }
})

export const Da = Date.now;