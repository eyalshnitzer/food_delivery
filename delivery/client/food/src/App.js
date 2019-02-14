import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import OrderSummary from './components/Order/OrderSummary/OrderSummary'
import Welcome from './components/Login/Sign/Welcome'
import Menu from './components/Order/Menu'
import Sign from './components/Login/Sign/Sign'
import PickedItem from './components/Order/PickedItem/PickedItem'
import ShoppingCart from './components/Order/ShoppingCart'
import OrdersHistory from './components/Order/OrdersHistory'

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/menu' exact component={Menu} />
            <Route path='/picked_item' component={PickedItem} />
            <Route path='/order_summary' component={OrderSummary} />
            <Route path='/shopping_cart' component={ShoppingCart} />
            <Route path='/welcome' exact component={Welcome} />
            <Route path='/orders_history' exact component={OrdersHistory} />
            <Route path='/' exact component={Sign} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App
