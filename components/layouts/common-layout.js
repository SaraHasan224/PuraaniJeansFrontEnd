import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Helmet from "react-helmet";

import Header from "../layouts/headers/header";
import Breadcrumbs from "./breadcrubs";
import Footer from "../layouts/footers/Footer";
import { HELPER } from "../../utils";
import { HOMEPAGE_ACTIONS } from "../../store/actions";
// import InternetConnection from "../../features/internet-connection";

const CommonLayout = ({ children, title, parent, subTitle, showBreadcrumb }) => {
  const dispatch = useDispatch();

  const { meta, mainMenuCategories } = useSelector((state) => state.metadata);

  useEffect(() => {
    if(HELPER.isEmpty(meta?.app_title)) {
      dispatch(HOMEPAGE_ACTIONS.FETCH_HOMEPAGE_APP_METADATA())
    }
    if(HELPER.isEmpty(mainMenuCategories)) {
      dispatch(HOMEPAGE_ACTIONS.GET_MEGA_MENU_CONTENTS());
    }
  }, []);


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
      { showBreadcrumb ? <Breadcrumbs title={title} parent={parent} subTitle={subTitle} /> : "" }
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
