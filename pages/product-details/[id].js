import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';

import CommonLayout from '../../components/layouts/common-layout';
import LeftImagePage from './product/leftImagePage';
import ProductTab from './common/product-tab';
import ProductSection from './common/product_section';
import { PRODUCT_ACTIONS } from '../../store/actions';

const LeftSidebar = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const id = router.query.id;

  const { customerRef } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(PRODUCT_ACTIONS.GET_PRODUCT_DETAIL(id));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(PRODUCT_ACTIONS.GET_PRODUCT_DETAIL(id));
  }, [id]);

  return (
    <CommonLayout parent="Home" title="Product">
      <LeftImagePage pathId={id} />
      <ProductTab />
      { customerRef ? <ProductSection customerRef={customerRef} /> : "" }
    </CommonLayout>
  );
}


export default LeftSidebar;