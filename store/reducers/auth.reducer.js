import { AUTH_CONSTANTS } from '../actionTypes'


const initialState = {
  authLoading: false,
  isLoggedIn: false,
  isVerified: false,
  isLoggedInCustomer: []
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
    case AUTH_CONSTANTS.AUTH_SIGNUP.REQUEST:
      return {
        ...state,
        authLoading: true,
      }
    case AUTH_CONSTANTS.AUTH_SIGNUP.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        authLoading: false,
        isLoggedInCustomer: action?.response?.customer,
      }
    case AUTH_CONSTANTS.AUTH_SIGNUP.FAILURE:
      return {
        ...state,
        authLoading: false,
      }

      case AUTH_CONSTANTS.AUTH_SIGNIN.REQUEST:
        return {
          ...state,
          authLoading: true,
        }
      case AUTH_CONSTANTS.AUTH_SIGNIN.SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          authLoading: true,
          isLoggedInCustomer: action?.response?.customer,
        }
      case AUTH_CONSTANTS.AUTH_SIGNIN.FAILURE:
        return {
          ...state,
          authLoading: false,
        }

      
    case AUTH_CONSTANTS.AUTH_PHONE_VERIFY.REQUEST:
      return {
        ...state,
        authLoading: true,
      }
    case AUTH_CONSTANTS.AUTH_PHONE_VERIFY.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        authLoading: true,
      }
    case AUTH_CONSTANTS.AUTH_PHONE_VERIFY.FAILURE:
      return {
        ...state,
        authLoading: false,
      }
      case AUTH_CONSTANTS.AUTH_OTP_VERIFY.REQUEST:
        return {
          ...state,
          authLoading: true,
        }
      case AUTH_CONSTANTS.AUTH_OTP_VERIFY.SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          authLoading: true,
        }
      case AUTH_CONSTANTS.AUTH_OTP_VERIFY.FAILURE:
        return {
          ...state,
          authLoading: false,
        }
		default:
			return state
	}
}
export default authReducer

