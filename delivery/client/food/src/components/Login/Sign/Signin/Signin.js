import React from 'react'
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import styles from './Signin.css'
import { withRouter, Route, Redirect } from 'react-router-dom'
import Menu from '../../../Order/Menu'
import Spinner from '../../../../UI/Spinner/Spinner'
import * as actions from '../../../../Store/index'
import { connect } from 'react-redux'

class SignIn extends React.Component {
  state = {
    signUpForm: {
      first_name: {
        id: 'first_name',
        elementType: 'text',
        placeHolder: 'First Name',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      last_name: {
        id: 'last_name',
        elementType: 'text',
        placeHolder: 'Last Name',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        id: 'email',
        elementType: 'text',
        placeHolder: 'Email',
        value: '',
        validation: {
          required: true,
          checkIfItIsMail: true
        },
        valid: false,
        touched: false
      },
      address: {
        id: 'address',
        elementType: 'text',
        placeHolder: 'Address',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      password: {
        id: 'password',
        elementType: 'password',
        placeHolder: 'Password',
        value: '',
        validation: {
          required: true,
          minLength: 4
        },
        valid: false,
        touched: false
      },
      confirm_password: {
        id: 'confirm_password',
        elementType: 'password',
        placeHolder: 'Confirm Password',
        value: '',
        validation: {
          required: true,
          minLength: 4
        },
        valid: false,
        touched: false
      }
    },
    userDetails: {
      email: '',
      password: ''
    },
    loading: false,
    userAlert: '',
    signInForm: {
      email: {
        id: 'email',
        elementType: 'text',
        placeHolder: 'Email',
        value: '',
        validation: {
          required: true,
          checkIfItIsMail: true
        },
        valid: false,
        touched: false
      },
      password: {
        id: 'password',
        elementType: 'password',
        placeHolder: 'Password ',
        value: '',
        validation: {
          required: true,
          minLength: 4
        },
        valid: false,
        touched: false
      }
    }
  }

  checkValidity = (value, rules) => {
    let isValid = true
    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.checkIfItIsMail) {
      isValid = value.includes('@')
    }
    return isValid
  }
  onChangeClickedHandler = evt => {
    let idField = evt.target.id
    let tmpUserDetails = { ...this.state.userDetails }
    tmpUserDetails[idField] = evt.target.value
    this.setState({ userDetails: tmpUserDetails })

    const updatedSignInForm = { ...this.state.signInForm }
    const updatedSignInItem = { ...updatedSignInForm[evt.target.id] }
    updatedSignInItem.value = evt.target.value
    updatedSignInItem.valid = this.checkValidity(
      updatedSignInItem.value,
      updatedSignInItem.validation
    )
    updatedSignInItem.touched = true
    updatedSignInForm[evt.target.id] = updatedSignInItem
    this.setState({ signInForm: updatedSignInForm })
  }

  onChangeSignUpClickedHandler = evt => {
    this.props.updateFields(evt.currentTarget.id, evt.currentTarget.value)

    const updatedSignUpForm = { ...this.state.signUpForm }
    const updatedSignUpItem = { ...updatedSignUpForm[evt.target.id] }
    updatedSignUpItem.value = evt.target.value
    updatedSignUpItem.valid = this.checkValidity(
      updatedSignUpItem.value,
      updatedSignUpItem.validation
    )
    updatedSignUpItem.touched = true
    updatedSignUpForm[evt.target.id] = updatedSignUpItem

    this.setState({ signUpForm: updatedSignUpForm })
  }

  signInClickedHandler = () => {
    this.props.loginUser(
      this.state.userDetails.email,
      this.state.userDetails.password
    )
  }

  signUpClicked = () => {
    this.props.signUpUser(this.props.form)
  }
  render () {
    const redirect = this.props.redirectFromUserToMenu ? (
      <Redirect to='/welcome' />
    ) : null

    let show = (
      <div className={styles.InputArea}>
        {Object.keys(this.state.signInForm).map(item => {
          return (
            <div>
              <Input
                elementType={this.state.signInForm[item].elementType}
                placeHolder={this.state.signInForm[item].placeHolder}
                changed={evt => this.onChangeClickedHandler(evt)}
                value={this.state.signInForm[item].value}
                id={this.state.signInForm[item].id}
                touched={this.state.signInForm[item].touched}
                inValid={!this.state.signInForm[item].valid}
                inputWidth={'470px'}
              />
            </div>
          )
        })}
        <div>
          <Button
            clicked={this.signInClickedHandler}
            ButtonWidth={'ButtonWidth'}
            btnType={'Ok'}
          >
            Sign In
          </Button>
        </div>
        <div className={styles.UserAlert}>
          <label> {this.props.userAlert} </label>
        </div>
      </div>
    )
    let show1 = (
      <div>
        {Object.keys(this.state.signUpForm).map(item => {
          return (
            <div>
              <Input
                elementType={this.state.signUpForm[item].elementType}
                placeHolder={this.state.signUpForm[item].placeHolder}
                changed={evt => this.onChangeSignUpClickedHandler(evt)}
                value={this.state.signUpForm[item].value}
                id={this.state.signUpForm[item].id}
                touched={this.state.signUpForm[item].touched}
                inValid={!this.state.signUpForm[item].valid}
                inputWidth={'470px'}
              />
            </div>
          )
        })}
        <div>
          <Button
            clicked={this.signUpClicked}
            style={styles.Ok}
            ButtonWidth={'ButtonWidth'}
            btnType={'Ok'}
          >
            Sign Up
          </Button>
          <div className={styles.UserAlert}>
            <label> {this.props.userAlert} </label>
          </div>
        </div>
        <Route path='/menu' Component={Menu} />
      </div>
    )
    if (this.props.loading) show = <Spinner />

    return (
      <div>
        {redirect}
        {this.props.showSignInOrUp ? show : show1}
        <Route path='/menu' component={Menu} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.secondReducer.loading,
    userAlert: state.secondReducer.userAlert,
    redirectFromUserToMenu: state.secondReducer.redirectFromUserToMenu,
    showSignInOrUp: state.secondReducer.showSignInOrUp,
    form: state.secondReducer.form
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (email, password) =>
      dispatch(actions.loginUser(email, password)),
    updateFields: (id, value) => dispatch(actions.updateFields(id, value)),
    signUpUser: form => dispatch(actions.signUpUser(form))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignIn))
