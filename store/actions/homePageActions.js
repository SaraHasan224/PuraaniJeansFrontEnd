import { apiService } from '../middlewares/apiservice';
import { HOME_CONSTANTS } from '../actionTypes';
import { CONSTANTS, HELPER } from '../../utils';
import { ALERT_ACTIONS } from './alertActions';


export const HOMEPAGE_ACTIONS = {
	GET_HOMEPAGE_APP_METADATA,
	GET_HOMEPAGE_CONTENTS,
	GET_FEATURED_ITEMS
}

function GET_HOMEPAGE_APP_METADATA() {
	return apiService
		.getApplicationMetaData()
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return response;
		})
}

function GET_HOMEPAGE_CONTENTS() {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getHomePage()
			.then((response) => {
				const responseStatus = response?.data?.status
				console.log("response: ", response)
				if (!HELPER.isEmpty(responseStatus) && responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS) {
					const data = response?.data?.body
					dispatch(success(data))
				}
			})
			.catch((error) => {
				console.log("error: ", error)
				// const { error_message } = HELPER.formatFailureApiResponse(error)
				// dispatch(failure(error_message?.message))
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
				console.log("error: ", error)
				const { error_message } = HELPER.formatFailureApiResponse(error)
				dispatch(failure(error_message?.message))
				dispatch(ALERT_ACTIONS.error(error_message?.message))
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