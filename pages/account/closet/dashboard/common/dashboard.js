import React, { useContext,  } from 'react';
import { useSelector } from 'react-redux';

import {
    Row,
    Col,
    Card,
    CardBody,
    Media,
    TabPane,
} from "reactstrap";
import { CurrencyContext } from "../../../../../context/Currency/CurrencyContext";

const RecentOrder = ({ id, productDetails, status }) => {
    return (
      <tr>
        <th scope="row">{id}</th>
        <td>{productDetails}</td>
        <td>{status}</td>
      </tr>
    );
  };
  
const TrendingProduct = ({ img, productName, price, sales }) => {
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

const DashboardTab = ({ active, setActive }) => {
    const {  trendingClosetProducts, recentClosetProducts  } = useSelector((state) => state.closet);
    const curContext = useContext(CurrencyContext);
    const currency = curContext.state;

    return (
        <TabPane tabId="1">
            <Row>
                <Col lg="6">
                    <Card className="dashboard-table">
                        <CardBody>
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
                                    {trendingClosetProducts.map((data, i) => {
                                        return (
                                            <TrendingProduct
                                                key={i}
                                                img={data.image}
                                                productName={data.name}
                                                price={currency.symbol +""+ data.price}
                                                sales={currency.symbol +""+ data.discounted_price}
                                            />
                                        );
                                    })}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="6">
                    <Card className="dashboard-table">
                        <CardBody>
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
                                    {recentClosetProducts.slice(0, 5).map((data, i) => {
                                        return (
                                            <RecentOrder
                                                key={i}
                                                id={data.id}
                                                productDetails={data.productDetails}
                                                status={data.status}
                                            />
                                        );
                                    })}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </TabPane>
    )
}

export default DashboardTab;