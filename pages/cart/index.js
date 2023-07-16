import React from 'react';
import CommonLayout from '../../components/layouts/common-layout';
import CartPage from './cart-page';


const Wishliat = () => {
    return (
        <CommonLayout parent="home" title="cart">
            <CartPage />
        </CommonLayout>
    )
}

export default Wishliat;