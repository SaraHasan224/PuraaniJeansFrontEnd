import { HOME_CONSTANTS } from '../actionTypes'


const initialState = {
  recommended: [],
  brands: [],

  featuredProducts: [],
  featuredProductsLoaded: false
}

const homeReducer = (state = initialState, action) => {
	switch (action.type) {
    case HOME_CONSTANTS.HOMEPAGE.REQUEST:
      return initialState
    case HOME_CONSTANTS.HOMEPAGE.SUCCESS:
      return {
        ...initialState,
        recommended: action?.response?.recommended,
        brands: action?.response?.brands,
      }
    case HOME_CONSTANTS.HOMEPAGE.FAILURE:
      return initialState

      
    case HOME_CONSTANTS.FEATURED_ITEMS.REQUEST:
      return initialState
    case HOME_CONSTANTS.FEATURED_ITEMS.SUCCESS:
      return {
        ...initialState,
        featuredProducts: action?.response?.featured_by?.sections,
        featuredProductsLoaded: !initialState?.featuredProductsLoaded
      }
    case HOME_CONSTANTS.FEATURED_ITEMS.FAILURE:
      return initialState
		default:
			return state
	}
}
export default homeReducer

