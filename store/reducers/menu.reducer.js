import { MENU_ITEM_CONSTANTS } from "../actionTypes"

const initialState = {
	menu: []
}

const menuReducer = (state = initialState, action) => {
	switch (action.type) {
      
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

