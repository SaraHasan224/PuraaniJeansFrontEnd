import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";

import "../public/assets/scss/app.scss";
import { ToastContainer } from "react-toastify";
import TapTop from "../components/common/widgets/Tap-Top";
import CartContextProvider from "../helpers/cart/CartContext";
import FilterProvider from "../helpers/filter/FilterProvider";
import SettingProvider from "../helpers/theme-setting/SettingProvider";
import { CompareContextProvider } from "../helpers/Compare/CompareContext";
import { CurrencyContextProvider } from "../helpers/Currency/CurrencyContext";
// import { ApolloProvider } from "@apollo/client";
// import { useApollo } from '../helpers/apollo';

export default function MyApp({ Component, pageProps, props }) {
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  
  const [metaData, setMetaData] = useState([]);
  const [banners, setBanners] = useState([]);
  const [errors, setErrors] = useState([]);
  // const apolloClient = useApollo(pageProps)

  useEffect(async() => {
    const apiResponse = await fetch(`http://puranijeans.test/api/meta-data`);
    const jsonApiResponse = await apiResponse.json();
    if(jsonApiResponse.status === 200) {
      setMetaData(jsonApiResponse?.body?.metaData);
      setBanners(jsonApiResponse?.body?.banners);
    }else {
      setErrors(jsonApiResponse?.message)
      setIsLoading(true)
    }

    const path = window.location.pathname.split("/");
    const url = path[path.length - 1];
    // document.body.classList.add("dark");

    let timer=setTimeout(function () {
      setIsLoading(false)
    }, 1000);
    return () => { clearTimeout(timer)}
  }, []);
  return (
    <>
    {/* <ApolloProvider client={apolloClient}> */}
      {isLoading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <Helmet>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" type="image/x-icon" href={metaData?.favicon} />
            <title>{metaData?.app_title}</title>
          </Helmet>
          <div>
            <SettingProvider>
              <CompareContextProvider>
                <CurrencyContextProvider>
                  <CartContextProvider>
                      <FilterProvider>
                        <Component {...pageProps} />
                      </FilterProvider>
                  </CartContextProvider>
                </CurrencyContextProvider>
              </CompareContextProvider>
            </SettingProvider>
            <ToastContainer />
            <TapTop />
          </div>
        </>
      )}
      {/* </ApolloProvider> */}
    </>
  );
}