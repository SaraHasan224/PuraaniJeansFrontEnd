import React, { Fragment, useContext } from "react";
import { Container } from "reactstrap";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import CartContext from "../../../context/cart/CartContext";
import Masonry from "react-masonry-css";
import ProductBox from "../modules/product-box";
import { CompareContext } from "../../../context/Compare/CompareContext";

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
        sale
        stock
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

const ClosetCollection = ({ type, col }) => {
  const cartContext = useContext(CartContext);
  const compareContext = useContext(CompareContext);
  const quantity = cartContext?.quantity;

//   var { data } = useQuery(GET_PRODUCTS, {
//     variables: {
//       type: type,
//       indexFrom: 0,
//       limit: 20,
//     },
//   });
    var data = []
  return (
    <Fragment>
      <section className="portfolio-section portfolio-padding metro-section port-col">
        <Container fluid={col == "full"}>
          <Masonry
            breakpointCols={col == "metro" ? 4 : 6}
            className="isotopeContainer row"
            columnClassName={`isotopeSelector ${
              col == "metro"
                ? "col-xl-3 col-sm-6"
                : "col-xl-2 col-lg-3 col-md-4 col-sm-6"
            }`}
          >
            {data &&
              data?.products?.items
                .slice(0, 20)
                .map((product, index) => (
                  <ProductBox
                    product={product}
                    addCart={() => cartContext.addToCart(product, quantity)}
                    addCompare={() => compareContext.addToCompare(product)}
                    key={index}
                  />
                ))}
          </Masonry>
        </Container>
      </section>
    </Fragment>
  );
};

export default ClosetCollection;
