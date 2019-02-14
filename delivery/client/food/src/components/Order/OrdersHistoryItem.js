import React from 'react'
import styles from './OrdersHistoryItem.css'

class OrdersHistoryItem extends React.Component {
  render () {
    return (
      <div className={styles.block}>
        <div>{this.props.item.currentDate}</div>
        <div>{this.props.item.itemName}</div>
        <div>{'$' + this.props.item.itemPrice}</div>
      </div>
    )
  }
}

export default OrdersHistoryItem
