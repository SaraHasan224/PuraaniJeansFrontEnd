import React from 'react';

import {
    Row,
    Col,
    Card,
    CardBody,
    TabPane,
} from "reactstrap";
import { HELPER } from '../../../../utils';

const OrderData = [
    {
        id: "#125021",
        productDetails: "Neck Velvet Dress",
        status: "Shipped",
        price: "$205",
    },
    {
        id: "#521214",
        productDetails: "Belted Trench Coat",
        status: "Shipped",
        price: "$350",
    },
    {
        id: "#521021",
        productDetails: "Men Print Tee",
        status: "pending",
        price: "$150",
    },
    {
        id: "#245021",
        productDetails: "Woman Print Tee",
        status: "Shipped",
        price: "$150",
    },
    {
        id: "#122141",
        productDetails: "Men Print Tee",
        status: "canceled",
        price: "$150",
    },
    {
        id: "#125015",
        productDetails: "Men Print Tee",
        status: "pending",
        price: "$150",
    },
    {
        id: "#245021",
        productDetails: "women print tee",
        status: "Shipped",
        price: "$150",
    },
    {
        id: "#122141",
        productDetails: "men print tee",
        status: "canceled",
        price: "$150",
    },
    {
        id: "#125015",
        productDetails: "men print tee",
        status: "pending",
        price: "$150",
    },
];

const AllOrder = ({ id, productDetails, status, price }) => {
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{productDetails}</td>
            <td>{status}</td>
            <td>{price}</td>
        </tr>
    );
};

const OrdersTab = ({ active, setActive }) => {
    return (
        <TabPane tabId="3">
            <Row>
                <Col sm="12">
                    <Card className="dashboard-table mt-0">
                        <CardBody>
                            <div className="top-sec">
                                <h3>orders</h3>
                                <a href="#" className="btn btn-sm btn-solid">
                                    add product
                                </a>
                            </div>
                            <table className="table table-responsive-sm mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">order id</th>
                                        <th scope="col">product details</th>
                                        <th scope="col">status</th>
                                        <th scope="col">price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {HELPER.isEmpty(OrderData) ?
                                        <tr>
                                            <td colSpan={4}> No orders found</td>
                                        </tr> : OrderData.map((data, i) => {
                                            return (
                                                <AllOrder key={i} id={data.id} productDetails={data.productDetails} status={data.status}
                                                    price={data.price} />
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

export default OrdersTab;