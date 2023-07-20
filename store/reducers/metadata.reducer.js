/*
import { createSlice } from '@reduxjs/toolkit'
  export const metaDataSlice = createSlice({
    name: 'metadata',
    initialState,
    reducers: {
      saveMetaData: (state,metaData) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.meta = metaData?.payload;
      },
      saveBanners: (state,metaData) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.banners = metaData?.payload;
      },
      saveAuthBanners: (state,metaData) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.authBanners = metaData?.payload;
      },
    },
  })

  // Action creators are generated for each case reducer function
  export const { saveMetaData, saveBanners, saveAuthBanners } = metaDataSlice.actions

  export default metaDataSlice.reducer

*/

import { HOME_CONSTANTS, META_CONSTANTS } from '../actionTypes'


const initialState = {
  banners: [],
  meta: [],
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

