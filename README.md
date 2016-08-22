## react 服务端渲染

## react 服务端渲染是什么？

## 解决了什么问题？

## 实现的思路
> 相比之前的客户端渲染，我们需要至少做两件事情
1. 首屏展示的数据（包含依赖数据）在服务端获取（调用其他的服务接口，或者是从数据库中获取）
2. 把首屏的html字符串返回给客户端

服务端核心代码：
```
//使用express构建http服务器
var app = require('express')();
import { Provider } from 'react-redux'
import configureStore from 'xxx/store/'

app.use(handleRender)

function handleRender(req, res){
  getInitData().then((conbinedData)=>{
    var store = configureStore(conbinedData)
    var html = renderToString(
      <Provider store={store}>
        <App/>
      </Provider>
      );

    var finalState = store.getState();
    res.send(renderHtml(html, finalState))
    })
}
//请求首屏数据
function getInitData(){
  //fetch可以替换成请求很多接口之后 返回一个promise对象
  return fetch('xxx')
}
// 返回最终的html字符串
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
        //__INITIAL_STATE__ 作为客户端的initialState
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      <script src="/static/bundle.js"></script>
    </body>
  </html>
  `
}
```
