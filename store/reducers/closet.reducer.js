import { CLOSET_CONSTANTS, PRODUCTS_CONSTANTS, RESET_DETAILS } from '../actionTypes'


const initialState = {
  closet: [],
  categories: [],
  trendingClosetProducts: [],
  recentClosetProducts: [],
  closetLoggedIn: false,
  closetAllProducts: [],
  closetAllProductsData: [],
  closetDataLoading: false,
}

const closetReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DETAILS:
      return initialState;
    case CLOSET_CONSTANTS.CREATE.REQUEST:
      return {
        ...state,
        closetDataLoading: true,
        closet: [],
        trendingClosetProducts: [],
        recentClosetProducts: [],
      }
    case CLOSET_CONSTANTS.CREATE.SUCCESS:
      return {
        ...state,
        closet: action?.response?.closet,
        closetLoggedIn: !initialState?.closetLoggedIn
      }
    case CLOSET_CONSTANTS.CREATE.FAILURE:
      return state
    case CLOSET_CONSTANTS.UPDATE.REQUEST:
      return {
        ...state,
        closetDataLoading: true,
      }
    case CLOSET_CONSTANTS.UPDATE.SUCCESS:
      return {
        ...state,
        closet: action?.response?.closet,
      }
    case CLOSET_CONSTANTS.UPDATE.FAILURE:
      return state


    case CLOSET_CONSTANTS.SHOW_DETAILS.REQUEST:
      return {
        ...state,
        closetDataLoading: true,
        closet: [],
        categories: [],
        trendingClosetProducts: [],
        recentClosetProducts: [],
        closetAllProductsData: [],
        closetAllProducts: [],
      }
    case CLOSET_CONSTANTS.SHOW_DETAILS.SUCCESS:
      return {
        ...state,
        closetDataLoading: false,
        closet: action?.response?.closet,
        categories: action?.response?.categories,
        trendingClosetProducts: action?.response?.trending_products,
        // recentClosetProducts: action?.response?.recent_orders,
        recentClosetProducts: [
          {
            id: "#125021",
            productDetails: "Neck Velvet Dress",
            status: "Shipped",
            price: "$205",
          },
          {
            id: "#521214",
            productDetails: "Belted Trench Coat",
            status: "Shipped",
            price: "$350",
          },
          {
            id: "#521021",
            productDetails: "Men Print Tee",
            status: "pending",
            price: "$150",
          },
          {
            id: "#245021",
            productDetails: "Woman Print Tee",
            status: "Shipped",
            price: "$150",
          },
          {
            id: "#122141",
            productDetails: "Men Print Tee",
            status: "canceled",
            price: "$150",
          },
          {
            id: "#125015",
            productDetails: "Men Print Tee",
            status: "pending",
            price: "$150",
          },
          {
            id: "#245021",
            productDetails: "women print tee",
            status: "Shipped",
            price: "$150",
          },
          {
            id: "#122141",
            productDetails: "men print tee",
            status: "canceled",
            price: "$150",
          },
          {
            id: "#125015",
            productDetails: "men print tee",
            status: "pending",
            price: "$150",
          },
        ],
        closetAllProductsData: action?.response?.all_products?.products?.data,
        closetAllProducts: action?.response?.all_products
      }
      
		case PRODUCTS_CONSTANTS.ADD_NEW_PRODUCT.REQUEST:
			return {
				...state,
			}
		case PRODUCTS_CONSTANTS.ADD_NEW_PRODUCT.SUCCESS:
			return {
				...state,
        closetAllProductsData: action?.response?.all_products?.products?.data,
			}
		case PRODUCTS_CONSTANTS.ADD_NEW_PRODUCT.FAILURE:
			return {
				...state,
			}
    case CLOSET_CONSTANTS.SHOW_DETAILS.FAILURE:
      return {
        ...state,
        closetDataLoading: false,
      }


    case CLOSET_CONSTANTS.PRODUCT_PAGINATED.REQUEST:
      return {
        ...state,
        closetDataLoading: true,
      }
    case CLOSET_CONSTANTS.PRODUCT_PAGINATED.SUCCESS:
      return {
        ...state,
        closetDataLoading: false,
        closetAllProductsData: action?.response?.all_products?.products?.data,
        closetAllProducts: action?.response?.all_products
      }
    case CLOSET_CONSTANTS.PRODUCT_PAGINATED.FAILURE:
      return {
        ...state,
        closetDataLoading: false,
      }
    default:
      return state
  }
}
export default closetReducer

