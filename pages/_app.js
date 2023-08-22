import React from "react";
import Helmet from "react-helmet";
import { persistor, store } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'

import { ToastContainer } from "react-toastify";

import TapTop from "../components/layouts/Tap-Top";

import CartContextProvider from "../context/cart/CartContext";
import FilterProvider from "../context/filter/FilterProvider";
import { CompareContextProvider } from "../context/Compare/CompareContext";
import { CurrencyContextProvider } from "../context/Currency/CurrencyContext";

import "../public/assets/scss/app.scss";

export default function MyApp({ Component, pageProps }) {

  return (
          <Provider store={store}>
            <Helmet>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              {/* <link rel="icon" type="image/x-icon" href={metaData?.favicon} /> */}
              <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
            </Helmet>
            <div>
              <PersistGate loading={null} persistor={persistor}>
                <CompareContextProvider>
                  <CurrencyContextProvider>
                    <CartContextProvider>
                      <FilterProvider>
                        <Component {...pageProps} />
                      </FilterProvider>
                    </CartContextProvider>
                  </CurrencyContextProvider>
                </CompareContextProvider>
              </PersistGate>
              <ToastContainer />
              <TapTop />
            </div>
          </Provider>
  );
}