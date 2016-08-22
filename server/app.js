/**
 * 服务端程序代码
 */

const express = require('express');
import webpack from 'webpack'
import React from 'react'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import { renderToString } from 'react-dom/server'
import {Provider} from 'react-redux'
import configureStore from '../common/store/index'
import App from '../common/container/index'
import webpackConfig from '../webpack.config'
import {callApi} from '../common/utils/'
var app = new express();

// 这个应该是开发环境中的配置！！
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use(handleFn);



app.listen(8080, function (err){
  if(err){
    console.log(error)
  }else{
    console.log('server start at port: 8080')
  }
})

function handleFn(req, res){
  //fetch data
  callApi('https://s.jdpay.com/sku/queryTodaySaleSkuList').then((json)=>{
    var initialState = {
      list: json.data.page.data
    };
    const store = configureStore(initialState)
    var html = renderToString(
      <Provider store={store}>
        <App/>
      </Provider>
    );
    var finalState = store.getState();
    var htmlString = renderHtml(html, finalState)
    res.send(htmlString);
  }).catch((res)=>{
    console.log(res)
  })

}

function renderHtml(html, initialState){
  return `
  <!doctype html>
  <html>
    <head>
      <title>Redux Universal Example</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      <script src="/static/bundle.js"></script>
    </body>
  </html>
  `;
}
