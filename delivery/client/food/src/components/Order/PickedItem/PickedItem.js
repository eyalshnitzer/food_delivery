import React from 'react'
import styles from './PickedItem.css'
import { withRouter, Route } from 'react-router-dom'
import Options from './Options'
import * as actions from '../../../Store/index'
import { connect } from 'react-redux'

class PickedItem extends React.Component {
  state = {
    showModal: false,
    userPickedAllAlert: '',
    totalPrice: 0,
    prices: {
      tea: 5,
      shake: 10,
      coffee: 9
    },

    menu: [
      {
        name: 'Tea',
        options: {
          Flavour: [
            'Hibiscus',
            'Mint',
            'Apple',
            'Bluberry',
            'Chai',
            'Chamomile',
            'Ginger',
            'Lemongrass'
          ],
          Size: ['Big', 'Medium', 'Small']
        },
        price: 5,
        boughtItemDetails: {
          Flavour: '',
          Size: ''
        }
      },
      {
        name: 'Coffee',
        options: {
          Cream: ['Without', 'Regular', "A'lot"],
          Espresso: ['Light', 'Regular', 'Strong'],
          Milk: ['Regular', 'Soy', 'Almonds', 'Rice'],
          Size: ['Big', 'Medium', 'Small']
        },
        price: 7
      },
      {
        name: 'Shake',
        options: {
          Cream: ['Yes', 'No'],
          Flavour: ['Strawberry', 'Banana', 'Vanilla', 'Choclate', 'Mango'],
          Size: ['Big', 'Medium', 'Small']
        },
        price: 9
      },
      {
        name: 'Sandwich',
        options: {
          Bread: ['White Bread', 'Whole Wheat', 'Bagel'],
          Inside: [
            'Sausage',
            'Avocado',
            'Mozzarella',
            'Omelet',
            'Chicken',
            'Tuna'
          ],
          Size: ['Half', 'Whole']
        },
        price: 11
      }
    ]
  }

  componentDidMount = () => {
    this.props.disableAddToOrderButton()
  }

  HandleAddToOrder = name => {
    this.props.history.push('/order_summary')
  }

  goBack = () => {
    this.props.history.push('/menu')
  }

  HandleChosenWay = (way, id) => {
    console.log(way, '   ', id)
  }

  render () {
    let picked = this.state.menu.filter(
      item => item.name === this.props.chosenItem
    )
    // all kinds of items
    const option = picked.map(item => {
      // kinds of options
      return item.options
    })

    return (
      <div>
        <div className={styles.Title}> {this.props.chosenItem} </div>
        {Object.keys(option).map(function (key) {
          return <Options id={key} arr={option[key]} />
        })}
        <div className={styles.buttonsAndPrice}>
          <button className={styles.button} onClick={this.goBack}>
            Cancel
          </button>

          <button
            className={
              this.props.enableAddToOrder
                ? styles.button
                : styles.buttonDisabled
            }
            disabled={!this.props.enableAddToOrder}
            onClick={() => this.HandleAddToOrder(this.props.chosenItem)}
          >
            Continue
          </button>

          <div> {'Price: $' + this.props.currentPrice}</div>
        </div>
      </div>
    )
  }
}

const MapStateToProps = state => {
  return {
    enableAddToOrder: state.firstReducer.enableAddToOrder,
    chosenItem: state.firstReducer.chosenItem,
    currentPrice: state.firstReducer.currentPrice,
    currentItemToBuy: state.firstReducer.boughtItemDetails[state.chosenItem]
  }
}

const MapDispatchToProps = dispatch => {
  return {
    checkAllPicked: name => dispatch(actions.checkAllPicked(name)),
    disableAddToOrderButton: () => dispatch(actions.disableAddToOrderButton())
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withRouter(PickedItem))
