import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { Col, Row, Button, Spinner } from "reactstrap";

import ProductItem from "../../../components/common/product-box/ProductBox1";
import PostLoader from "../../../components/common/PostLoader";
import { CurrencyContext } from "../../../context/Currency/CurrencyContext";
import FilterContext from "../../../context/filter/FilterContext";
import CartContext from "../../../context/cart";
import ShopBreadcrumb from "./breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { CATEGORY_ACTIONS, PRODUCT_ACTIONS } from "../../../store/actions";
import { HELPER } from "../../../utils";
import NotFound from "../../../components/common/NotFound";

const ProductList = ({ colClass, layoutList, openSidebar }) => {
  const dispatch = useDispatch()

  const { loading, products, standard, sort_by, price_range, colors, brands, size, condition } = useSelector((state) => state.products);
  var { data, per_page, total } = products

  const cartContext = useContext(CartContext);
  const quantity = cartContext.quantity;
  const router = useRouter();
  const [limit, setLimit] = useState(8);
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const filterContext = useContext(FilterContext);
  const {
    selectedCategories,
    setSelectedCategories,
    categoryTitle,
    setCategoryTitle,
    parentCategoryTitle,
    setParentCategoryTitle,
    subCategoryTitle,
    setSubCategoryTitle,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    selectedBrands,
    setSelectedBrands,
    selectedPrice,
    setSelectedPrice,
    selectedStandard,
    setSelectedStandard,
    selectedCondition,
    setSelectedCondition,
    sortBy,
    setSortBy,
    perPageRecord,
    setPerPageRecord
  } = filterContext

  console.log("selectedCondition: ", selectedCondition)

  const handlePagination = () => {
    // setIsLoading(true);
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
    setSelectedBrands(temp);
  };

  const removeSize = (val) => {
    const temp = [...selectedSize];
    temp.splice(selectedSize.indexOf(val), 1);
    setSelectedSize(temp);
  };

  const removeCondition = (val) => {
    const temp = [...selectedCondition];
    temp.splice(selectedCondition.indexOf(val), 1);
    setSelectedCondition(temp);
  };

  const removeStandard = (val) => {
    const temp = [...selectedStandard];
    temp.splice(selectedStandard.indexOf(val), 1);
    setSelectedStandard(temp);
  };

  const removeColor = () => {
    setSelectedColor("");
  };
  return (
    <Col className="collection-content">
      <div className="page-main-content">
        <Row>
          <Col sm="12">
            <ShopBreadcrumb title={categoryTitle} parent={parentCategoryTitle} subTitle={subCategoryTitle} />
          </Col>
          <Col sm="12">
            <Row className="toolbox noTopMargin noBtmMargin">
              <div className="top-banner-wrapper noBtmPadding toolbox-left col-6">
                <div className="top-banner-content">
                  <h4>{categoryTitle ?? "Shop"}</h4>
                  <h5>
                    {subCategoryTitle}
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
                      name="perPageRecord"
                      id="perPageRecord"
                      className="form-control"
                      onChange={(e) => setPerPageRecord(e.target.value)}
                      value={perPageRecord ? perPageRecord : '10'}
                    >
                      <option value={"10"}>{"10"}</option>
                      <option value={"50"}>{"50"}</option>
                      <option value={"100"}>{"100"}</option>
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
                      onChange={(e) => {
                        setSortBy(e.target.value)
                      }}
                      value={sortBy ? sortBy : 'newest_arrival'}
                    >
                      {HELPER.isNotEmpty(sort_by) && Object.keys(sort_by).map((sort, i) => (
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
                  {HELPER.isNotEmpty(brands) && brands.map((brand, i) => {
                    if(selectedBrands.includes(brand?.value)){
                      return(
                        <li key={i}>
                        <a href={null} className="filter_tag">
                          <b>Brand:</b> {brand?.label}
                          <i
                            className="fa fa-close"
                            onClick={() => removeBrand(brand?.value)}
                          ></i>
                        </a>
                      </li>
                      )  
                    }
                  })}
                  {HELPER.isNotEmpty(colors) && colors ? (
                    <li>
                      <a href={null} className="filter_tag">
                        {colors}
                        <i className="fa fa-close" onClick={removeColor}></i>
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  
                  {HELPER.isNotEmpty(selectedSize) && size.map((sizeVal, i) => {
                      if (selectedSize.includes(sizeVal?.option_id)) {
                        return (

                          <li key={i}>
                            <a href={null} className="filter_tag">
                              <b>Size:</b> {sizeVal.label}
                              <i
                                className="fa fa-close"
                                onClick={() => removeSize(sizeVal?.value)}
                              ></i>
                            </a>
                          </li>
                        )
                      }
                    }
                  )}
                  {HELPER.isNotEmpty(selectedCondition) && condition.map((conditionVal, i) => {
                      if (selectedCondition.includes(conditionVal?.value)) {
                        return (

                          <li key={i}>
                            <a href={null} className="filter_tag">
                              <b>Condition:</b> {conditionVal.label}
                              <i
                                className="fa fa-close"
                                onClick={() => removeCondition(conditionVal?.value)}
                              ></i>
                            </a>
                          </li>
                        )
                      }
                    }
                  )}
                  {HELPER.isNotEmpty(selectedStandard) && standard.map((standardVal, i) => {
                      if (selectedStandard.includes(standardVal?.value)) {
                        return (

                          <li key={i}>
                            <a href={null} className="filter_tag">
                              <b>Standard:</b> {standardVal.label}
                              <i
                                className="fa fa-close"
                                onClick={() => removeStandard(standardVal?.value)}
                              ></i>
                            </a>
                          </li>
                        )
                      }
                    }
                  )}
                  {price_range.selectedPrice?.max > 0 ??
                    <li>
                      <a href={null} className="filter_tag">
                        price: {price_range.selectedPrice.min}- {price_range.selectedPrice.max}
                      </a>
                    </li>
                  }
                </ul>
              </Col>
            </Row>
            <div className="collection-product-wrapper">
              <div className={`product-wrapper-grid ${layoutList}`}>
                <Row>
                  {/* Product Box */}
                  {!data ||
                    !data ||
                    data.length === 0 ||
                    loading ? (
                    data ? (
                      <NotFound
                        errTitle="No products found"
                        errDescription="Explore more shortlist some items."
                      />
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
                          {loading && (
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