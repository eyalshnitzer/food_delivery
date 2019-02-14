import * as actionTypes from './actionTypes'

const initialState = {
  userAlert: '',
  form: {
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    password: '',
    confirm_password: ''
  },
  loading: false,

  isUserOnline: false,
  userOnlineEmail: '',
  redirectFromUserToMenu: false,

  userDetails: '',
  showSignInOrUp: true
}

const secondReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SHOW_SIGN_IN_OR_UP:
      const show = action.name
      let answer
      if (show === 'up') answer = false
      else answer = true
      return {
        ...state,
        showSignInOrUp: answer
      }
    case actionTypes.SIGN_UP_START:
      return {
        ...state,
        loading: true,
        userAlert: ''
      }
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        redirectFromUserToMenu: true,
        userOnlineEmail: state.form.email,
        isUserOnline: true
      }
    case actionTypes.SIGN_UP_ALLREADY_MEMBER:
      return {
        ...state,
        loading: false,
        userAlert: 'There is Allready A User With This Email'
      }
    case actionTypes.SIGN_UP_FAILS:
      return {
        ...state,
        loading: false
      }

    case actionTypes.UPDATE_FIELDS:
      return {
        ...state,
        form: {
          ...state.form,
          [action.id]: action.value
        }
      }
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
        userAlert: ''
      }
    case actionTypes.WRONG_DETAILS:
      let userAlert = 'Wrong Email or Password'
      return {
        ...state,
        loading: false,
        userAlert: userAlert
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isUserOnline: true,
        userOnlineEmail: action.data[0].email,
        redirectFromUserToMenu: true,
        userDetails: action.data[0]
      }
    case actionTypes.LOGIN_FAILS:
      return {
        ...state,
        loading: false
      }
    case actionTypes.DISABLE_REDIRECT:
      return {
        ...state,
        redirectfromUserToMenu: false
      }

    default: {
      return {
        ...state
      }
    }
  }
}

export default secondReducer
