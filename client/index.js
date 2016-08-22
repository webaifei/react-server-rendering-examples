import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from '../common/store/'

import App from '../common/container/'

const store = configureStore(window.__INITIAL_STATE__)
render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)
