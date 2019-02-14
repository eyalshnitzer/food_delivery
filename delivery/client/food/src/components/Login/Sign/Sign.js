import React from 'react'
import styles from './Sign.css'
import SignIn from './Signin/Signin'
import { withRouter } from 'react-router-dom'
import * as actions from '../../../Store/index'
import { connect } from 'react-redux'

class Sign extends React.Component {
  state = {
    signInClicked: true
  }

  signUpClickedHandler = () => {
    this.setState({ signInClicked: false })
    this.props.changeShowSignInOrUp('up')
  }

  signInClickedHandler = () => {
    this.setState({ signInClicked: true })

    this.props.changeShowSignInOrUp('in')
  }
  render () {
    let signClicked = {
      border: '1px solid transparent '
    }
    let signUnClicked = {
      border: '1px solid rgb(207, 206, 206)'
    }

    return (
      <div className={styles.SigninPage}>
        <div className={styles.Title}> Welcome To Food Delivery </div>
        <div className={styles.FormArea}>
          <div className={styles.FormAreaTitels}>
            <div
              onClick={this.signInClickedHandler}
              className={styles.FormAreaSigninTitle}
              style={this.state.signInClicked ? signClicked : signUnClicked}
            >
              SIGN IN
            </div>
            <div
              onClick={this.signUpClickedHandler}
              className={styles.FormAreaSignupTitle}
              style={this.state.signInClicked ? signUnClicked : signClicked}
            >
              SIGN UP
            </div>
          </div>
          <SignIn />
        </div>
      </div>
    )
  }
}

export const mapStateToProps = state => {
  return {
    showSignInOrUp: state.secondReducer.showSignInOrUp
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeShowSignInOrUp: name => dispatch(actions.changeShowSignInOrUp(name))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sign))
