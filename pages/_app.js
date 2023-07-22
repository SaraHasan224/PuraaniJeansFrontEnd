import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { persistor, store } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider, useDispatch, useSelector } from 'react-redux'

import "../public/assets/scss/app.scss";
import { ToastContainer } from "react-toastify";
import CartContextProvider from "../context/cart/CartContext";
import FilterProvider from "../context/filter/FilterProvider";
import { CompareContextProvider } from "../context/Compare/CompareContext";
import { CurrencyContextProvider } from "../context/Currency/CurrencyContext";
import TapTop from "../components/layouts/Tap-Top";

export default function MyApp({ Component, pageProps }) {

  const [isLoading, setIsLoading] = useState(true);
  const [metaData, setIsMetaData] = useState([]);

  useEffect(async () => {
    const apiResponse = await fetch(`http://puranijeans.test/api/meta-data`);
    const jsonApiResponse = await apiResponse.json();
    if (jsonApiResponse.status === 200) {
      setIsMetaData(jsonApiResponse?.body?.metaData);
    } else {
      setErrors(jsonApiResponse?.message)
      setIsLoading(true)
    }

    let timer = setTimeout(function () {
      setIsLoading(false)
    }, 1000);
    return () => { clearTimeout(timer) }
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <Provider store={store}>
            <Helmet>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <link rel="icon" type="image/x-icon" href={metaData?.favicon} />
              <title>{metaData?.app_title}</title>
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
        </>
      )}
    </>
  );
}