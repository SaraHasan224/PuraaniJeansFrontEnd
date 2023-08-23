import { HOME_CONSTANTS, META_CONSTANTS, RESET_DETAILS } from '../actionTypes'


const initialState = {
  banners: [],
  meta: [],
  brands: [],
  authBanners: [],
  homeContent: [],
  appLoading: false,

  mainMenuCategories: [],
  metaLoading: false,
  metaCountryList: []
}

const metaDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case RESET_DETAILS:
			return initialState;
    case HOME_CONSTANTS.HOMEPAGE_META.REQUEST:
      return {
        ...state,
        appLoading: true,
      }
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
        sellersWatchList: action?.response?.sellers_watch?.list,
        appLoading: false,
      }
    case HOME_CONSTANTS.HOMEPAGE_META.FAILURE:
      return {
        ...state,
        appLoading: false,
      }
      
    case HOME_CONSTANTS.MEGA_MENU.REQUEST:
      return {
        ...state,
        appLoading: true,
      }
    case HOME_CONSTANTS.MEGA_MENU.SUCCESS:
      return {
        ...state,
        appLoading: false,
        mainMenuCategories: action?.response?.menu,
      }
    case HOME_CONSTANTS.MEGA_MENU.FAILURE:
      return {
        ...state,
        appLoading: false,
      }


    case META_CONSTANTS.COUNTRY_META.REQUEST:
      return {
        ...state,
        metaLoading: true
      }
    case META_CONSTANTS.COUNTRY_META.SUCCESS:
      return {
        ...state,
        metaLoading: false,
        metaCountryList: action?.response,
      }
    case META_CONSTANTS.COUNTRY_META.FAILURE:
      return {
        ...state,
        metaLoading: false
      }

    case META_CONSTANTS.COUNTRY_LIST.REQUEST:
      return {
        ...state,
        metaLoading: true
      }
    case META_CONSTANTS.COUNTRY_LIST.SUCCESS:
      let countriesList = action?.response;
      const peopleKeys = Object.keys(countriesList);
      const names = peopleKeys.map((key) => {
        return {
          "id": countriesList[key].id,
          "name": countriesList[key].name,
          "country_code": countriesList[key].country_code,
          "code": countriesList[key].code
        };
      })
      return {
        ...state,
        metaLoading: false,
        metaCountryList: names
      }
    case META_CONSTANTS.COUNTRY_LIST.FAILURE:
      return {
        ...state,
        metaLoading: false
      }
		default:
			return state
	}
}
export default metaDataReducer

