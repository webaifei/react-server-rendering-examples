import React , { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {callApi} from '../utils/index'
import * as actions from '../actions/'
class App extends Component{
  constructor(props){
    super(props);

  }
  componentWillMount(){
    const {list, initList} = this.props;
    // if(!global.window){
    //   callApi('https://s.jdpay.com/sku/queryTodaySaleSkuList').then((res)=>{
    //     initList(res.data.page.data)
    //   })
    // }
  }
  componentDidMount(){
    console.log(this.props)
  }
  render(){
    const {list} = this.props;

    return(
      <div>
        <h1> 商品列表</h1>
        {
          list.map((item, index)=>{
            return (<p key={item.skuId}>
              {item.skuName}
            </p>)
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    list: state.list
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(actions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
