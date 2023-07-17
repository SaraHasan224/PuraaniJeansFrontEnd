// import { createSlice } from '@reduxjs/toolkit'

import { HOME_CONSTANTS } from "../actionTypes"

const initialState = {
  recommended: [],
  recommendedItemsLoaded: false
}

// export const productsDataSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     saveRecentProducts: (state, productsList) => {
//       state.recommended = productsList?.payload;
//     },
//   },
// })

// // Action creators are generated for each case reducer function
// export const { saveRecentProducts } = productsDataSlice.actions

// export default productsDataSlice.reducer


const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state
	}
}
export default productsReducer

