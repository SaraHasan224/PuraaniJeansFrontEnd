import { AUTH_CONSTANTS, CLOSET_CONSTANTS, CUSTOMER_CONSTANTS, RESET_DETAILS } from '../actionTypes'


const initialState = {
  authLoading: false,
  sendOTP: false,
  retryOtp: false,
  isLoggedIn: false,
  isVerified: false,
  isVerificationAttempt: false,
  isVerificationAttemptPhone: "",
  isLoggedInCustomer: [],
  customerRef: "",
  closetRef: "",
  customerMetaRequested: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DETAILS:
      return initialState;
    case CUSTOMER_CONSTANTS.META.REQUEST:
      return {
        ...state,
        customerMetaRequested: false,
      }
    case CUSTOMER_CONSTANTS.META.SUCCESS:
      return {
        ...state,
        customerMetaRequested: true,
        closetRef: action?.response?.customer?.closet?.closet_ref,
        isLoggedInCustomer: action?.response?.customer,
      }
    case CUSTOMER_CONSTANTS.META.FAILURE:
      return {
        ...state,
        customerMetaRequested: false,
      }

    case AUTH_CONSTANTS.AUTH_SIGNIN.REQUEST:
      return {
        ...state,
        authLoading: true,
        isLoggedIn: false,
      }

    case AUTH_CONSTANTS.AUTH_SIGNUP.REQUEST:
      return {
        ...state,
        authLoading: true,
        isLoggedIn: false,
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
        isLoggedIn: false,
      }
    case AUTH_CONSTANTS.AUTH_SIGNIN.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        authLoading: true,
        isLoggedInCustomer: action?.response?.customer,
        isLoggedInCustomerScreen: action?.response?.screen,
        customerRef: action?.response?.customer?.identifier,
        closetRef: action?.response?.customer?.closet_ref
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
        authLoading: true,
        isVerified: true,
        isLoggedInCustomer: action?.response?.customer,
        customerRef: action?.response?.customer?.identifier,
        closetRef: action?.response?.customer?.closet_ref
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
    case CLOSET_CONSTANTS.CREATE.SUCCESS:
      return {
        ...state,
        closetRef: action?.response?.closet_ref
      }
    default:
      return state
  }
}
export default authReducer

