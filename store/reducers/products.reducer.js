import { PRODUCTS_CONSTANTS } from "../actionTypes"

const initialState = {
	filters: {
		"sort_by": {
			"featured": "Featured",
			"newest_arrival": "New Arrival",
			"price_high_to_low": "Price:High to Low",
			"price_low_to_high": "Price: Low to High"
		},
		"price_range": {
			"max": null,
			"min": null
		},
		"stores": ""
	},
	slug: "",
	type: "",

	products: {
		"current_page": 1,
		"data": [],
		"first_page_url": "",
		"from": null,
		"last_page": 1,
		"last_page_url": "",
		"links": [],
		"next_page_url": null,
		"path": "",
		"per_page": 10,
		"prev_page_url": null,
		"to": null,
		"total": 0
	},
	loading: false,
	fetchMore: false,

	product: []
}

const productsReducer = (state = initialState, action) => {
	switch (action.type) {

		case PRODUCTS_CONSTANTS.PRODUCT_LISTING.REQUEST:
			return {
				...state,
				loading: true,
			}
		case PRODUCTS_CONSTANTS.PRODUCT_LISTING.SUCCESS:
			return {
				...state,
				loading: false,
				products: action?.response?.products,
				filters: action?.response?.filters,
				slug: action?.response?.slug,
				type: action?.response?.type,
			}
		case PRODUCTS_CONSTANTS.PRODUCT_LISTING.FAILURE:
			return {
				...state,
				loading: false,
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
		default:
			return state
	}
}
export default productsReducer

