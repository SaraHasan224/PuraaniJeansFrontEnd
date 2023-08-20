import { apiService } from '../middlewares/apiservice';
import { PRODUCTS_CONSTANTS } from '../actionTypes';
import { CONSTANTS, HELPER } from '../../utils';
import { ALERT_ACTIONS } from './alertActions';


export const PRODUCT_ACTIONS = {
	ADD_NEW_PRODUCT_META,
	ADD_NEW_PRODUCT_DATA,
	ADD_NEW_PRODUCT,
	GET_PRODUCT_DETAIL,
	GET_RECENTLY_VIEWED_PRODUCT,
	GET_ALL_PRODUCT_LIST
}

function ADD_NEW_PRODUCT_META() {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getAddItemMetaData()
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
		return { type: PRODUCTS_CONSTANTS.PRODUCT_METADATA.REQUEST }
	}
	function success(response) {
		return {
			type: PRODUCTS_CONSTANTS.PRODUCT_METADATA.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: PRODUCTS_CONSTANTS.PRODUCT_METADATA.FAILURE }
	}
}

function ADD_NEW_PRODUCT_DATA(step, type, data) {
	return (dispatch, getState) => {
		dispatch(request(type, data, step))
	}
	function request(action, response, step) {
		return { type: PRODUCTS_CONSTANTS.PRODUCT_DATA_ADDED, action, response, activeStep: step }
	}
};

function ADD_NEW_PRODUCT(requestData) {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.addItemToCloset(requestData)
			.then((response) => {
				const responseStatus = response?.data?.status
				if (!HELPER.isEmpty(responseStatus) && responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS) {
					const data = response?.data?.body
					dispatch(success(data, CONSTANTS.ERROR_TYPE.TOAST))
				}
			})
			.catch((error) => {
				const { error_message } = HELPER.formatFailureApiResponse(error)
				dispatch(failure(error_message?.message))
				dispatch(ALERT_ACTIONS.error(error_message?.message, CONSTANTS.ERROR_TYPE.TOAST))
			})
	}

	function request() {
		return { type: PRODUCTS_CONSTANTS.ADD_NEW_PRODUCT.REQUEST }
	}
	function success(response) {
		return {
			type: PRODUCTS_CONSTANTS.ADD_NEW_PRODUCT.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: PRODUCTS_CONSTANTS.ADD_NEW_PRODUCT.FAILURE }
	}
}

function GET_ALL_PRODUCT_LIST() {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getAllItems()
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

function GET_PRODUCT_DETAIL(handle) {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getProductDetail(handle)
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
		return { type: PRODUCTS_CONSTANTS.PRODUCT_DETAIL.REQUEST }
	}
	function success(response) {
		return {
			type: PRODUCTS_CONSTANTS.PRODUCT_DETAIL.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: PRODUCTS_CONSTANTS.PRODUCT_DETAIL.FAILURE }
	}
}

function GET_RECENTLY_VIEWED_PRODUCT() {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getRecentlyViewed()
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
		return { type: PRODUCTS_CONSTANTS.RECENTLY_VIEWED.REQUEST }
	}
	function success(response) {
		return {
			type: PRODUCTS_CONSTANTS.RECENTLY_VIEWED.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: PRODUCTS_CONSTANTS.RECENTLY_VIEWED.FAILURE }
	}
}