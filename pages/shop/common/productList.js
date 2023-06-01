import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";

import { Col, Row, Media, Button, Spinner } from "reactstrap";

import ProductItem from "../../../components/common/product-box/ProductBox1";
import PostLoader from "../../../components/common/PostLoader";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import FilterContext from "../../../helpers/filter/FilterContext";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import CartContext from "../../../helpers/cart";
import ShopBreadcrumb from "./breadcrumb";
import ALink from "../../../features/alink";


// const GET_PRODUCTS = gql`
// query products($type: _CategoryType!, $indexFrom: Int!, $limit: Int!) {
// products(type: $type, indexFrom: $indexFrom, limit: $limit) {
// items {
// id
// title
// description
// type
// brand
// category
// price
// new
// stock
// sale
// discount
// variants {
// id
// sku
// size
// color
// image_id
// }
// images {
// image_id
// id
// alt
// src
// }
// }
// }
// }
// `;
const GET_PRODUCTS = {
  "products": {
    "current_page": 1,
    "data": [
      {
        "id": 174,
        "name": "Assignment Sheets",
        "listing_type": 0,
        "list_type": 1,
        "listing_slug": "",
        "discount": 0,
        "price": 199,
        "discounted_price": 199,
        "discount_badge": {
          "show": 1,
          "discount": 0,
          "type": 1
        },
        "max_quantity": 99,
        "has_variants": 1,
        "image": "https://bsecure-dev-images.imgix.net/merchants/products/961/1646663633.png?auto=compress&w=300",
        "position": 0,
        "variant_count": 4,
        "attribute_count": 0,
        "default_variant_id": 464,
        "category_name": null,
        "category_id": null,
        "sub_category_name": null,
        "sub_category_id": null,
        "merchant_name": "My company",
        "store_name": "test store",
        "store_slug": "ST-008332794",
        "store_favicon": "",
        "store_website": "",
        "store_disabled": 1,
        "store_disabled_note": ""
      },
      {
        "id": 184,
        "name": "Apple Golden 660g",
        "listing_type": 0,
        "list_type": 1,
        "listing_slug": "",
        "discount": 0,
        "price": 120,
        "discounted_price": 120,
        "discount_badge": {
          "show": 1,
          "discount": 0,
          "type": 1
        },
        "max_quantity": 50,
        "has_variants": 0,
        "image": "https://bsecure-dev-images.imgix.net/merchants/products/51/1646663661.png?auto=compress&w=300",
        "position": 0,
        "variant_count": 1,
        "attribute_count": 0,
        "default_variant_id": 474,
        "category_name": null,
        "category_id": null,
        "sub_category_name": null,
        "sub_category_id": null,
        "merchant_name": "My company",
        "store_name": "Production store",
        "store_slug": "ST-009997",
        "store_favicon": "https://bsecure-dev-images.imgix.net/https://bsecure-dev-images.imgix.net/dev/merchants/branding/51/favicon-961.jpg?auto=compress&w=200?auto=compress&w=200",
        "store_website": "https://bsecure-dev-images.imgix.net/https://bsecure-dev-images.imgix.net/dev/merchants/branding/51/favicon-961.jpg?auto=compress&w=200?auto=compress&w=200",
        "store_disabled": 1,
        "store_disabled_note": ""
      },
      {
        "id": 194,
        "name": "Celebrate Balloons",
        "listing_type": 0,
        "list_type": 1,
        "listing_slug": "",
        "discount": 0,
        "price": 100,
        "discounted_price": 100,
        "discount_badge": {
          "show": 1,
          "discount": 0,
          "type": 1
        },
        "max_quantity": 99,
        "has_variants": 1,
        "image": "https://bsecure-dev-images.imgix.net/merchants/products/51/1646663878.png?auto=compress&w=300",
        "position": 0,
        "variant_count": 18,
        "attribute_count": 0,
        "default_variant_id": 514,
        "category_name": null,
        "category_id": null,
        "sub_category_name": null,
        "sub_category_id": null,
        "merchant_name": "My company",
        "store_name": "Fareen's Store",
        "store_slug": "ST-007083734",
        "store_favicon": "",
        "store_website": "",
        "store_disabled": 1,
        "store_disabled_note": ""
      },
      {
        "id": 204,
        "name": "Joy Sweet Wedding Balloons",
        "listing_type": 0,
        "list_type": 1,
        "listing_slug": "",
        "discount": 0,
        "price": 200,
        "discounted_price": 200,
        "discount_badge": {
          "show": 1,
          "discount": 0,
          "type": 1
        },
        "max_quantity": 99,
        "has_variants": 1,
        "image": "https://bsecure-dev-images.imgix.net/merchants/products/51/1646665879.png?auto=compress&w=300",
        "position": 0,
        "variant_count": 3,
        "attribute_count": 0,
        "default_variant_id": 694,
        "category_name": null,
        "category_id": null,
        "sub_category_name": null,
        "sub_category_id": null,
        "merchant_name": "My company",
        "store_name": "Fareen's Store",
        "store_slug": "ST-007083734",
        "store_favicon": "",
        "store_website": "",
        "store_disabled": 1,
        "store_disabled_note": ""
      },
      {
        "id": 214,
        "name": "4 Flower Candle",
        "listing_type": 0,
        "list_type": 1,
        "listing_slug": "",
        "discount": 150,
        "price": 400,
        "discounted_price": 250,
        "discount_badge": {
          "show": 1,
          "discount": 150,
          "type": 1
        },
        "max_quantity": 99,
        "has_variants": 1,
        "image": "https://bsecure-dev-images.imgix.net/merchants/products/51/1646665966.png?auto=compress&w=300",
        "position": 0,
        "variant_count": 4,
        "attribute_count": 0,
        "default_variant_id": 724,
        "category_name": null,
        "category_id": null,
        "sub_category_name": null,
        "sub_category_id": null,
        "merchant_name": "My company",
        "store_name": "Fareen's Store",
        "store_slug": "ST-007083734",
        "store_favicon": "",
        "store_website": "",
        "store_disabled": 1,
        "store_disabled_note": ""
      },
      {
        "id": 224,
        "name": "T-Shirt Blue",
        "listing_type": 0,
        "list_type": 1,
        "listing_slug": "",
        "discount": 0,
        "price": 1200,
        "discounted_price": 1200,
        "discount_badge": {
          "show": 1,
          "discount": 0,
          "type": 1
        },
        "max_quantity": 50,
        "has_variants": 1,
        "image": "https://bsecure-dev-images.imgix.net/merchants/products/51/1646666114.png?auto=compress&w=300",
        "position": 0,
        "variant_count": 6,
        "attribute_count": 0,
        "default_variant_id": 764,
        "category_name": null,
        "category_id": null,
        "sub_category_name": null,
        "sub_category_id": null,
        "merchant_name": "My company",
        "store_name": "Production store",
        "store_slug": "ST-009997",
        "store_favicon": "https://bsecure-dev-images.imgix.net/https://bsecure-dev-images.imgix.net/dev/merchants/branding/51/favicon-961.jpg?auto=compress&w=200?auto=compress&w=200",
        "store_website": "https://bsecure-dev-images.imgix.net/https://bsecure-dev-images.imgix.net/dev/merchants/branding/51/favicon-961.jpg?auto=compress&w=200?auto=compress&w=200",
        "store_disabled": 1,
        "store_disabled_note": ""
      },
      {
        "id": 9644,
        "name": "lipton tea bags",
        "listing_type": 0,
        "list_type": 1,
        "listing_slug": "",
        "discount": 0,
        "price": 1000,
        "discounted_price": 1000,
        "discount_badge": {
          "show": 1,
          "discount": 0,
          "type": 1
        },
        "max_quantity": 990,
        "has_variants": 0,
        "image": "https://bsecure-dev-images.imgix.net/merchants/products/7554/28894093541476.png?auto=compress&w=300",
        "position": 0,
        "variant_count": 1,
        "attribute_count": 1,
        "default_variant_id": 11444,
        "category_name": null,
        "category_id": null,
        "sub_category_name": null,
        "sub_category_id": null,
        "merchant_name": "My company",
        "store_name": "Shopify gateway store",
        "store_slug": "ST-004154704",
        "store_favicon": "https://bsecure-dev-images.imgix.net/https://bsecure-dev-images.imgix.net/dev/merchants/branding/7554/favicon-47041644239867.png?auto=compress&w=200?auto=compress&w=200",
        "store_website": "https://bsecure-dev-images.imgix.net/https://bsecure-dev-images.imgix.net/dev/merchants/branding/7554/favicon-47041644239867.png?auto=compress&w=200?auto=compress&w=200",
        "store_disabled": 1,
        "store_disabled_note": ""
      },
      {
        "id": 9664,
        "name": "test product",
        "listing_type": 0,
        "list_type": 1,
        "listing_slug": "",
        "discount": 0,
        "price": 1000,
        "discounted_price": 1000,
        "discount_badge": {
          "show": 1,
          "discount": null,
          "type": null
        },
        "max_quantity": 6,
        "has_variants": 0,
        "image": "https://bsecure-dev-images.imgix.net/assets/placeholder/product_image_placeholder.jpg?auto=compress&w=300",
        "position": 0,
        "variant_count": 1,
        "attribute_count": 1,
        "default_variant_id": 11464,
        "category_name": null,
        "category_id": null,
        "sub_category_name": null,
        "sub_category_id": null,
        "merchant_name": "My company",
        "store_name": "Shopify gateway store",
        "store_slug": "ST-004154704",
        "store_favicon": "https://bsecure-dev-images.imgix.net/https://bsecure-dev-images.imgix.net/dev/merchants/branding/7554/favicon-47041644239867.png?auto=compress&w=200?auto=compress&w=200",
        "store_website": "https://bsecure-dev-images.imgix.net/https://bsecure-dev-images.imgix.net/dev/merchants/branding/7554/favicon-47041644239867.png?auto=compress&w=200?auto=compress&w=200",
        "store_disabled": 1,
        "store_disabled_note": ""
      },
      {
        "id": 10004,
        "name": "LED New Best Fairy Lights",
        "listing_type": 0,
        "list_type": 1,
        "listing_slug": "",
        "discount": 0,
        "price": 100,
        "discounted_price": 100,
        "discount_badge": {
          "show": 1,
          "discount": 0,
          "type": 1
        },
        "max_quantity": 99,
        "has_variants": 0,
        "image": "https://bsecure-dev-images.imgix.net/merchants/products/51/1646710933.png?auto=compress&w=300",
        "position": 0,
        "variant_count": 1,
        "attribute_count": 0,
        "default_variant_id": 12044,
        "category_name": null,
        "category_id": null,
        "sub_category_name": null,
        "sub_category_id": null,
        "merchant_name": "My company",
        "store_name": "Fareen's Store",
        "store_slug": "ST-007083734",
        "store_favicon": "",
        "store_website": "",
        "store_disabled": 1,
        "store_disabled_note": ""
      },
      {
        "id": 10014,
        "name": "Smile Party Birthday Candle",
        "listing_type": 0,
        "list_type": 1,
        "listing_slug": "",
        "discount": 0,
        "price": 100,
        "discounted_price": 100,
        "discount_badge": {
          "show": 1,
          "discount": 0,
          "type": 1
        },
        "max_quantity": 99,
        "has_variants": 1,
        "image": "https://bsecure-dev-images.imgix.net/merchants/products/51/1646711012.png?auto=compress&w=300",
        "position": 0,
        "variant_count": 4,
        "attribute_count": 0,
        "default_variant_id": 12054,
        "category_name": null,
        "category_id": null,
        "sub_category_name": null,
        "sub_category_id": null,
        "merchant_name": "My company",
        "store_name": "Fareen's Store",
        "store_slug": "ST-007083734",
        "store_favicon": "",
        "store_website": "",
        "store_disabled": 1,
        "store_disabled_note": ""
      }
    ],
    "first_page_url": "http://puranijeans.test/api/featured-products?page=1",
    "from": 1,
    "last_page": 1116,
    "last_page_url": "http://puranijeans.test/api/featured-products?page=1116",
    "links": [
      {
        "url": null,
        "label": "&laquo; Previous",
        "active": false
      },
      {
        "url": "http://puranijeans.test/api/featured-products?page=1",
        "label": "1",
        "active": true
      },
      {
        "url": "http://puranijeans.test/api/featured-products?page=2",
        "label": "2",
        "active": false
      },
      {
        "url": "http://puranijeans.test/api/featured-products?page=3",
        "label": "3",
        "active": false
      },
      {
        "url": "http://puranijeans.test/api/featured-products?page=4",
        "label": "4",
        "active": false
      },
      {
        "url": "http://puranijeans.test/api/featured-products?page=5",
        "label": "5",
        "active": false
      },
      {
        "url": "http://puranijeans.test/api/featured-products?page=6",
        "label": "6",
        "active": false
      },
      {
        "url": "http://puranijeans.test/api/featured-products?page=7",
        "label": "7",
        "active": false
      },
      {
        "url": "http://puranijeans.test/api/featured-products?page=8",
        "label": "8",
        "active": false
      },
      {
        "url": "http://puranijeans.test/api/featured-products?page=9",
        "label": "9",
        "active": false
      },
      {
        "url": "http://puranijeans.test/api/featured-products?page=10",
        "label": "10",
        "active": false
      },
      {
        "url": null,
        "label": "...",
        "active": false
      },
      {
        "url": "http://puranijeans.test/api/featured-products?page=1115",
        "label": "1115",
        "active": false
      },
      {
        "url": "http://puranijeans.test/api/featured-products?page=1116",
        "label": "1116",
        "active": false
      },
      {
        "url": "http://puranijeans.test/api/featured-products?page=2",
        "label": "Next &raquo;",
        "active": false
      }
    ],
    "next_page_url": "http://puranijeans.test/api/featured-products?page=2",
    "path": "http://puranijeans.test/api/featured-products",
    "per_page": 10,
    "prev_page_url": null,
    "to": 10,
    "total": 11159
  },
  "type": "FEATURED_PRODUCTS",
  "slug": "",
  "filters": {
    "sort_by": {
      "newest_arrival": "New Arrival",
      "price_high_to_low": "High to Low",
      "price_low_to_high": "Low to High",
      "price_low_to_high": "Newest",
      "price_low_to_high": "Asc Order",
      "price_low_to_high": "Desc Order",
    },
    "price_range": {
      "max": 200000,
      "min": 0
    },
    "stores": ""
  }
};

const ProductList = ({ colClass, layoutList, openSidebar, title, parent, subTitle }) => {
  const cartContext = useContext(CartContext);
  const quantity = cartContext.quantity;
  const wishlistContext = useContext(WishlistContext);
  const router = useRouter();
  const [limit, setLimit] = useState(8);
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const filterContext = useContext(FilterContext);
  const selectedBrands = filterContext.selectedBrands;
  const selectedColor = filterContext.selectedColor;
  const selectedPrice = filterContext.selectedPrice;
  const selectedCategory = filterContext.state;
  const selectedSubCategory = filterContext.subCategory;
  const selectedSize = filterContext.selectedSize;
  const [sortBy, setSortBy] = useState("AscOrder");
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState(layoutList);
  const [url, setUrl] = useState();

  console.log("filterContext: ", filterContext)
  useEffect(() => {
    console.log("filterContext: ", filterContext)
    const pathname = window.location.pathname;
    setUrl(pathname);
    router.push(
      `${pathname}?${filterContext.state}&brand=${selectedBrands}&color=${selectedColor}&size=${selectedSize}&minPrice=${selectedPrice.min}&maxPrice=${selectedPrice.max}`, undefined, { shallow: true }
    );
  }, [selectedBrands, selectedColor, selectedSize, selectedPrice]);

  // var { loading, data, fetchMore } = useQuery(GET_PRODUCTS, {
  // variables: {
  //   type: selectedCategory,
  //   priceMax: selectedPrice.max,
  //   priceMin: selectedPrice.min,
  //   color: selectedColor,
  //   brand: selectedBrands,
  //   sortBy: sortBy,
  //   indexFrom: 0,
  //   limit: limit,
  // },
  // });
  var { products, type, slug, filters } = GET_PRODUCTS
  var { loading, current_page, last_page, data, per_page, total } = products
  var { sort_by, price_range } = filters
  var loading = false;
  console.log("fetch: ", loading, data)
  const handlePagination = () => {
    setIsLoading(true);
    // setTimeout(
    //   () =>
    //     fetchMore({
    //       variables: {
    //         indexFrom: data.products.items.length,
    //       },
    //       updateQuery: (prev, { fetchMoreResult }) => {
    //         if (!fetchMoreResult) return prev;
    //         setIsLoading(false);
    //         return {
    //           products: {
    //             __typename: prev.products.__typename,
    //             total: prev.products.total,
    //             items: [
    //               ...prev.products.items,
    //               ...fetchMoreResult.products.items,
    //             ],
    //             hasMore: fetchMoreResult.products.hasMore,
    //           },
    //         };
    //       },
    //     }),
    //   1000
    // );
  };

  const removeBrand = (val) => {
    const temp = [...selectedBrands];
    temp.splice(selectedBrands.indexOf(val), 1);
    filterContext.setSelectedBrands(temp);
  };

  const removeSize = (val) => {
    const temp = [...selectedSize];
    temp.splice(selectedSize.indexOf(val), 1);
    filterContext.setSelectedSize(temp);
  };

  const removeColor = () => {
    filterContext.setSelectedColor("");
  };

  return (
    <Col className="collection-content">
      <div className="page-main-content">
        <Row>
          <Col sm="12">
            <ShopBreadcrumb title={selectedCategory} parent={parent} subTitle={selectedSubCategory} />
          </Col>
          <Col sm="12">
            <Row className="toolbox noTopMargin noBtmMargin">
              <div className="top-banner-wrapper  small-section noBtmPadding toolbox-left col-6">
                <div className="top-banner-content">
                  <h4>{selectedCategory}</h4>
                  <h5>
                    {selectedSubCategory}
                  </h5>
                </div>
              </div>

              <div className="toolbox-right col-6 noTopPadding noBtmPadding noTopMargin noBtmMargin">
                {
                  data ?
                    <div className="toolbox-info">
                      Showing
                      <span> {per_page} of {total}</span> Products
                    </div>
                    : ""
                }
              </div>
            </Row>
            <Row className="toolbox noTopMargin noBtmMargin">
              <div className="toolbox-left col-6">
                <div className="toolbox-sort">
                  <label htmlFor="sortby">Per page records:</label>
                  <div className="select-custom">
                    <select
                      name="sortby"
                      id="sortby"
                      className="form-control"
                    // onChange={onSortByChange}
                    // value={query.sortBy ? query.sortBy : 'default'}
                    >
                      <option value={"10"}>{"10"}</option>
                      <option value={"100"}>{"100"}</option>
                      <option value={"1000"}>{"1000"}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="toolbox-right col-6 d-flex">
                <div className="toolbox-sort">
                  <label htmlFor="sortby">Sort by:</label>
                  <div className="select-custom">
                    <select
                      name="sortby"
                      id="sortby"
                      className="form-control"
                    // onChange={onSortByChange}
                    // value={query.sortBy ? query.sortBy : 'default'}
                    >
                      {Object.keys(sort_by).map((sort, i) => (
                        <option value={`${sort}`}>{sort_by[sort]}</option>
                      )
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </Row>
            <Row>
              <Col xs="12">
                <ul className="product-filter-tags">
                  {selectedBrands.map((brand, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        {brand}
                        <i
                          className="fa fa-close"
                          onClick={() => removeBrand(brand)}
                        ></i>
                      </a>
                    </li>
                  ))}
                  {selectedColor ? (
                    <li>
                      <a href={null} className="filter_tag">
                        {selectedColor}
                        <i className="fa fa-close" onClick={removeColor}></i>
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {selectedSize.map((size, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        {size}
                        <i
                          className="fa fa-close"
                          onClick={() => removeSize(size)}
                        ></i>
                      </a>
                    </li>
                  ))}
                  {
                    <li>
                      <a href={null} className="filter_tag">
                        price: {selectedPrice.min}- {selectedPrice.max}
                      </a>
                    </li>
                  }
                </ul>
              </Col>
            </Row>
            <div className="collection-product-wrapper">
              <div className={`product-wrapper-grid ${layout}`}>
                <Row>
                  {/* Product Box */}
                  {!data ||
                    !data ||
                    data.length === 0 ||
                    loading ? (
                    data ? (
                      <Col xs="12">
                        <div>
                          <div className="col-sm-12 empty-cart-cls text-center">
                            <img
                              src={`/assets/images/empty-search.jpg`}
                              className="img-fluid mb-4 mx-auto"
                              alt=""
                            />
                            <h3>
                              <strong>Your Cart is Empty</strong>
                            </h3>
                            <h4>Explore more shortlist some items.</h4>
                          </div>
                        </div>
                      </Col>
                    ) : (
                      <div className="row mx-0 margin-default mt-4">
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
                    )
                  ) : (
                    data.map((product, i) => (
                      <div className={colClass} key={i}>
                        <div className="product">
                          <div>
                            <ProductItem
                              des={true}
                              product={product}
                              symbol={symbol}
                              cartClass="cart-info cart-wrap"
                              addWishlist={() =>
                                wishlistContext.addToWish(product)
                              }
                              addCart={() =>
                                cartContext.addToCart(product, quantity)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </Row>
              </div>
              <div className="section-t-space">
                <div className="text-center">
                  <Row>
                    <Col xl="12" md="12" sm="12">
                      {data && data.products && data.products.hasMore && (
                        <Button className="load-more" onClick={() => handlePagination()}>
                          {isLoading && (
                            <Spinner animation="border" variant="light" />
                          )}
                          Load More
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default ProductList;