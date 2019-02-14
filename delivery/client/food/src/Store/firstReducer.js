import * as actionTypes from './actionTypes'

const initialState = {
  enableAddToOrder: false,
  showModal: false,
  boughtItemDetails: {
    Tea: {
      Flavour: '',
      Size: ''
    },
    Coffee: {
      Size: '',
      Cream: '',
      Espresso: ''
    },
    Shake: {
      Size: '',
      Cream: '',
      Flavour: ''
    },
    Sandwich: {
      Bread: '',
      Size: ''
    }
  },
  chosenItem: '',
  currentPrice: 0,
  totalPrice: 0,
  prices: {
    Tea: 3,
    Shake: 9,
    Coffee: 6,
    Sandwich: 11
  },
  priceToAdd: {
    Small: 0,
    Medium: 1,
    Big: 2,
    Half: -3,
    Whole: 0
  },
  orders: {
    email: '',
    ordersDetails: []
  },
  showModalAfterOrder: false,
  messageAfterBuy: '',
  ordersHistory: [],
  loading: false
}

const firstReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CUSTOMER_ORDER_SUCCESS:
      return {
        ...state,
        showModalAfterOrder: true,
        totalPrice: 0,
        messageAfterBuy: 'Your Order Is Being Prepared...',
        orders: {
          ...state.orders,
          ordersDetails: []
        }
      }
    case actionTypes.CUSTOMER_ORDER_FAILS:
      return {
        ...state,
        showModalAfterOrder: true,
        messageAfterBuy: 'There Is A Problem, Please Connect Again'
      }
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        showModalAfterOrder: false
      }
    case actionTypes.EMAIL_TO_LOGIN_SUCCESS:
      return {
        ...state,
        orders: {
          ...state.orders,
          email: action.data[0].email
        }
      }
    case actionTypes.EMAIL_TO_SIGN_UP_SUCCESS:
      return {
        ...state,
        orders: {
          ...state.orders,
          email: action.email
        }
      }
    case actionTypes.ADD_PRICE:
      return Object.assign({}, state, {
        totalPrice: state.totalPrice + state.prices[action.itemName]
      })

    case actionTypes.ON_UPDATE_CHOSEN_ITEM:
      return {
        ...state,
        chosenItem: action.nameOfItem,
        enableAddToOrder: false,
        boughtItemDetails: {
          ...state.boughtItemDetails
        }
      }

    case actionTypes.INITIATE_CHOSEN_DETAILS:
      const tmpo = state.boughtItemDetails[state.chosenItem]

      for (let i in tmpo) tmpo[i] = ''

      return {
        ...state,
        currentPrice: state.prices[state.chosenItem],
        boughtItemDetails: {
          ...state.boughtItemDetails,
          [state.chosenItem]: tmpo
        }
      }
    case actionTypes.UPDATE_WAY_OF_SERVE:
      let numOfPicked = 0
      let tmp = state.boughtItemDetails[state.chosenItem]
      let enableOrder = false
      let numOfOptions = 0
      let priceToUpdate = state.currentPrice
      if (action._id === 'Size') {
        priceToUpdate =
          state.prices[state.chosenItem] + state.priceToAdd[action._way]
      }

      Object.keys(tmp).map(item => {
        numOfOptions++
        if (tmp[item] !== '' || (tmp[item] === '' && item === action._id)) {
          numOfPicked++
        }
      })
      if (numOfPicked === numOfOptions) enableOrder = true
      else enableOrder = false
      return {
        ...state,
        currentPrice: priceToUpdate,
        enableAddToOrder: enableOrder,
        boughtItemDetails: {
          ...state.boughtItemDetails,
          [state.chosenItem]: {
            ...state.boughtItemDetails[state.chosenItem],
            [action._id]: action._way
          }
        }
      }
    case actionTypes.CHECK_ALL_PICKED:
      return {
        ...state
      }

    case actionTypes.DISABLE_ADD_TO_ORDER_BUTTON:
      return {
        ...state,
        enableAddToOrder: false
      }
    case actionTypes.BUY_ITEM:
      return {
        ...state,
        totalPrice: state.totalPrice + action.order.itemPrice,
        orders: {
          ...state.orders,
          ordersDetails: state.orders.ordersDetails.concat(action.order)
        }
      }
    case actionTypes.STORE_ORDERS_IN_STATE:
      return {
        ...state,
        loading: false,
        ordersHistory: action.ordersArr
      }
    case actionTypes.START_GET_ORDERS_HISTORY:
      return {
        ...state,
        loading: true
      }
    default: {
      return {
        ...state
      }
    }
  }
}

export default firstReducer
