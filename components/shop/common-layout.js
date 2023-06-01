import React from "react";
import Helmet from "react-helmet";

import Header from "../headers/header";
import Breadcrubs from "../common/widgets/breadcrubs";
import Footer from "../footers/Footer";
import Settings from "../customizer/settings";
// import InternetConnection from "../../features/internet-connection";

const CommonLayout = ({ children, title, parent, subTitle, showBreadcrumb }) => {
  return (
    <>
      {/* <InternetConnection /> */}
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={"/my-assets/images/icons/favicon.png"} />
        <title>{process.env.NEXT_PUBLIC_APP_NAME} - {process.env.NEXT_PUBLIC_APP_SUB_TITLE}</title>
      </Helmet>
      {/* HEADER */}
      <Header logoName={"logo.png"} topClass="top-header" />
      <Breadcrubs title={title} parent={parent} subTitle={subTitle} />
      {children}
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

export default CommonLayout;
