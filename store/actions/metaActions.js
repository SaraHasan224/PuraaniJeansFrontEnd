import { HELPER } from '../../utils'
import { META_CONSTANTS } from '../actionTypes'
import { apiService } from '../middlewares/apiservice'
import { ALERT_ACTIONS } from './alertActions'


export const META_ACTIONS = {
	COUNTRY_META_DATA,
	COUNTRIES_LIST,
}

function COUNTRY_META_DATA() {
	return (dispatch, getState) => {
		dispatch(request())
		apiService
			.getCountryMetaData()
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
		return { type: META_CONSTANTS.COUNTRY_META.REQUEST }
	}
	function success(response) {
		return {
			type: META_CONSTANTS.COUNTRY_META.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: META_CONSTANTS.COUNTRY_META.FAILURE }
	}
}

function COUNTRIES_LIST() {
	return (dispatch, getState) => {
		const { payment_method_id } = getState().redirect
		dispatch(request())
		apiService
			.getCountriesList()
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
		return { type: META_CONSTANTS.COUNTRY_LIST.REQUEST }
	}
	function success(response) {
		return {
			type: META_CONSTANTS.COUNTRY_LIST.SUCCESS,
			response
		}
	}
	function failure() {
		return { type: META_CONSTANTS.COUNTRY_LIST.FAILURE }
	}
}