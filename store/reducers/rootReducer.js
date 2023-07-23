import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import metadataReducer from './metadata.reducer'
import productsReducer from './products.reducer'
import homeReducer from './home.reducer';
import menuReducer from './menu.reducer';
import authReducer from './auth.reducer';

const metaConfig = {
  key: 'meta',
  storage,
}

const homeConfig = {
  key: 'home',
  storage,
}

const menuConfig = {
  key: 'menu',
  storage,
}
const authConfig = {
  key: 'auth',
  storage,
  blacklist: ['isLoggedProcessing', 'isPhoneVerifyProcessing']
}

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  menu: persistReducer(menuConfig, menuReducer),
  metadata: persistReducer(metaConfig, metadataReducer),
  products: productsReducer,
  // products: persistReducer(productsConfig, productsReducer),
  home: persistReducer(homeConfig, homeReducer),
})

export default rootReducer
