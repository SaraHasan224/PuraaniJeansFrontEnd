import React from "react";
import CommonLayout from "../../components/layouts/common-layout";
import ImageSwatchPage from "./product/ImageSwatchPage";
// import { withApollo } from "../../helpers/apollo/apollo";

const ImageSwatch = () => {
  return (
    <CommonLayout parent="home" title="product">
      <ImageSwatchPage />
    </CommonLayout>
  );
};

export default ImageSwatch;
