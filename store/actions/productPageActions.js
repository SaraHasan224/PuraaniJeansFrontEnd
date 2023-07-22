import { apiService } from '../middlewares/apiservice';
import { PRODUCTS_CONSTANTS } from '../actionTypes';
import { CONSTANTS, HELPER } from '../../utils';
import { ALERT_ACTIONS } from './alertActions';


export const PRODUCT_ACTIONS = {
	GET_CATEGORY_PRODUCT_ITEMS
}

function GET_CATEGORY_PRODUCT_ITEMS(slug) {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getCategoryItems(slug)
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