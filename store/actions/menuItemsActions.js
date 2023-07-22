import { MENU_ITEM_CONSTANTS } from '../actionTypes';


export const MENU_ITEM_ACTIONS = {
	REQUEST_MENU_ITEM
}

function REQUEST_MENU_ITEM(item) {
	return (dispatch, getState) => {
		dispatch(request(item))
	}

	function request(response) {
		return { type: MENU_ITEM_CONSTANTS.ITEM, response }
	}
}