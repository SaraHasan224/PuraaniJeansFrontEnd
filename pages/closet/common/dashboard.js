import React from 'react';

import {
    Row,
    Col,
    Card,
    CardBody,
    Media,
    TabPane,
} from "reactstrap";

import one from "../../../public/assets/images/dashboard/product/1.jpg";
import nine from "../../../public/assets/images/dashboard/product/9.jpg";
import thirtyfour from "../../../public/assets/images/pro3/34.jpg";
import pro1 from "../../../public/assets/images/pro3/1.jpg";
import pro27 from "../../../public/assets/images/pro3/27.jpg";
import pro36 from "../../../public/assets/images/pro3/36.jpg";

const ProductData = [
    {
        img: one,
        productName: "Neck Velvet Dress	",
        category: "Women Clothes",
        price: "$205",
        stock: "1000",
        sales: "2000",
    },
    {
        img: nine,
        productName: "Belted Trench Coat		",
        category: "Women Clothes",
        price: "$350",
        stock: "800",
        sales: "350",
    },
    {
        img: thirtyfour,
        productName: "Men Print Tee",
        category: "Men Clothes",
        price: "$150",
        stock: "750",
        sales: "150",
    },
    {
        img: pro1,
        productName: "Woman Print Tee",
        category: "Women Clothes",
        price: "$150",
        stock: "750",
        sales: "150",
    },
    {
        img: pro27,
        productName: "Men Print Tee",
        category: "Men Clothes",
        price: "$150",
        stock: "750",
        sales: "150",
    },
    {
        img: pro36,
        productName: "Men Print Tee",
        category: "Men Clothes",
        price: "$150",
        stock: "750",
        sales: "150",
    },
];
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
                                        <th scope="col">sales</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ProductData.slice(0, 3).map((data, i) => {
                                        return (
                                            <TrendingProduct
                                                key={i}
                                                img={data.img.src}
                                                productName={data.productName}
                                                price={data.price}
                                                sales={data.sales}
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
                                    {OrderData.slice(0, 5).map((data, i) => {
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