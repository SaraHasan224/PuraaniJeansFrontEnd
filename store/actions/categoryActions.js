import { apiService } from '../middlewares/apiservice';
import { PRODUCTS_CONSTANTS } from '../actionTypes';
import { CONSTANTS, HELPER } from '../../utils';
import { ALERT_ACTIONS } from './alertActions';


export const CATEGORY_ACTIONS = {
	GET_CATEGORY_DETAILS,
	GET_CATEGORY_PRODUCT_ITEMS
}


function GET_CATEGORY_DETAILS(handle) {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getCategory(handle)
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
				dispatch(ALERT_ACTIONS.error(error_message?.message))
			})
	}

	function request() {
		return { type: PRODUCTS_CONSTANTS.SHOW_DETAILS.REQUEST }
	}
	function success(response) {
		return {
			type: PRODUCTS_CONSTANTS.SHOW_DETAILS.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: PRODUCTS_CONSTANTS.SHOW_DETAILS.FAILURE }
	}
}


function GET_CATEGORY_PRODUCT_ITEMS(slug, requestData = {}) {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getCategoryItems(slug, requestData)
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
				dispatch(ALERT_ACTIONS.error(error_message?.message))
			})
	}

	function request() {
		return { type: PRODUCTS_CONSTANTS.PRODUCT_LISTING.REQUEST }
	}
	function success(response) {
		return {
			type: PRODUCTS_CONSTANTS.PRODUCT_LISTING.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: PRODUCTS_CONSTANTS.PRODUCT_LISTING.FAILURE }
	}
}