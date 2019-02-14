import React from 'react'
import styles from './ToolBar.css'
import NavigationItems from './Navigation/NavigationItems/navigationItems'
import Logo from './Logo/Logo'
import { connect } from 'react-redux'

class ToolBar extends React.Component {
  render () {
    return (
      <header className={styles.ToolBar}>
        <Logo />

        <div>
          <nav>
            <NavigationItems clicked={this.props.clicked} />
          </nav>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => {
  return {
    isUserOnline: state.secondReducer.isUserOnline,
    userOnlineName: state.secondReducer.userOnlineName
  }
}

export default connect(mapStateToProps)(ToolBar)
