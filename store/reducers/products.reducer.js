import { PRODUCTS_CONSTANTS } from "../actionTypes"

const initialState = {
	brands: [],
	categories: [],
	color: [],
	condition: [],
	size: [],
	standard: [],
	addedProduct: {
		photo_and_description: {
			name: "",
			sku: "",
			files: [],
			description: "",
		}
	},
	
	product: [],
	recentlyViewed: {
		products: []
	}
}

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case PRODUCTS_CONSTANTS.PRODUCT_DATA_ADDED:
			return {
				...state,
				addedProduct: {
					...state.addedProduct, 
					step: action?.activeStep,
					[action?.action]: action?.response
				}
			}
		case PRODUCTS_CONSTANTS.PRODUCT_METADATA.REQUEST:
			return {
				...state,
			}
		case PRODUCTS_CONSTANTS.PRODUCT_METADATA.SUCCESS:
			return {
				...state,
				brands: action?.response?.brands,
				categories: action?.response?.categories,
				color: action?.response?.color,
				condition: action?.response?.condition,
				size: action?.response?.size,
				standard: action?.response?.standard,
			}
		case PRODUCTS_CONSTANTS.PRODUCT_METADATA.FAILURE:
			return {
				...state,
			}

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

