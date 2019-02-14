import React from 'react'
import styles from './navigationItems.css'
import NavigationItem from '../NavigationItem/navigationItem'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class NavigationItems extends React.Component {
  render () {
    return (
      <div className={styles.NavigationItemsDivs}>
        <div className={styles.NavigationItems}>
          <NavigationItem link='/menu'> Menu </NavigationItem>
          <NavigationItem link='/orders_history'>Orders History</NavigationItem>
          <NavigationItem link='/shopping_cart'>Shopping Cart</NavigationItem>

          <div
            className={styles.nameAndButton}
            style={
              this.props.isUserOnline
                ? { display: 'inline' }
                : { display: 'none' }
            }
          >
            <div className={styles.name}>{this.props.userOnlineEmail}</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isUserOnline: state.secondReducer.isUserOnline,
    userOnlineEmail: state.secondReducer.userOnlineEmail
  }
}

export default connect(mapStateToProps)(withRouter(NavigationItems))
