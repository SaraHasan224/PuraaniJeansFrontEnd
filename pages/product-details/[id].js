import React from 'react';
import { useRouter } from 'next/router'
import CommonLayout from '../../components/layouts/common-layout';
// import { withApollo } from '../../helpers/apollo/apollo';
import LeftImagePage from './product/leftImagePage';
import ProductTab from './common/product-tab';
import ProductSection from './common/product_section';

const LeftSidebar = () => {
  const router = useRouter();
  const id = router.query.id;

  return (
    <CommonLayout parent="Home" title="Product">
      <LeftImagePage pathId={id} />
      <ProductTab />
      <ProductSection />
    </CommonLayout>
  );
}


export default LeftSidebar;