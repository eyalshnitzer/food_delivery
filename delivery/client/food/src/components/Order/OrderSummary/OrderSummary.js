import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../Store/index'
import styles from './OrderSummary.css'

class OrderSummary extends React.Component {
  handleBuy = () => {
    let order = {
      itemName: this.props.chosenItem,
      itemDetails: this.props.arr,
      itemPrice: this.props.currentPrice,
      currentDate: new Date()
    }
    this.props.buyItem(order)
    this.props.history.push('/menu')
  }
  cancelBuy = () => {
    this.props.history.push('/picked_item')
  }
  render () {
    let a = this.props.arr
    let b = Object.keys(a).map(item => {
      return <div className={styles.details}> {item + ' : ' + a[item]} </div>
    })

    return (
      <div>
        <div className={styles.Title}> Your Item Details: </div>
        <div className={styles.chosenItem}> {this.props.chosenItem} </div>
        <div> {b}</div>
        <div> {'Price:   $' + this.props.currentPrice} </div>
        <div className={styles.buttonsDiv}>
          <button onClick={this.cancelBuy} className={styles.button}>
            Cancel
          </button>
          <button onClick={this.handleBuy} className={styles.button}>
            Add To Cart
          </button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    buyItem: order => dispatch(actions.buyItem(order))
  }
}
const mapStateToProps = state => {
  return {
    chosenItem: state.firstReducer.chosenItem,
    arr: state.firstReducer.boughtItemDetails[state.firstReducer.chosenItem],
    currentPrice: state.firstReducer.currentPrice,
    userId: state.secondReducer.userDetails._id
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderSummary)
