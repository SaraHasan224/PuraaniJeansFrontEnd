import { CONSTANTS } from "../../utils"
import { ERROR_CONSTANTS } from "../actionTypes"

export const ERROR_ACTION = {
	ERROR,
}


function ERROR(error_response) {
	const status = CONSTANTS.HTTP_RESPONSE.INPROCESSIBLE
	if (error_response === undefined) {
		const error_message = "Internet connectivity error"
		return {
			type: ERROR_CONSTANTS.MESSAGE,
			status,
			message: error_message,
			description: {},
			body: {},
		}
	}else {
		return handleError(error_response)
	}
}

const handleError = (error_response) => {
	const status = error_response?.status
	const description = error_response?.statusText
	const body = error_response?.data?.body
	const error_message = error_response?.data?.message
	return { type: ERROR_CONSTANTS.MESSAGE, status, message: error_message, description, body }
}