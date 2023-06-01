import React, { Fragment, useState, useContext } from "react";
import Slider from "react-slick";
import { useQuery } from "@apollo/client";
import { gql } from '@apollo/client';
import ProductItem from "../product-box/ProductBox12";
import CartContext from "../../../helpers/cart/index";
import { Container, Media, Col, Row } from "reactstrap";
import banner from "../../../public/assets/images/tools/banner.jpg";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import { Product4 } from "../../../services/script";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import LeftCollection from "./LeftCollection";
import ProductSection from "../Collections/Collection10";

import one from "../../../public/assets/images/collection/1.jpg";
import three from "../../../public/assets/images/collection/3.jpg";
import five from "../../../public/assets/images/collection/5.jpg";
import six from "../../../public/assets/images/collection/6.jpg";
import seven from "../../../public/assets/images/collection/7.jpg";
import eight from "../../../public/assets/images/collection/8.jpg";
import nine from "../../../public/assets/images/collection/9.jpg";
import eleven from "../../../public/assets/images/collection/11.jpg";

const GET_PRODUCTS = gql`
query products($type: _CategoryType!, $indexFrom: Int!, $limit: Int!) {
products(type: $type, indexFrom: $indexFrom, limit: $limit) {
items {
id
title
description
type
brand
category
price
new
stock
sale
discount
variants {
id
sku
size
color
image_id
}
images {
image_id
id
alt
src
}
}
}
}
`;

const MasterCollectionData = [
  {
    img: one,
    totalProducts: "(20 Products)",
    type: "fashion",
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry....",
    link: "#",
    btn: "shop now !",
  },
  {
    img: three,
    totalProducts: "(20 Products)",
    type: "fashion",
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry....",
    link: "#",
    btn: "shop now !",
  },
  {
    img: five,
    totalProducts: "(20 Products)",
    type: "fashion",
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry....",
    link: "#",
    btn: "shop now !",
  },
  {
    img: six,
    totalProducts: "(20 Products)",
    type: "fashion",
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry....",
    link: "#",
    btn: "shop now !",
  },
  {
    img: seven,
    totalProducts: "(20 Products)",
    type: "fashion",
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry....",
    link: "#",
    btn: "shop now !",
  },
  {
    img: eight,
    totalProducts: "(20 Products)",
    type: "fashion",
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry....",
    link: "#",
    btn: "shop now !",
  },
  {
    img: nine,
    totalProducts: "(20 Products)",
    type: "fashion",
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry....",
    link: "#",
    btn: "shop now !",
  },
  {
    img: eleven,
    totalProducts: "(20 Products)",
    type: "fashion",
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry....",
    link: "#",
    btn: "shop now !",
  },
];

const TabContent = ({ data, cartClass, spanClass, startIndex, endIndex }) => {
  const context = useContext(CartContext);
  const compareContext = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  return (
    <>
      <Slider {...Product4} className="product-4 product-m no-arrow">
        {data &&
          data.products.items
            .slice(startIndex, endIndex)
            .map((product, i) => (
              <ProductItem product={product} spanClass={spanClass} addToCompare={() => compareContext.addToCompare(product)}
                addCart={() => context.addToCart(product)}
                key={i}
                cartClass={cartClass}
              />
            ))}
      </Slider>
    </>
  );
};

const MasterCollection = ({ img, totalProducts, type, about, link, btn }) => {
  return (
    <Col lg="3" md="6">
      <div className="collection-block">
        <div>
          <Media src={img} className="img-fluid blur-up lazyload bg-img" alt="" />
        </div>
        <div className="collection-content">
          <h5>{type}</h5>
          <a href={link} className="btn btn-xs btn-outline noTopPadding noBtmPadding">
            {btn}
          </a>
        </div>
      </div>
    </Col>
  );
};

const Featured = ({ title, type, designClass, cartClass, spanClass }) => {
  const [activeTab, setActiveTab] = useState(type);
  const context = useContext(CartContext);
  const compareContext = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;

  // var { data } = useQuery(GET_PRODUCTS, {
  //   variables: {
  //     type: activeTab,
  //     indexFrom: 0,
  //     limit: 8,
  //   },
  // });
  var data =[];
  return (
    <Fragment>
      <section className="tools_product">
        <Container>
          <Row className="multiple-slider mb-3">
            <Col xl="12" lg="12" md="12">
              <div className="title2 text-start">
                <h2 className="title-inner1">{title}</h2>
              </div>
            </Col>
          </Row>
          <Row className="multiple-slider">
            <Col xl="3" lg="4" md="12">
              <LeftCollection type={type} product={4} />
            </Col>
            <Col xl="9" lg="8" md="12" className={designClass}>
              <Container className="p-0">
                {/* <ProductSection type="marketplace" /> */}-
                <section className="collection section-b-space ratio_square noTopPadding">
                  <Container>
                    <Row className="partition-collection">
                      {MasterCollectionData.slice(0, 4).map((data, i) => {
                        return (
                          <MasterCollection key={i} img={data.img.src} totalProducts={data.totalProducts} type={data.type}
                            about={data.about} link={data.link} btn={data.btn} />
                        );
                      })}
                    </Row>
                  </Container>
                </section>
              </Container>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default Featured;