import * as actionTypes from './actionTypes'

// login

export const changeShowSignInOrUp = name => {
  return {
    type: actionTypes.CHANGE_SHOW_SIGN_IN_OR_UP,
    name: name
  }
}

export const loginSuccess = data => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    data: data
  }
}

export const loginFails = error => {
  return {
    type: actionTypes.LOGIN_FAILS,
    error: error
  }
}

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  }
}

export const wrongDetails = () => {
  return {
    type: actionTypes.WRONG_DETAILS
  }
}

export const disableRedirect = () => {
  return {
    type: actionTypes.DISABLE_REDIRECT
  }
}

export const emailToLoginSuccess = data => {
  return {
    type: actionTypes.EMAIL_TO_LOGIN_SUCCESS,
    data: data
  }
}

export const loginUser = (email, password) => {
  // async
  return dispatch => {
    dispatch(loginStart())
    fetch(`/sign_in?email=${email}&password=${password}`)
      .then(res => res.json())
      .then(answer => {
        if (answer.length === 0) {
          dispatch(wrongDetails())
        } else {
          dispatch(emailToLoginSuccess(answer))
          dispatch(loginSuccess(answer))
        }
      })
      .catch(error => {
        dispatch(loginFails(error))
      })
  }
}

// sign-up

export const updateFields = (id, value) => {
  return {
    type: actionTypes.UPDATE_FIELDS,
    id: id,
    value: value
  }
}

export const signUpStart = () => {
  return {
    type: actionTypes.SIGN_UP_START
  }
}

export const signUpSuccess = email => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
    email: email
  }
}

export const signUpFails = () => {
  return {
    type: actionTypes.SIGN_UP_FAILS
  }
}

export const signUpAllreadyMember = () => {
  return {
    type: actionTypes.SIGN_UP_ALLREADY_MEMBER
  }
}

export const emailToSignUpSuccess = email => {
  return {
    type: actionTypes.EMAIL_TO_SIGN_UP_SUCCESS,
    email: email
  }
}

export const signUpUser = form => {
  // asynch sign-up

  return dispatch => {
    dispatch(signUpStart())

    fetch('/sign_up', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.length === 0) {
          dispatch(signUpSuccess(form.email))
          dispatch(emailToSignUpSuccess(form.email))
        } else dispatch(signUpAllreadyMember())
      })
      .catch(error => {
        dispatch(signUpFails())
      })
  }
}

/* ----------------------------------------------------------------- */

// order

export const customerOrderSuccess = () => {
  return {
    type: actionTypes.CUSTOMER_ORDER_SUCCESS
  }
}

export const customerOrderFails = () => {
  return {
    type: actionTypes.CUSTOMER_ORDER_FAILS
  }
}

export const customerOrder = orders => {
  return dispatch => {
    fetch('/customer_order', {
      method: 'POST',
      body: JSON.stringify(orders),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(answer => {
        console.log(answer)
        if (answer.length !== 0) dispatch(customerOrderSuccess())
        else dispatch(customerOrderFails())
      })
  }
}
export const buyItem = order => {
  return {
    type: actionTypes.BUY_ITEM,
    order: order
  }
}
export const disableAddToOrderButton = () => {
  return {
    type: actionTypes.DISABLE_ADD_TO_ORDER_BUTTON
  }
}

export const updateWayOfServe = (way, id) => {
  return {
    type: actionTypes.UPDATE_WAY_OF_SERVE,
    _way: way,
    _id: id
  }
}

export const onUpdateChosenItem = name => {
  return {
    type: actionTypes.ON_UPDATE_CHOSEN_ITEM,
    nameOfItem: name
  }
}

export const closeModal = () => {
  return {
    type: actionTypes.CLOSE_MODAL
  }
}

export const checkAllPicked = name => {
  return {
    type: actionTypes.CHECK_ALL_PICKED,
    _name: name
  }
}

export const initiateChosenDetails = () => {
  return {
    type: actionTypes.INITIATE_CHOSEN_DETAILS
  }
}

export const storeOrdersInState = ordersArr => {
  return {
    type: actionTypes.STORE_ORDERS_IN_STATE,
    ordersArr: ordersArr
  }
}

/* ------------------------------------------------ */

// Orders History

export const getOrdersHistory = email => {
  return dispatch => {
    dispatch(startGetOrdersHistory())
    fetch(`/get_orders_history?email=${email}`)
      .then(res => res.json())
      .then(answer => {
        dispatch(storeOrdersInState(answer[0].orders))
      })
  }
}

export const startGetOrdersHistory = () => {
  return {
    type: actionTypes.START_GET_ORDERS_HISTORY
  }
}
