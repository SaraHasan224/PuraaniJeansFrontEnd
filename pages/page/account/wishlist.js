import React from 'react';
import CommonLayout from '../../../components/layouts/common-layout';
import WishlistPage from './common/wishlist-page';


const Wishliat = () => {
    return (
        <CommonLayout parent="home" title="wishlist">
            <WishlistPage />
        </CommonLayout>
    )
}

export default Wishliat;