import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import ProductItem from '../product-box/ProductBox11';
import CartContext from '../../../helpers/cart';
import PostLoader from '../PostLoader'
import { CompareContext } from '../../../helpers/Compare/CompareContext';


const GET_PRODUCTS = gql`
    query  products($type:_CategoryType!,$indexFrom:Int! ,$limit:Int!) {
        products (type: $type,indexFrom:$indexFrom ,limit:$limit){
            items {
                id
                title
                description
                type
                brand
                category 
                price
                new
                picture
                stock
                sale
                discount
                variants{
                    id
                    sku
                    size
                    color
                    image_id
                }
                images{
                    image_id
                    id
                    alt
                    src
                }
            }
        }
    }
`;

const CollectionTen = ({ type }) => {
    const context = useContext(CartContext)
    const compareContext = useContext(CompareContext);
    const quantity = context.quantity;

    var { loading, data } = useQuery(GET_PRODUCTS, {
        variables: {
            type: type,
            indexFrom: 0,
            limit: 12
        }
    });

    return (
        <>
            <section className="section-b-space p-t-0 ratio_asos">
                <Container>
                    <Row className="game-product grid-products">
                        {
                            data && data.slice(0, 12).map((product, index) => {
                                console.log(product)
                                return (
                                    <Col xl="3" md="6" sm="12" key={index}>
                                        <ProductItem product={product}
                                            addToCompare={() => compareContext.addToCompare(product)}
                                            key={index}
                                            addCart={() => context.addToCart(product, quantity)} />
                                    </Col>);
                            })
                        }
                        {(!data || !data.products || !data.products.items || data.products.items.length === 0 || loading) ?
                            <div className="row mx-0 margin-default d-none">
                                <div className="col-xl-3 col-lg-4 col-6">
                                    <PostLoader />
                                </div>
                                <div className="col-xl-3 col-lg-4 col-6">
                                    <PostLoader />
                                </div>
                                <div className="col-xl-3 col-lg-4 col-6">
                                    <PostLoader />
                                </div>
                                <div className="col-xl-3 col-lg-4 col-6">
                                    <PostLoader />
                                </div>
                            </div>
                            :
                            data && data.products.items.slice(0, 12).map((product, index) => {
                                console.log(product)
                                return (
                                    <Col xl="4" md="6" sm="12" key={index} className='mb-3'>
                                        <ProductItem product={product}
                                            addToCompare={() => compareContext.addToCompare(product)}
                                            key={index}
                                            addCart={() => context.addToCart(product, quantity)} />
                                    </Col>);
                            })
                        }

                    </Row>
                </Container>
            </section>
        </>
    )
}

export default CollectionTen;