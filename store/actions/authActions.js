import { useRouter } from 'next/router'
import { CONSTANTS, HELPER, LOCAL_STORAGE_SERVICE } from '../../utils'
import { AUTH_CONSTANTS } from '../actionTypes'
import { apiService } from '../middlewares/apiservice'
import { ALERT_ACTIONS } from './alertActions'


export const AUTH_ACTIONS = {
	SIGNUP_YOUR_ACCOUNT,
	SIGNIN_YOUR_ACCOUNT,
	VERIFY_YOUR_PHONE
}

function SIGNUP_YOUR_ACCOUNT(data) {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getSignupEvent(data)
			.then((response) => {
				const responseStatus = response?.data?.status
				if (!HELPER.isEmpty(responseStatus) && responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS) {
					const data = response?.data?.body
					dispatch(success(data))
				}
			})
			.catch((error) => {
				const { error_message } = HELPER.formatFailureApiResponse(error)
				dispatch(failure(error_message))
				dispatch(ALERT_ACTIONS.error(error_message?.message))
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
					dispatch(success(data))
					LOCAL_STORAGE_SERVICE._saveToLocalStorage("access_token", response?.token);
				}
			})
			.catch((error) => {
				console.log("error: ",error)
				const { error_message } = HELPER.formatFailureApiResponse(error)
				dispatch(failure(error_message))
				dispatch(ALERT_ACTIONS.error(error_message?.message))
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
					LOCAL_STORAGE_SERVICE._saveToLocalStorage("access_token", response?.token);
				}
			})
			.catch((error) => {
				console.log("error: ",error)
				const { error_message } = HELPER.formatFailureApiResponse(error)
				dispatch(failure(error_message))
				dispatch(ALERT_ACTIONS.error(error_message?.message))
			})
	}

	function request() {
		return { type: AUTH_CONSTANTS.AUTH_PHONE_VERIFY.REQUEST }
	}
	function success(response) {
		return {
			type: AUTH_CONSTANTS.AUTH_PHONE_VERIFY.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: AUTH_CONSTANTS.AUTH_PHONE_VERIFY.FAILURE }
	}
}