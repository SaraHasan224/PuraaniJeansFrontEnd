import { CONSTANTS, HELPER } from '../../utils'
import { CUSTOMER_CONSTANTS } from '../actionTypes'
import { apiService } from '../middlewares/apiservice'
import { ALERT_ACTIONS } from './alertActions'


export const CUSTOMER_ACTIONS = {
	FETCH_CUSTOMER_METADATA
}

function FETCH_CUSTOMER_METADATA() {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getCustomerMetaData()
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
		return { type: CUSTOMER_CONSTANTS.META.REQUEST }
	}
	function success(response) {
		return {
			type: CUSTOMER_CONSTANTS.META.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: CUSTOMER_CONSTANTS.META.FAILURE }
	}
}
