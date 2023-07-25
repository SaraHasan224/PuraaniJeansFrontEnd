import { apiService } from '../middlewares/apiservice';
import { CLOSET_CONSTANTS } from '../actionTypes';
import { CONSTANTS, HELPER } from '../../utils';
import { ALERT_ACTIONS } from './alertActions';


export const CLOSET_ACTIONS = {
	GET_CLOSET,
}


function GET_CLOSET(handle) {
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
		return { type: CLOSET_CONSTANTS.CLOSET.REQUEST }
	}
	function success(response) {
		return {
			type: CLOSET_CONSTANTS.CLOSET.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: CLOSET_CONSTANTS.CLOSET.FAILURE }
	}
}