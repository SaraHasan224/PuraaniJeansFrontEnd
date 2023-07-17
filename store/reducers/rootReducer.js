import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import metadataReducer from './metadata.reducer'
import productsReducer from './products.reducer'
import homeReducer from './home.reducer';

const metaConfig = {
  key: 'meta',
  storage,
  whitelist: [
    "banners",
    "meta",
    "authBanners",
  ]
}

const homeConfig = {
  key: 'home',
  storage,
  whitelist: [
    "brands"
  ]
}

const rootReducer = combineReducers({
  metadata: persistReducer(metaConfig, metadataReducer),
  products: productsReducer,
  // products: persistReducer(productsConfig, productsReducer),
  home: persistReducer(homeConfig, homeReducer),
})

export default rootReducer
