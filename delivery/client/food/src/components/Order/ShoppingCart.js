import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../Store/index'
import styles from './ShoppingCart.css'
import ShoppingCartItems from './ShoppingCartInside/ShoppingCartItems'
import Modal from '../../UI/Modal/Modal'

class ShoppingCart extends React.Component {
  cancelOrder = () => {
    this.props.history.push('/menu')
  }
  handleBackdropClicked = () => {
    this.props.closeModal()
    this.props.history.push('/menu')
  }

  handleOrder = () => {
    this.props.customerOrder(this.props.orders)
  }
  returnToMenu = () => {
    this.props.closeModal()
    this.props.history.push('/menu')
  }
  render () {
    return (
      <div className={styles.main}>
        <div className={styles.title}>Your Shopping cart</div>
        {this.props.orders.ordersDetails.map(element => {
          return <ShoppingCartItems item={element} />
        })}
        <div className={styles.buttonsAndPrice}>
          <button className={styles.button} onClick={this.cancelOrder}>
            Cancel
          </button>
          <button className={styles.button} onClick={this.handleOrder}>
            Order
          </button>
          <div className={styles.price}>
            {'Total Price: ' + this.props.totalPrice}
          </div>
        </div>

        <Modal
          backDropClicked={this.handleBackdropClicked}
          show={this.props.showModalAfterOrder}
          returnToMenu={this.returnToMenu}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.firstReducer.orders,
    userDetails: state.secondReducer.userDetails,
    showModalAfterOrder: state.firstReducer.showModalAfterOrder,
    totalPrice: state.firstReducer.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    customerOrder: orders => dispatch(actions.customerOrder(orders)),
    closeModal: () => dispatch(actions.closeModal())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart)
