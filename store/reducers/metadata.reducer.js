import { HOME_CONSTANTS, META_CONSTANTS } from '../actionTypes'


const initialState = {
  banners: [],
  meta: [],
  brands: [],
  authBanners: [],
  homeContent: [],

  mainMenuCategories: []
}

const metaDataReducer = (state = initialState, action) => {
	switch (action.type) {
    case HOME_CONSTANTS.HOMEPAGE_META.REQUEST:
      return state
    case HOME_CONSTANTS.HOMEPAGE_META.SUCCESS:
      return {
        ...state,
        banners: action?.response?.banners,
        meta: action?.response?.metadata,
        authBanners: action?.response?.auth_banners,
        homeContent: action?.response?.home,
        brands: action?.response?.brands,
        subscription: action?.response?.subscription,
        cities: action?.response?.cities,
        sellersWatchList: action?.response?.sellers_watch?.list
      }
    case HOME_CONSTANTS.HOMEPAGE_META.FAILURE:
      return state
      
    case HOME_CONSTANTS.MEGA_MENU.REQUEST:
      return state
    case HOME_CONSTANTS.MEGA_MENU.SUCCESS:
      return {
        ...state,
        mainMenuCategories: action?.response?.menu,
      }
    case HOME_CONSTANTS.MEGA_MENU.FAILURE:
      return state


    case META_CONSTANTS.COUNTRY_META.REQUEST:
      return state
    case META_CONSTANTS.COUNTRY_META.SUCCESS:
      return {
        ...state,
      }
    case META_CONSTANTS.COUNTRY_META.FAILURE:
      return state

    case META_CONSTANTS.COUNTRY_LIST.REQUEST:
      return state
    case META_CONSTANTS.COUNTRY_LIST.SUCCESS:
      return state
    case META_CONSTANTS.COUNTRY_LIST.FAILURE:
      return state
		default:
			return state
	}
}
export default metaDataReducer

