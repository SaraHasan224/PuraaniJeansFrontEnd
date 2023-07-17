import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import Helmet from "react-helmet";

import Header from "../layouts/headers/header";
import Breadcrumbs from "./breadcrubs";
import Footer from "../layouts/footers/Footer";
// import InternetConnection from "../../features/internet-connection";

const CommonLayout = ({ children, title, parent, subTitle, showBreadcrumb }) => {
  const { meta } = useSelector((state) => state.metadata);

  return (
    <>
      {/* <InternetConnection /> */}
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={ meta?.favicon } />
          <title>
            { meta?.app_title }
          </title>
      </Helmet>
      {/* HEADER */}
      <Header logoName={meta?.logo} topClass="top-header" />
      <Breadcrumbs title={title} parent={parent} subTitle={subTitle} />
      {children}
      <Footer
        footerClass={`footer-dark`}
        footerLayOut={"light-layout upper-footer bg-white"}
        footerSection={"border-section border-top-0 noTopPadding footer-section"}
        belowSection={"noTopPadding"}
        newLatter={true}
        logoName={meta?.logo_white}
        layoutClass={"dark-subfooter"}
      />
    </>
  );
};

export default CommonLayout;