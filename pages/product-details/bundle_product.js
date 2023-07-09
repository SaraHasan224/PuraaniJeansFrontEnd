import React from "react";
import CommonLayout from "../../components/layouts/common-layout";
import ProductSection from "./common/product_section";
// import { withApollo } from "../../helpers/apollo/apollo";
import BundleProductPage from "./product/bundle_page.js";

const BundleProduct = () => {
  return (
    <CommonLayout parent="home" title="product">
      <BundleProductPage />
      <ProductSection />
    </CommonLayout>
  );
};

export default BundleProduct;
