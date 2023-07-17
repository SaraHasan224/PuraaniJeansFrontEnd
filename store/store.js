import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'

import rootReducer from './reducers/rootReducer';

const loggerMiddleware = createLogger()

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NEXT_PUBLIC_APP_ENVIRONMENT !== 'production',
  middleware: [thunk, loggerMiddleware]//[thunk]
})

export const persistor = persistStore(store)