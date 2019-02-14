import React from 'react'
import styles from './ShoppingCartItems.css'
import ItemDetails from './ItemDetails'

class ShoppingCartItems extends React.Component {
  render () {
    return (
      <div className={styles.main}>
        <div> {this.props.item.itemName} </div>
        <ItemDetails itemDetails={this.props.item.itemDetails} />
        <div> {'$' + this.props.item.itemPrice} </div>
      </div>
    )
  }
}

export default ShoppingCartItems
