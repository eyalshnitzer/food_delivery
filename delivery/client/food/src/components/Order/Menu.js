import React from 'react'
import styles from './Menu.css'
import * as actions from '../../Store/index'
import { connect } from 'react-redux'
import MenuItems from './MenuItems'

class Menu extends React.Component {
  componentWillMount = () => {
    this.props.disableRedirect()
  }
  state = {
    menu: [
      {
        name: 'Tea',
        options: {
          Flavour: ['Earl Grey', 'Mint', 'Louisa'],
          Size: ['Big', 'Medium', 'Small']
        },
        price: 5
      },
      {
        name: 'Coffee',
        options: {
          Size: ['Big', 'Medium', 'Small'],
          Cream: ['without', "A'lot", 'Regular'],
          Espresso: ['Light', 'Regular', 'Strong']
        },
        price: 7
      },
      {
        name: 'Shake',
        options: {
          Size: ['Big', 'Medium', 'Small'],
          Cream: ['Yes', 'No'],
          Flavour: ['Strawberry', 'Banana', 'hjhjjhj', 'Choclate', 'Mango']
        },
        price: 9
      },
      {
        name: 'Sandwich',
        options: {
          Bread: ['White Bread', 'Whole Wheat', 'Bagel'],
          Size: ['Half', 'Whole']
        },
        price: 11
      }
    ]
  }

  clickedHandler = itemName => {
    this.props.onUpdateChosenItem(itemName)
    this.props.history.push('/picked_item')
  }
  render () {
    return (
      <div className={styles.Menu}>
        <MenuItems menu={this.state.menu} clicked={this.clickedHandler} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    chosenItem: state.firstReducer.chosenItem
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateChosenItem: name => dispatch(actions.onUpdateChosenItem(name)),
    /* onBackDropClicked: () => dispatch(actions.closingModal()), */
    disableRedirect: () => dispatch(actions.disableRedirect())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
