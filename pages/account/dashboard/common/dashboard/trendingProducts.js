import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import {
    Media
} from "reactstrap";

import { CurrencyContext } from "../../../../../context/Currency/CurrencyContext";
import { HELPER } from '../../../../../utils';

const DetailView = ({ img, productName, price, sales }) => {
    return (
        <tr>
            <th scope="row">
                <Media src={img} className="blur-up lazyloaded" />
            </th>
            <td>{productName}</td>
            <td>{price}</td>
            <td>{sales}</td>
        </tr>
    );
};

const TrendingProducts = () => {
    const { trendingClosetProducts, recentClosetProducts } = useSelector((state) => state.closet);
    const curContext = useContext(CurrencyContext);
    const currency = curContext.state;

    return (
        <>
            <h3>trending products</h3>
            <table className="table mb-0 table-responsive-sm">
                <thead>
                    <tr>
                        <th scope="col">image</th>
                        <th scope="col">product name</th>
                        <th scope="col">price</th>
                        <th scope="col">sale price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        HELPER.isEmpty(trendingClosetProducts) ?
                            <tr>
                                <td colSpan={5}> No products found</td>
                            </tr> :
                            trendingClosetProducts.map((data, i) => {
                                return (
                                    <DetailView
                                        key={i}
                                        img={data.image}
                                        productName={data.name}
                                        price={currency.symbol + "" + data.price}
                                        sales={currency.symbol + "" + data.discounted_price}
                                    />
                                );
                            })}
                </tbody>
            </table>
        </>
    )
}

export default TrendingProducts;