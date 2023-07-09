import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import metadataReducer from '../store/reducers/metadata.reducer'

const metaConfig = {
  key: 'meta',
  storage,
}
const metaPersistedReducer = persistReducer(metaConfig, metadataReducer)

export const store = configureStore({
  reducer: {
    metadata: metaPersistedReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)