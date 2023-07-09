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

import { saveMetaData, saveBanners, saveAuthBanners } from '../store/reducers/metadata.reducer'

export default function Home(props){
  const { meta } = useSelector((state) => state.metadata);
  const dispatch = useDispatch()

  const {
    banners,
    metaData,
    recommended,
    authBanners
  } = props;

  useEffect(() => {
    dispatch(saveMetaData(metaData))
    dispatch(saveBanners(banners));
    dispatch(saveAuthBanners(authBanners));
  }, [props]);

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
        <HeaderCarousel banners={banners} />
        {/* Search By Tags */}
        <SearchByTags />
        {/* RecommendedItems We Offer */}
        <RecommendedItems items={recommended}/>
        <Featured
          // cartClass="cart-info cart-wrap"
          featured={props?.featured_by}
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
  const metaApiResponse = await fetch(`http://puranijeans.test/api/meta-data`);
  const metaJsonApiResponse = await metaApiResponse.json();
  const apiResponse = await fetch(`${process.env.NEXT_API_BASE_URL}api/homepage`);
  const jsonApiResponse = await apiResponse.json();
  const featuredApiResponse = await fetch(`${process.env.NEXT_API_BASE_URL}api/homepage/featured-section`);
  const featuredJsonApiResponse = await featuredApiResponse.json();
  return {
    props: {
      metaData: metaJsonApiResponse?.body?.metadata,
      banners: metaJsonApiResponse?.body?.banners,
      authBanners: metaJsonApiResponse?.body?.auth_banners,
      recommended: jsonApiResponse?.body?.recommended,
      brands: jsonApiResponse?.body?.brands,
      featured_by: featuredJsonApiResponse?.body?.featured_by,
    }
  }
}
