import React, { useContext, useState, useEffect } from 'react';
import { Col, Container, Row, Media } from 'reactstrap';
import ProductItem from "./featured-products";
import CartContext from "../../../context/cart";
import { WishlistContext } from "../../../context/wishlist/WishlistContext";
import { CompareContext } from "../../../context/Compare/CompareContext";

export default function FeaturedByCollection(props) {
  const {
    sections
  } = props.featured;

  const context = useContext(CartContext)
  const contextWishlist = useContext(WishlistContext);
  const contextCompare = useContext(CompareContext);
  const quantity = context.quantity;


  const [activeCollectionIndex, setActiveCollectionIndex] = useState(0);
  const [activeCollectionProductList, setActiveCollectionProductList] = useState([]);

  useEffect(() => {
    setActiveCollectionProductList(sections[activeCollectionIndex].data);
  }, []);

  useEffect(() => {
    setActiveCollectionProductList(sections[activeCollectionIndex].data);
  }, [activeCollectionIndex]);

  return (
    <Row className="multiple-slider" key={"key"}>
      <Col xl="3" lg="4" md="12" sm="12" className="featured-menu">
        <div className={`theme-card`}>
          {sections.map((data, i) => {
            return (
              <h5
                className={`title-border ${activeCollectionIndex === i ? "active" : ""}`}
                onClick={() => setActiveCollectionIndex(i)}
                key={"title-border-"+i}
              >
                {data?.title}
              </h5>
            );
          })}
        </div>
      </Col>
      <Col xl="9" lg="8" md="12" sm="12" className={"tools-grey ratio_square featured-section"}>
        <Container className="p-0">
          <section className="collection section-b-space ratio_square noTopPadding">
            <Container className=' mb-3'>
              <Row className="partition-collection">
                {activeCollectionProductList.map((data, key) => {
                  return (
                    <Col lg="3" md="6" sm="6" xs="12" className='mb-3'>
                      <div key={key}>
                        <ProductItem
                          product={data}
                          addToCompare={() =>
                            contextCompare.addToCompare(data)
                          }
                          addWishlist={() => {
                            return contextWishlist.addToWish(data)
                          }}
                          addCart={() => context.addToCart(data, quantity)}
                        />
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </section>
        </Container>
      </Col>
    </Row>
  )
}
