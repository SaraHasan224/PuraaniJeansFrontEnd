import { AUTH_CONSTANTS } from '../actionTypes'


const initialState = {
  authLoading: false,
	sendOTP: false,
	retryOtp: false,
  isLoggedIn: false,
  isVerified: false,
  isVerificationAttempt: false,
  isVerificationAttemptPhone: "",
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


    case AUTH_CONSTANTS.AUTH_OTP_SEND.REQUEST:
      return {
        ...state,
        authLoading: true,
      }
    case AUTH_CONSTANTS.AUTH_OTP_SEND.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        authLoading: true,
        isVerificationAttempt: true,
        isVerificationAttemptPhone: action?.response?.phone
      }
    case AUTH_CONSTANTS.AUTH_OTP_SEND.FAILURE:
      return {
        ...state,
        authLoading: false,
        isVerificationAttempt: false
      }

    case AUTH_CONSTANTS.AUTH_OTP_VERIFY.REQUEST:
      return {
        ...state,
        sendOTP: true,
        authLoading: true,
        isVerificationAttempt: true
      }
    case AUTH_CONSTANTS.AUTH_OTP_VERIFY.SUCCESS:
      return {
        ...state,
        sendOTP: false,
        isLoggedIn: true,
        authLoading: true,
        isVerified: true,
      }
    case AUTH_CONSTANTS.AUTH_OTP_VERIFY.FAILURE:
      return {
        ...state,
        sendOTP: false,
        authLoading: false,
        isVerified: false,
      }

    case AUTH_CONSTANTS.AUTH_OTP_RESEND.REQUEST:
      return {
        ...state,
        authLoading: true,
        isVerificationAttempt: true,
        retryOtp: true
      }
    case AUTH_CONSTANTS.AUTH_OTP_RESEND.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        authLoading: true,
        isVerificationAttempt: true,
        retryOtp: true,
      }
    case AUTH_CONSTANTS.AUTH_OTP_RESEND.FAILURE:
      return {
        ...state,
        authLoading: false,
        isVerificationAttempt: false,
        retryOtp: false,
      }
    default:
      return state
  }
}
export default authReducer

