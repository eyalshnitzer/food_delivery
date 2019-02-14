import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../Store/index'
import styles from './OrdersHistory.css'
import OrdersHistoryItem from './OrdersHistoryItem'
import Spinner from '../../UI/Spinner/Spinner'

class OrdersHistory extends React.Component {
  componentWillMount = () => {
    this.props.getOrdersHistory(this.props.userOnlineEmail)
  }
  render () {
    let show = (
      <div className={styles.main}>
        <div className={styles.title}> Your Orders History</div>
        {this.props.ordersArr.map(item => {
          return <OrdersHistoryItem item={item} key={item.currentDate} />
        })}
      </div>
    )
    if (this.props.loading) show = <Spinner />
    return <div> {show}</div>
  }
}

const mapStateToProps = state => {
  return {
    userOnlineEmail: state.secondReducer.userOnlineEmail,
    ordersArr: state.firstReducer.ordersHistory,
    loading: state.firstReducer.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrdersHistory: email => dispatch(actions.getOrdersHistory(email))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersHistory)
