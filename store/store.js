import { configureStore } from '@reduxjs/toolkit';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import metadataReducer from '../store/reducers/metadata'

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