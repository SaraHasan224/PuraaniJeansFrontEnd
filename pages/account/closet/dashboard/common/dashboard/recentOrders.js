import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { CurrencyContext } from "../../../../../../context/Currency/CurrencyContext";
import { HELPER } from '../../../../../../utils';

const DetailView = ({ id, productDetails, status }) => {
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{productDetails}</td>
            <td>{status}</td>
        </tr>
    );
};

const RecentOrders = () => {
    const { recentClosetProducts } = useSelector((state) => state.closet);
    const curContext = useContext(CurrencyContext);
    const currency = curContext.state;

    return (
        <>
            <h3>recent orders</h3>
            <table className="table mb-0">
                <thead>
                    <tr>
                        <th scope="col">order id</th>
                        <th scope="col">product details</th>
                        <th scope="col">status</th>
                    </tr>
                </thead>
                <tbody>
                    {HELPER.isEmpty(recentClosetProducts) ?
                        <tr>
                            <td colSpan={5}> No orders found</td>
                        </tr> : recentClosetProducts.slice(0, 5).map((data, i) => {
                            return (
                                <DetailView
                                    key={i}
                                    id={data.id}
                                    productDetails={data.productDetails}
                                    status={data.status}
                                />
                            );
                        })}
                </tbody>
            </table>
        </>
    )
}

export default RecentOrders;