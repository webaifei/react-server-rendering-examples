## react 服务端渲染
> 服务端渲染并不是什么新科技，前端刀耕火种时代，我们的前端页面都是被整合到服务端模版（smarty,jsp,asp）中，
网页的展示流程：
1. 客户端发起一个请求
2. 服务端接收到请求，根据已定的路由规则（请求路径匹配），获取需要展示的数据（去数据库查，或者是从其他的接口请求）
3. 把拿到的数据，用模版引擎（正则匹配替换）生成一大坨html字符串，返回给前端


## react 服务端渲染是什么？
上面的过程其实就是基础版本的服务端渲染。
而在当前环境下再提服务端渲染，其实是相对于当前比较流程的spa（单页应用）而言。在单页应用中，我们通常为了开发效率的提升，采用前后端分离，服务端只负责提供数据接口，页面路由和数据的请求，全部放在前端实现，而数据请求基本上都是异步获取（换言之，我们的页面在服务端第一时间返回之后，是没有数据的）

## 解决了什么问题？
现在的服务端渲染，是即保留了前后端分离的优势，有兼顾之前服务端渲染的益处。

1. 服务端渲染首屏需要展示的数据 快速
2. 利于seo
3. 后续请求客户端异步发起，减少服务端不必要的请求，保证第一次页面展示的速度
4. 保持前后端分离的特性，前后端低耦合，减少依赖关系，高效开发

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
    // conbinedData 需要和reducers对应上
    var store = configureStore(conbinedData)
    var html = renderToString(
      <Provider store={store}>
        <App/>
      </Provider>
      );
    // 客户端需要的initialState
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
