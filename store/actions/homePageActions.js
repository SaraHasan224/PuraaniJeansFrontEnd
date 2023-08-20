import { apiService } from '../middlewares/apiservice';
import { HOME_CONSTANTS } from '../actionTypes';
import { CONSTANTS, HELPER } from '../../utils';


export const HOMEPAGE_ACTIONS = {
	GET_HOMEPAGE_APP_METADATA,
	FETCH_HOMEPAGE_APP_METADATA,
	GET_HOMEPAGE_CONTENTS,
	GET_MEGA_MENU_CONTENTS,
	GET_FEATURED_ITEMS
}

function GET_HOMEPAGE_APP_METADATA() {
	return apiService
		.getApplicationMetaData()
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error;
		})
}

function FETCH_HOMEPAGE_APP_METADATA() {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getApplicationMetaData()
			.then((response) => {
				const responseStatus = response?.data?.status
				if (!HELPER.isEmpty(responseStatus) && responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS) {
					const data = response?.data?.body
					dispatch(success(data))
				}
			})
			.catch((error) => {
				const { error_message } = HELPER.formatFailureApiResponse(error)
				dispatch(failure(error_message?.message))
				// dispatch(ALERT_ACTIONS.error(error_message?.message))
			})
	}
	function request() {
		return { type: HOME_CONSTANTS.HOMEPAGE_META.REQUEST }
	}
	function success(response) {
		return {
			type: HOME_CONSTANTS.HOMEPAGE_META.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: HOME_CONSTANTS.HOMEPAGE_META.FAILURE }
	}
}

function GET_HOMEPAGE_CONTENTS() {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getHomePage()
			.then((response) => {
				const responseStatus = response?.data?.status
				if (!HELPER.isEmpty(responseStatus) && responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS) {
					const data = response?.data?.body
					dispatch(success(data))
				}
			})
			.catch((error) => {
				const { error_message } = HELPER.formatFailureApiResponse(error)
				dispatch(failure(error_message?.message))
				// dispatch(ALERT_ACTIONS.error(error_message?.message))
			})
	}

	function request() {
		return { type: HOME_CONSTANTS.HOMEPAGE.REQUEST }
	}
	function success(response) {
		return {
			type: HOME_CONSTANTS.HOMEPAGE.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: HOME_CONSTANTS.HOMEPAGE.FAILURE }
	}
}

function GET_MEGA_MENU_CONTENTS() {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getMegaMenu()
			.then((response) => {
				const responseStatus = response?.data?.status
				if (!HELPER.isEmpty(responseStatus) && responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS) {
					const data = response?.data?.body
					dispatch(success(data))
				}
			})
			.catch((error) => {
				const { error_message } = HELPER.formatFailureApiResponse(error)
				dispatch(failure(error_message?.message))
				// dispatch(ALERT_ACTIONS.error(error_message?.message))
			})
	}

	function request() {
		return { type: HOME_CONSTANTS.MEGA_MENU.REQUEST }
	}
	function success(response) {
		return {
			type: HOME_CONSTANTS.MEGA_MENU.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: HOME_CONSTANTS.MEGA_MENU.FAILURE }
	}
}


function GET_FEATURED_ITEMS() {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getFeaturedItems()
			.then((response) => {
				const responseStatus = response?.data?.status
				if (!HELPER.isEmpty(responseStatus) && responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS) {
					const data = response?.data?.body
					dispatch(success(data))
				}
			})
			.catch((error) => {
				const { error_message } = HELPER.formatFailureApiResponse(error)
				dispatch(failure(error_message?.message))
				// dispatch(ALERT_ACTIONS.error(error_message?.message))
			})
	}

	function request() {
		return { type: HOME_CONSTANTS.FEATURED_ITEMS.REQUEST }
	}
	function success(response) {
		return {
			type: HOME_CONSTANTS.FEATURED_ITEMS.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: HOME_CONSTANTS.FEATURED_ITEMS.FAILURE }
	}
}