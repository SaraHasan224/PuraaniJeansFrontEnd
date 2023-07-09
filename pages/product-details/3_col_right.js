import React from "react";
import CommonLayout from "../../components/layouts/common-layout";
import ProductSection from "./common/product_section";
// import { withApollo } from "../../helpers/apollo/apollo";
import ThreeColRightPage from "./product/3_col_right_page";

const ThreeColRight = () => {
  return (
    <CommonLayout parent="home" title="product">
      <ThreeColRightPage />
      <ProductSection />
    </CommonLayout>
  );
};

export default ThreeColRight;
