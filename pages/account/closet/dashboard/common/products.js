import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    Row,
    Col,
    Card,
    CardBody,
    Media,
    TabPane,
} from "reactstrap";

import Pagination from "react-js-pagination";
import { CLOSET_ACTIONS } from '../../../../../store/actions';
import { HELPER } from '../../../../../utils';
import ALink from '../../../../../features/alink';

const ProductCatalog = ({ product }) => {
    return (
        <tr>
            <th scope="row">
                <Media src={product?.image} className="blur-up lazyloaded" />
            </th>
            <td>{product?.name}</td>
            <td>{product?.category_name}</td>
            <td>{product?.price}</td>
            <td>{product?.discounted_price}</td>
            <td>{product?.max_quantity}</td>
            <td>
                <i className="fa fa-pencil-square-o me-1" aria-hidden="true"></i>
                <i className="fa fa-trash-o ms-1" aria-hidden="true"></i>
            </td>
        </tr>
    );
};

const ProductCatalogList = () => {
    const dispatch = useDispatch()
    const { closetDataLoading, closetAllProductsData, closetAllProducts } = useSelector((state) => state.closet);
    const { products } = closetAllProducts;
    const [currentPage, setCurrentPage] = useState(products?.current_page);
    const { closetRef } = useSelector((state) => state.auth);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch(CLOSET_ACTIONS.GET_CLOSET_PRODUCTS_PAGINATED_DATA(closetRef, pageNumber));
    };

    return (
        closetDataLoading ? (
            <p>Loading...</p>
        ) : (
            <table className="table-responsive-md table mb-0">
                <thead>
                    <tr>
                        <th scope="col">image</th>
                        <th scope="col">product name</th>
                        <th scope="col">category</th>
                        <th scope="col">price</th>
                        <th scope="col">Discounted Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        HELPER.isEmpty(closetAllProductsData) ?
                            <tr>
                                <td colSpan={7}> No products found</td>
                            </tr> :
                            closetAllProductsData.map((data, i) => {
                                return (
                                    <ProductCatalog key={`catalog-all-products-${i}`} product={data} />
                                );
                            })}
                </tbody>
                {HELPER.isNotEmpty(closetAllProductsData) ?? <tfoot>
                    <div className="pagination-background">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={products?.per_page}
                            totalItemsCount={products?.total}
                            pageRangeDisplayed={Math.ceil(Number(products?.total) / Number(products?.per_page))}
                            onChange={handlePageChange}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                    </div>
                </tfoot>
                }
            </table>
        )
    );
}

const ProductsTab = () => {
    const { closetRef } = useSelector((state) => state.auth);
    
    return (
        <TabPane tabId="2">
            <Row>
                <Col sm="12">
                    <Card className="dashboard-table mt-0">
                        <CardBody>
                            <div className="top-sec">
                                <h3>All products</h3>
                                <ALink href={`/account/closet/dashboard/${closetRef}/add-product`} className="btn btn-sm btn-solid">
                                add product
                                </ALink>
                            </div>
                            <ProductCatalogList />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </TabPane>
    )
}

export default ProductsTab;