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
import { apiService } from "../store/middlewares/apiservice";
import { API_ENDPOINTS, COOKIE_STORAGE_SERVICE } from "../utils";

export default function MyApp({ Component, pageProps }) {

  const [isLoading, setIsLoading] = useState(true);
  const [metaData, setIsMetaData] = useState([]);
  const [customerData, setIsCustomerData] = useState([]);

  useEffect(async () => {
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ENDPOINTS.GET_APP_METADATA}`);
    const jsonApiResponse = await apiResponse.json();
    if (jsonApiResponse.status === 200) {
      setIsMetaData(jsonApiResponse?.body?.metaData);
      setIsCustomerData(jsonApiResponse?.body?.customer);
    } else {
      setErrors(jsonApiResponse?.message)
      setIsLoading(true)
    }

    let timer = setTimeout(function () {
      setIsLoading(false)
    }, 1000);
    return () => { clearTimeout(timer) }
  }, []);
  const appProps = {
    ...pageProps, customerData: customerData
  }
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
                        <Component { ...pageProps} />
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