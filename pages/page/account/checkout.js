import React, { useEffect, useState } from 'react';

import CommonLayout from '../../../components/layouts/common-layout';
import withPrivateRoute  from '../../../hoc/auth/withPrivateRoute';
import CheckoutPage from './checkout-page';


const Checkout = () => {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'));
    useEffect(() => {
        setCurrentUser(localStorage.getItem('user'))
    }, [localStorage.getItem('user')])
    return (
        <CommonLayout parent="home" title="checkout">
            <CheckoutPage />
        </CommonLayout>
    )
}

export default Checkout;
// export default withPrivateRoute(Checkout);