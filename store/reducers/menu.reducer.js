import { MENU_ITEM_CONSTANTS, RESET_DETAILS } from "../actionTypes"

const initialState = {
	menu: []
}

const menuReducer = (state = initialState, action) => {
	switch (action.type) {
		case RESET_DETAILS:
			return initialState;
		case MENU_ITEM_CONSTANTS.ITEM:
			return {
				...state,
				menu: action?.response?.router,
				menuPath: action?.response?.path,
			}
		default:
			return state
	}
}
export default menuReducer

