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
import FeaturedClosets from "../components/common/Featured/featured-closets";

import ALink from '../features/alink';
import InternetConnection from "../features/internet-connection";

import { HOMEPAGE_ACTIONS } from "../store/actions";
import { HOME_CONSTANTS } from "../store/actionTypes";
import { HELPER } from "../utils";

export default function Home(props){
  const { meta } = useSelector((state) => state.metadata);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
			type: HOME_CONSTANTS.HOMEPAGE_META.SUCCESS,
			response: props?.meta
		});
    dispatch(HOMEPAGE_ACTIONS.GET_HOMEPAGE_CONTENTS());
    dispatch(HOMEPAGE_ACTIONS.GET_MEGA_MENU_CONTENTS());
  }, []);

  return (
    <>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/x-icon" href={ meta?.favicon } />
          <title>
            { meta?.app_title }
          </title>
        </Helmet>
        <InternetConnection />
        {/* HEADER */}
        <ALink href="/">
          <Header logoName={meta?.logo} topClass="top-header" />
        </ALink>
        {/* HEADER Carousel */}
        <HeaderCarousel />
        {/* Search By Tags */}
        <SearchByTags />
        {/* RecommendedItems We Offer */}
        <RecommendedItems/>
        <Featured
          // cartClass="cart-info cart-wrap"
        />
        <FeaturedClosets featured={props?.featured_by}/>
        <BrandsFooter
          title={"Relax & Get the product by top brands"}
          description={"In today's modern world, Household Shopping can be an extreme sport when you are making a list to grab things from physical stores therefore."}
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
  const metaApiResponse = await HOMEPAGE_ACTIONS.GET_HOMEPAGE_APP_METADATA();
  return {
    props: {
      meta: metaApiResponse?.data?.body
    }
  }
}
