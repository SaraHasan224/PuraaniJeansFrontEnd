import { useRouter } from 'next/router'
import { CONSTANTS, COOKIE_STORAGE_SERVICE, HELPER, LOCAL_STORAGE_SERVICE } from '../../utils'
import { AUTH_CONSTANTS } from '../actionTypes'
import { apiService } from '../middlewares/apiservice'
import { ALERT_ACTIONS } from './alertActions'


export const AUTH_ACTIONS = {
	SIGNUP_YOUR_ACCOUNT,
	SIGNIN_YOUR_ACCOUNT,
	VERIFY_YOUR_PHONE,
	VERIFY_PHONE_OTP,
	RESEND_PHONE_OTP
}

function SIGNUP_YOUR_ACCOUNT(requestData) {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getSignupEvent(requestData)
			.then((response) => {
				const responseStatus = response?.data?.status
				if (!HELPER.isEmpty(responseStatus) && responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS) {
					const data = response?.data?.body
					COOKIE_STORAGE_SERVICE._updateAccessToken(response?.data?.body?.token);
					LOCAL_STORAGE_SERVICE._saveToLocalStorage("user_info", data?.customer);
					dispatch(success(data))
				}
			})
			.catch((error) => {
				const { errorResponse, error_message, errorBody } = HELPER.formatFailureApiResponse(error)
				dispatch(failure(error_message))
				if(errorResponse === CONSTANTS.HTTP_RESPONSE.INPROCESSIBLE) {
					dispatch(ALERT_ACTIONS.warning(error_message?.message, errorBody))
				}else  {
					dispatch(ALERT_ACTIONS.error(error_message?.message))
				}
			})
	}

	function request() {
		return { type: AUTH_CONSTANTS.AUTH_SIGNUP.REQUEST }
	}
	function success(response) {
		return {
			type: AUTH_CONSTANTS.AUTH_SIGNUP.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: AUTH_CONSTANTS.AUTH_SIGNUP.FAILURE }
	}
}


function SIGNIN_YOUR_ACCOUNT(data) {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getSignInEvent(data)
			.then((response) => {
				const responseStatus = response?.data?.status
				if (!HELPER.isEmpty(responseStatus) && responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS) {
					const data = response?.data?.body
					COOKIE_STORAGE_SERVICE._updateAccessToken(data?.token);
					LOCAL_STORAGE_SERVICE._saveToLocalStorage("user_info", data?.customer);
					dispatch(success(data))
				}
			})
			.catch((error) => {
				const { errorResponse, error_message, errorBody } = HELPER.formatFailureApiResponse(error)
				dispatch(failure(error_message))
				if(errorResponse === CONSTANTS.HTTP_RESPONSE.INPROCESSIBLE) {
					dispatch(ALERT_ACTIONS.warning(error_message?.message,errorBody))
				}else  {
					dispatch(ALERT_ACTIONS.error(error_message?.message))
				}
			})
	}

	function request() {
		return { type: AUTH_CONSTANTS.AUTH_SIGNIN.REQUEST }
	}
	function success(response) {
		return {
			type: AUTH_CONSTANTS.AUTH_SIGNIN.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: AUTH_CONSTANTS.AUTH_SIGNIN.FAILURE }
	}
}


function VERIFY_YOUR_PHONE(data) {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getPhoneVerification(data)
			.then((response) => {
				const responseStatus = response?.data?.status
				if (!HELPER.isEmpty(responseStatus) && responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS) {
					const data = response?.data?.body
					dispatch(success(data))
				}
			})
			.catch((error) => {
				const { errorResponse, error_message, errorBody } = HELPER.formatFailureApiResponse(error)
				dispatch(failure(error_message))
				if(errorResponse === CONSTANTS.HTTP_RESPONSE.INPROCESSIBLE) {
					dispatch(ALERT_ACTIONS.warning(error_message?.message,errorBody))
				}else  {
					dispatch(ALERT_ACTIONS.error(error_message?.message))
				}
			})
	}

	function request() {
		return { type: AUTH_CONSTANTS.AUTH_OTP_SEND.REQUEST }
	}
	function success(response) {
		return {
			type: AUTH_CONSTANTS.AUTH_OTP_SEND.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: AUTH_CONSTANTS.AUTH_OTP_SEND.FAILURE }
	}
}

function VERIFY_PHONE_OTP(data) {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getPhoneOtpVerify({
				otp: data
			})
			.then((response) => {
				const responseStatus = response?.data?.status
				if (!HELPER.isEmpty(responseStatus) && responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS) {
					const data = response?.data?.body
					COOKIE_STORAGE_SERVICE._updateAccessToken(data?.token);
					LOCAL_STORAGE_SERVICE._saveToLocalStorage("access_token_verified", CONSTANTS.YES);
					dispatch(success(data))
				}
			})
			.catch((error) => {
				const { errorResponse, error_message, errorBody } = HELPER.formatFailureApiResponse(error)
				dispatch(failure(error_message))
				if(errorResponse === CONSTANTS.HTTP_RESPONSE.INPROCESSIBLE) {
					dispatch(ALERT_ACTIONS.warning(error_message?.message,errorBody))
				}else  {
					dispatch(ALERT_ACTIONS.error(error_message?.message))
				}
			})
	}

	function request() {
		return { type: AUTH_CONSTANTS.AUTH_OTP_VERIFY.REQUEST }
	}
	function success(response) {
		return {
			type: AUTH_CONSTANTS.AUTH_OTP_VERIFY.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: AUTH_CONSTANTS.AUTH_OTP_VERIFY.FAILURE }
	}
}

function RESEND_PHONE_OTP(data) {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getPhoneOtpReSend(data)
			.then((response) => {
				const responseStatus = response?.data?.status
				if (!HELPER.isEmpty(responseStatus) && responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS) {
					const data = response?.data?.body
					dispatch(success(data))
				}
			})
			.catch((error) => {
				const { errorResponse, error_message, errorBody } = HELPER.formatFailureApiResponse(error)
				dispatch(failure(error_message))
				if(errorResponse === CONSTANTS.HTTP_RESPONSE.INPROCESSIBLE) {
					dispatch(ALERT_ACTIONS.warning(error_message?.message,errorBody))
				}else  {
					dispatch(ALERT_ACTIONS.error(error_message?.message))
				}
			})
	}

	function request() {
		return { type: AUTH_CONSTANTS.AUTH_OTP_RESEND.REQUEST }
	}
	function success(response) {
		return {
			type: AUTH_CONSTANTS.AUTH_OTP_RESEND.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: AUTH_CONSTANTS.AUTH_OTP_RESEND.FAILURE }
	}
}
