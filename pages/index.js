import React from "react";
import { useDispatch } from 'react-redux';
import Helmet from "react-helmet";

import Header from "../components/headers/header";
import HeaderCarousel from "../components/headers/header-carousel";
import Settings from "../components/customizer/settings";
import SearchByTags from "../components/search_by_tags/tags";
import Services from "../components/service/service";
import BrandsFooter from "../components/footers/brands";
import Footer from "../components/footers/Footer";
import Featured from "../components/common/Featured/featured-list";

import ALink from '../features/alink';
// import InternetConnection from "../features/internet-connection";

export default function Home(props){
  console.log(props)
  const { recommended, brands, featured_categories} = props;
  // console.log(banners, recommended, brands, featured_categories)
  return (
    <>
        <Helmet>
          {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
          {/* <link rel="icon" type="image/x-icon" href={"/my-assets/images/icons/favicon.png"} /> */}
          {/* <title>{process.env.NEXT_PUBLIC_APP_NAME} - {process.env.NEXT_PUBLIC_APP_SUB_TITLE}</title> */}
        </Helmet>
        {/* <InternetConnection /> */}
        {/* HEADER */}
        <ALink href="/">
          <Header logoName={"logo.png"} topClass="top-header" />
        </ALink>
        {/* HEADER Carousel */}
        <HeaderCarousel />
        {/* Search By Tags */}
        <SearchByTags />
        {/* Services We Offer */}
        <Services sectionClass="border-section noTopPadding" />
        <Featured
          spanClass={true}
          title="Choose, Communicate & Buy"
          designClass="tools-grey ratio_square"
          cartClass="cart-info cart-wrap"
          noSlider="true"
        />
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
          logoName={"logo-bg-white.png"}
          layoutClass={"dark-subfooter"}
        />
        <Settings />
    </>
  );
};

export async function getStaticProps() {
  const apiResponse = await fetch(`${process.env.NEXT_API_BASE_URL}api/homepage`);
  const jsonApiResponse = await apiResponse.json();
  return {
    props: {
      recommended: jsonApiResponse?.body?.recommended,
      brands: jsonApiResponse?.body?.brands,
      featured_categories: jsonApiResponse?.body?.featured_categories,
    }
  }
}
