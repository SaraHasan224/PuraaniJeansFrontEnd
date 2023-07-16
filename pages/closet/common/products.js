import React, { useState } from 'react';

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

const AllProduct = ({ img, productName, category, price, stock, sales }) => {
    return (
        <tr>
            <th scope="row">
                <Media src={img} className="blur-up lazyloaded" />
            </th>
            <td>{productName}e</td>
            <td>{category}</td>
            <td>{price}</td>
            <td>{stock}</td>
            <td>{sales}</td>
            <td>
                <i className="fa fa-pencil-square-o me-1" aria-hidden="true"></i>
                <i className="fa fa-trash-o ms-1" aria-hidden="true"></i>
            </td>
        </tr>
    );
};

const ProductList = () => {
    return (
        <table className="table-responsive-md table mb-0">
            <thead>
                <tr>
                    <th scope="col">image</th>
                    <th scope="col">product name</th>
                    <th scope="col">category</th>
                    <th scope="col">price</th>
                    <th scope="col">stock</th>
                    <th scope="col">sales</th>
                    <th scope="col">edit/delete</th>
                </tr>
            </thead>
            <tbody>
                {ProductData.map((data, i) => {
                    return (
                        <AllProduct key={i} img={data.img.src} productName={data.productName} category={data.category}
                            stock={data.stock} price={data.price} sales={data.sales} />
                    );
                })}
            </tbody>
        </table>
    );
}

const AddNewProduct = () => {
    return (
        <table className="table-responsive-md table mb-0">
            <thead>
                <tr>
                    <th scope="col">image</th>
                    <th scope="col">product name</th>
                    <th scope="col">category</th>
                    <th scope="col">price</th>
                    <th scope="col">stock</th>
                    <th scope="col">sales</th>
                    <th scope="col">edit/delete</th>
                </tr>
            </thead>
            <tbody>
                {ProductData.map((data, i) => {
                    return (
                        <AllProduct key={i} img={data.img.src} productName={data.productName} category={data.category}
                            stock={data.stock} price={data.price} sales={data.sales} />
                    );
                })}
            </tbody>
        </table>
    );
}

const ProductsTab = ({ active, setActive }) => {
    const [addProducts, setAddProducts] = useState(false);

    return (
        <TabPane tabId="2">
            <Row>
                <Col sm="12">
                    <Card className="dashboard-table mt-0">
                        <CardBody>
                            <div className="top-sec">
                                <h3>all products</h3>
                                <a onClick={() => setAddProducts(!addProducts)} className="btn btn-sm btn-solid">
                                    {!addProducts ? "add product" : "back"}
                                </a>
                            </div>
                            {!addProducts ? <ProductList/> : <AddNewProduct/>}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </TabPane>
    )
}

export default ProductsTab;