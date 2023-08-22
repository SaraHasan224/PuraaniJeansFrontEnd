import { HOME_CONSTANTS } from '../actionTypes'


const initialState = {
  recommended: [],
  brands: [],
  sellers: [],

  featuredProducts: [],
  featuredProductsLoaded: false
}

const homeReducer = (state = initialState, action) => {
	switch (action.type) {
    case HOME_CONSTANTS.HOMEPAGE.REQUEST:
      return state
    case HOME_CONSTANTS.HOMEPAGE.SUCCESS:
      return {
        ...state,
        recommended: action?.response?.recommended,
        brands: action?.response?.brands,
      }
    case HOME_CONSTANTS.HOMEPAGE.FAILURE:
      return state

      
    case HOME_CONSTANTS.FEATURED_ITEMS.REQUEST:
      return state
    case HOME_CONSTANTS.FEATURED_ITEMS.SUCCESS:
      return {
        ...state,
        featuredProducts: action?.response?.featured_by?.sections,
        featuredProductsLoaded: !state?.featuredProductsLoaded
      }
      case HOME_CONSTANTS.FEATURED_ITEMS.FAILURE:
      return state
		default:
			return state
	}
}
export default homeReducer

