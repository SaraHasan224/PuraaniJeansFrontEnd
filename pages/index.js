import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Helmet from "react-helmet";

import Header from "../components/layouts/headers/header";
import HeaderCarousel from "../components/layouts/headers/header-carousel";
import TapTop from "../components/layouts/tap-top";
import SearchByTags from "../components/search_by_tags/tags";
import RecommendedItems from "../components/recommended_items/items";
import BrandsFooter from "../components/layouts/footers/brands";
import Footer from "../components/layouts/footers/Footer";
import Featured from "../components/common/Featured/featured-list";
import TrendingSellers from "../components/common/TrendingSellers/trending-sellers";

import Loader from '../features/loader';
import InternetConnection from "../features/internet-connection";

import { HOMEPAGE_ACTIONS } from "../store/actions";
import { HOME_CONSTANTS } from "../store/actionTypes";
import { API_ENDPOINTS, HELPER } from "../utils";

export default function Home(props){
  const { meta, brands, appLoading } = useSelector((state) => state.metadata);
  const dispatch = useDispatch()
  
  useEffect(() => {
    document.documentElement.style.setProperty("--gradient1", "#ff4c3b");
    document.documentElement.style.setProperty("--gradient2", "#FA4729");
    dispatch({
			type: HOME_CONSTANTS.HOMEPAGE_META.SUCCESS,
			response: props?.meta
		});
    dispatch(HOMEPAGE_ACTIONS.GET_HOMEPAGE_CONTENTS());
    dispatch(HOMEPAGE_ACTIONS.GET_MEGA_MENU_CONTENTS());
  }, []);

  return (
    appLoading ? <Loader/> : <>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/x-icon" href={ meta?.favicon } />
          <title>
            { meta?.app_title }
          </title>
        </Helmet>
        <InternetConnection />
        {/* HEADER */}
        <Header logoName={meta?.logo} topClass="top-header" />
        {/* HEADER Carousel */}
        <HeaderCarousel />
        {/* Search By Tags */}
        <SearchByTags />
        {/* RecommendedItems We Offer */}
        <RecommendedItems />
        <Featured />
        <TrendingSellers featured={props?.featured_by}/>
        <BrandsFooter
          title={brands?.title}
          description={brands?.sub_title}
          btn_name={"shop now"}
          bg_img_src={`/my-assets/images/backgrounds/home-bg-1.png`}
        />
        <Footer
          footerClass={`footer-dark`}
          footerLayOut={"light-layout upper-footer bg-white"}
          footerSection={"border-section border-top-0 noTopPadding footer-section"}
          belowSection={"noTopPadding"}
          newLatter={true}
          logoName={ meta?.logo_white }
          layoutClass={"dark-subfooter"}
        />
        <TapTop />
    </>
  );
};

export async function getStaticProps() {
  const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ENDPOINTS.GET_APP_METADATA}`);
  const metaApiResponse = await apiResponse.json();
    
  return {
    props: {
      meta: HELPER.isNotEmpty(metaApiResponse?.body) ? metaApiResponse?.body : [],
    }
  }
}
