import { ALERT_CONSTANTS } from '../actionTypes'

export const ALERT_ACTIONS = {
	success,
	warning,
	error,
	secondary,
	clear,
}

function success(message, group = '', autoDismiss = true) {
	return { type: ALERT_CONSTANTS.SUCCESS, message, group, autoDismiss }
}

function error(message, group = '', autoDismiss = true) {
	return { type: ALERT_CONSTANTS.ERROR, message, group, autoDismiss }
}

function secondary(message, group = '', autoDismiss = true) {
	return { type: ALERT_CONSTANTS.SECONDARY, message, group, autoDismiss }
}

function warning(message, errorBody = "", group = '', autoDismiss = true) {
	return { type: ALERT_CONSTANTS.WARNING, message, group, autoDismiss }
}

function clear() {
	return { type: ALERT_CONSTANTS.CLEAR }
}
