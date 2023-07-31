import { PRODUCTS_CONSTANTS } from "../actionTypes"

const initialState = {

	product: [],
	recentlyViewed: {
		products: []
	}
}

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case PRODUCTS_CONSTANTS.PRODUCT_DETAIL.REQUEST:
			return {
				...state,
				loading: true,
			}
		case PRODUCTS_CONSTANTS.PRODUCT_DETAIL.SUCCESS:
			return {
				...state,
				loading: false,
				product: action?.response,
			}
		case PRODUCTS_CONSTANTS.PRODUCT_DETAIL.FAILURE:
			return {
				...state,
				loading: false,
			}


			case PRODUCTS_CONSTANTS.RECENTLY_VIEWED.REQUEST:
				return {
					...state,
					loading: true,
				}
			case PRODUCTS_CONSTANTS.RECENTLY_VIEWED.SUCCESS:
				return {
					...state,
					loading: false,
					recentlyViewed: action?.response,
				}
			case PRODUCTS_CONSTANTS.RECENTLY_VIEWED.FAILURE:
				return {
					...state,
					recentlyViewed: false,
				}
		default:
			return state
	}
}
export default productsReducer

