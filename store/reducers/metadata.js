import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  banners: [],
  meta: [],
}

export const metaDataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    saveMetaData: (state,metaData) => {
        console.log("save Meta Data: ", metaData);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.meta = metaData?.payload;
    },
    saveBanners: (state,metaData) => {
        console.log("save banners: ", metaData);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.banners = metaData?.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveMetaData, saveBanners } = metaDataSlice.actions

export default metaDataSlice.reducer