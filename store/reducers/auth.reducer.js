import { AUTH_CONSTANTS } from '../actionTypes'


const initialState = {
  isLoggedProcessing: false,
  isPhoneVerifyProcessing: false,
  isLoggedIn: false,
  isLoggedInCustomer: []
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
    case AUTH_CONSTANTS.AUTH_SIGNUP.REQUEST:
      return {
        ...state,
        isLoggedProcessing: true,
      }
    case AUTH_CONSTANTS.AUTH_SIGNUP.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoggedProcessing: true,
        isLoggedInCustomer: action?.response?.customer,
      }
    case AUTH_CONSTANTS.AUTH_SIGNUP.FAILURE:
      return {
        ...state,
        isLoggedProcessing: false,
      }

      
    case AUTH_CONSTANTS.AUTH_PHONE_VERIFY.REQUEST:
      return {
        ...state,
        isPhoneVerifyProcessing: true,
      }
    case AUTH_CONSTANTS.AUTH_PHONE_VERIFY.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isPhoneVerifyProcessing: true,
      }
    case AUTH_CONSTANTS.AUTH_PHONE_VERIFY.FAILURE:
      return {
        ...state,
        isPhoneVerifyProcessing: false,
      }
		default:
			return state
	}
}
export default authReducer

