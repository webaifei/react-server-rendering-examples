/**
 * 辅助方法
 */
import fetch from 'isomorphic-fetch'

/**
 * [callApi description]
 * @param  {[type]} url     [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function callApi(url, options={
  type:'GET',
  data:{},
  headers:{}
}){
  return fetch(url,{
    method:options.type,
    body:options.data,
    headers:options.headers
  }).then((res)=>res.json())
}

module.exports = {
  callApi
}
