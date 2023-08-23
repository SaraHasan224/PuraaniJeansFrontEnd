import { CONSTANTS, HELPER } from "../../utils"
import { PRODUCTS_CONSTANTS, RESET_DETAILS } from "../actionTypes"

const initialState = {
	sort_by: [],
	price_range: {
		"max": null,
		"min": null
	},
	stores: "",
	categories: [],
	brands: [],
	condition: [],
	size: [],
	standard: [],
	color: [],

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

	category: [],
	parentCategory: [],
	subCategories: [],
	categoryDataLoading: false,
	brands: [],
	categories: [],
	color: [],
	condition: [],
	size: [],
	standard: [],

	productAdded: CONSTANTS.NO,
	addedProduct: {
		photo_and_description: {
			name: "",
			sku: "",
			files: [],
			description: "",
		},
		item_information: {
			category: [],
			subCategory: [],
			brand: [],
			condition: [],
			size: [],
			quantity: [],
			standard: [],
			color: [],
		},
		shipment_and_location: {
			country: [],
			freeShipping: "",
			worldWideShipping: "",
			shippingPrice: "",
		},
		variants: [
			{
				price: '',
				discounted_price: '',
				qty: '',
				description: '',
				variation: '',
			}
		]
	},

	product: [],
	recentlyViewed: {
		products: []
	}
}

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case RESET_DETAILS:
			return initialState;
		case PRODUCTS_CONSTANTS.PRODUCT_DATA_RESET:
			return {
				...state,
				addedProduct: initialState?.addedProduct
			}

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
				sort_by: action?.response?.filters?.sort_by,
				price_range: {
					max: action?.response?.filters?.price_range?.max,
					min: action?.response?.filters?.price_range?.min
				},
				stores: action?.response?.filters?.stores,
				categories: action?.response?.filters?.categories,
				brands: action?.response?.filters?.brands,
				condition: action?.response?.filters?.condition,
				size: action?.response?.filters?.size,
				standard: action?.response?.filters?.standard,
				color: action?.response?.filters?.color,
				slug: action?.response?.slug,
				type: action?.response?.type,
			}
		case PRODUCTS_CONSTANTS.PRODUCT_LISTING.FAILURE:
			return {
				...state,
				loading: false,
			}

		case PRODUCTS_CONSTANTS.SHOW_DETAILS.REQUEST:
			return {
				...state,
				categoryDataLoading: true,
				category: [],
			}
		case PRODUCTS_CONSTANTS.SHOW_DETAILS.SUCCESS:
			return {
				...state,
				categoryDataLoading: false,
				category: action?.response?.category,
				parentCategory: action?.response?.parent_category,
				subCategories: action?.response?.sub_categories,
			}
		case PRODUCTS_CONSTANTS.SHOW_DETAILS.FAILURE:
			return {
				...state,
				categoryDataLoading: false,
			}
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
			return state;
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
			return state;

		case PRODUCTS_CONSTANTS.ADD_NEW_PRODUCT.REQUEST:
			return {
				...state,
				productAdded: CONSTANTS.NO
			}
		case PRODUCTS_CONSTANTS.ADD_NEW_PRODUCT.SUCCESS:
			return {
				...state,
				addedProduct: initialState?.addedProduct,
				productAdded: CONSTANTS.YES
			}
		case PRODUCTS_CONSTANTS.ADD_NEW_PRODUCT.FAILURE:
			return {
				...state,
			}


		case PRODUCTS_CONSTANTS.PRODUCT_DETAIL.REQUEST:
			return {
				...state,
				loading: true,
			}
		case PRODUCTS_CONSTANTS.PRODUCT_DETAIL.SUCCESS:
			let _data = action?.response;
			return {
				...state,
				loading: false,
				product: _data,
				addedProduct: action?.action === "edit" ? {
					...state.addedProduct,
					photo_and_description: {
						name: _data?.name,
						sku: _data?.handle,
						images: HELPER.formatProductDetailImage(_data?.images),
						price: _data?.price,
						discountedPrice: _data?.discounted_price,
						description: _data?.short_description,
					},
					item_information: {
						category: _data?.item_information?.category,
						subCategory: _data?.item_information?.subCategory,
						brand: _data?.item_information?.brand,
						condition: _data?.item_information?.condition,
						size: _data?.item_information?.size,
						quantity: _data?.max_quantity,
						standard: _data?.item_information?.standard,
						color: _data?.item_information?.color,
					},
					shipment_and_location: {
						country: _data?.shipment_country,
						freeShipping: _data?.free_shipment,
						worldWideShipping: _data?.enable_world_wide_shipping,
						shippingPrice: _data?.shipping_price,
					},
					_variants: _data?.variants
				} : state.addedProduct
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

