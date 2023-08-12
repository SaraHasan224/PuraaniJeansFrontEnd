import { apiService } from '../middlewares/apiservice';
import { CLOSET_CONSTANTS } from '../actionTypes';
import { CONSTANTS, HELPER } from '../../utils';
import { ALERT_ACTIONS } from './alertActions';


export const CLOSET_ACTIONS = {
	GET_CLOSET_DETAILS,
	CREATE_CLOSET,
	CLOSET_UPDATE_SETTINGS,
	GET_CLOSET_CATEGORY_DETAILS,
	CLOSET_ASSETS_UPLOAD,
	GET_CLOSET_PRODUCTS_PAGINATED_DATA
}

function CREATE_CLOSET(data) {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.createYourCloset(data)
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
		return { type: CLOSET_CONSTANTS.CREATE.REQUEST }
	}
	function success(response) {
		return {
			type: CLOSET_CONSTANTS.CREATE.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: CLOSET_CONSTANTS.CREATE.FAILURE }
	}
}

function CLOSET_UPDATE_SETTINGS(data, handle) {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.updateClosetSettings(data, handle)
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
		return { type: CLOSET_CONSTANTS.UPDATE.REQUEST }
	}
	function success(response) {
		return {
			type: CLOSET_CONSTANTS.UPDATE.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: CLOSET_CONSTANTS.UPDATE.FAILURE }
	}
}


function GET_CLOSET_CATEGORY_DETAILS(handle, category) {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getClosetCategories(handle)
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
		return { type: CLOSET_CONSTANTS.SHOW_DETAILS.REQUEST }
	}
	function success(response) {
		return {
			type: CLOSET_CONSTANTS.SHOW_DETAILS.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: CLOSET_CONSTANTS.SHOW_DETAILS.FAILURE }
	}
}


function GET_CLOSET_DETAILS(handle) {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getClosetDetail(handle)
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
		return { type: CLOSET_CONSTANTS.SHOW_DETAILS.REQUEST }
	}
	function success(response) {
		return {
			type: CLOSET_CONSTANTS.SHOW_DETAILS.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: CLOSET_CONSTANTS.SHOW_DETAILS.FAILURE }
	}
}

function CLOSET_ASSETS_UPLOAD(requestData) {
	return (dispatch) => {
		dispatch(request());
		apiService
			.uploadImage(requestData)
			.then((response) => {
				const responseStatus = response?.data?.status;
				if (
					!helper.isEmpty(responseStatus) &&
					responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS
				) {
					const dataList = response?.data?.body;
					dispatch(success(dataList));
					// window.location.reload();
				}
			})
			.catch((error) => {
				const error_response = error?.response;
				const error_message = errorAction(error_response);
				if (error_response === undefined) {
					dispatch(alertActions.error(error_message));
				}
				dispatch(failure(error_message));
			});
	};

	function request() {
		return { type: customerConstants.PROFILE_REQUEST };
	}
	function success(data) {
		return { type: customerConstants.PROFILE_SUCCESS, response: data };
	}
	function failure() {
		return { type: customerConstants.PROFILE_FAILURE };
	}
}

function GET_CLOSET_PRODUCTS_PAGINATED_DATA(handle, pageNumber) {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getClosetProductList(handle, pageNumber)
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
		return { type: CLOSET_CONSTANTS.PRODUCT_PAGINATED.REQUEST }
	}
	function success(response) {
		return {
			type: CLOSET_CONSTANTS.PRODUCT_PAGINATED.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: CLOSET_CONSTANTS.PRODUCT_PAGINATED.FAILURE }
	}
}