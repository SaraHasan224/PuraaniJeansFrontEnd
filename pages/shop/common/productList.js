import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { Col, Row, Media, Button, Spinner } from "reactstrap";

import ProductItem from "../../../components/common/product-box/ProductBox1";
import PostLoader from "../../../components/common/PostLoader";
import { CurrencyContext } from "../../../context/Currency/CurrencyContext";
import FilterContext from "../../../context/filter/FilterContext";
import CartContext from "../../../context/cart";
import ShopBreadcrumb from "./breadcrumb";
import ALink from "../../../features/alink";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_ACTIONS } from "../../../store/actions";
import { HELPER } from "../../../utils";


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

const ProductList = ({ colClass, layoutList, openSidebar }) => {
  const dispatch = useDispatch()

  const { menu } = useSelector((state) => state.menu);

  const { loading, products, fetchMore, type, slug, filters } = useSelector((state) => state.products);
  var { current_page, last_page, data, per_page, total } = products
  var { sort_by, price_range, colors, brands, categories } = filters

  // var { products, type, slug, filters } = GET_PRODUCTS
  // var { loading, current_page, last_page, data, per_page, total } = products
  // var { sort_by, price_range } = filters
  // var loading = false;
  const cartContext = useContext(CartContext);
  const quantity = cartContext.quantity;
  const router = useRouter();
  const [limit, setLimit] = useState(8);
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const filterContext = useContext(FilterContext);
  
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const [selectedBrands, setSelectedBrands] = useState(brands);
  const [selectedColor, setSelectedColor] = useState(colors);
  const [selectedPrice, setSelectedPrice] = useState(menu.price);
  const [categoryTitle, setCategoryTitle] = useState(menu.title);
  const [categorySlug, setCategorySlug] = useState(menu.slug);
  const [parentCategoryTitle, setParentCategoryTitle] = useState(menu.parent);
  const [subCategoryTitle, setSubCategoryTitle] = useState(menu.child);
  const [selectedSize, setSelectedSize] = useState(menu.size);
  const [sortBy, setSortBy] = useState("newest_arrival");
  const [perPageRecord, setPerPageRecord] = useState(10);
  

  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState(layoutList);
  const [url, setUrl] = useState();
  console.log("filterContext: ", filterContext)
  
  useEffect(() => {
    if(HELPER.isNotEmpty(categorySlug)) {
      dispatch(PRODUCT_ACTIONS.GET_CATEGORY_PRODUCT_ITEMS(categorySlug))
    }
  }, []);

  useEffect(() => {
    if(HELPER.isNotEmpty(menu.title)) {
      setSelectedBrands(menu.brands);
      setSelectedColor(menu.color);
      setSelectedPrice(menu.price);
      setCategorySlug(menu.slug);
      setCategoryTitle(menu.title);
      setParentCategoryTitle(menu.parent);
      setSubCategoryTitle(menu.child);
      setSelectedSize(menu.size);
    }
  }, [menu]);


  useEffect(() => {
    if(HELPER.isNotEmpty(menu.title)) {
      setSelectedBrands(menu.brands);
      setSelectedColor(menu.color);
      setSelectedPrice(menu.price);
      setCategorySlug(menu.slug);
      setCategoryTitle(menu.title);
      setParentCategoryTitle(menu.parent);
      setSubCategoryTitle(menu.child);
      setSelectedSize(menu.size);
    }
  }, [menu]);

  // useEffect(() => {
  //   if(HELPER.isNotEmpty(categoryTitle) && HELPER.isNotEmpty(menu) && categoryTitle !== menu.title) {
  //     router.push({
  //           pathname: "shop",
  //           query: {
  //             title: menu.title,
  //             parent: menu.parent_title,
  //             child: menu.child_title,
  //             slug: menu.path,
  //             brand: menu.brand,
  //             color: menu.color,
  //             size: menu.size,
  //             minPrice: menu.minPrice,
  //             maxPrice: menu.maxPrice,
  //           },
  //     })
  //   }
  // }, [menu.title]);


  useEffect(() => {
    if(HELPER.isNotEmpty(categorySlug)) {
      dispatch(PRODUCT_ACTIONS.GET_CATEGORY_PRODUCT_ITEMS(categorySlug))
    }
  }, [categorySlug]);


  // useEffect(() => {
  //   const pathname = window.location.pathname;
  //   setUrl(pathname);
  //   router.push(
  //     `${pathname}?title=${categoryTitle}&parent=${parentCategoryTitle}&child=${subCategoryTitle}&brand=${brands}&color=${selectedColor}&size=${selectedSize}&minPrice=${selectedPrice.min}&maxPrice=${selectedPrice.max}`, undefined, { shallow: true }
  //   );
  // }, [
  //   categoryTitle,
  //   parentCategoryTitle,
  //   subCategoryTitle,
  //   brands,
  //   selectedColor,
  //   selectedSize,
  //   selectedPrice
  // ]);

  // var { loading, data, fetchMore } = useQuery(GET_PRODUCTS, {
  // variables: {
  //   type: categorySlug,
  //   priceMax: selectedPrice.max,
  //   priceMin: selectedPrice.min,
  //   color: selectedColor,
  //   brand: brands,
  //   sortBy: sortBy,
  //   indexFrom: 0,
  //   limit: limit,
  // },
  // });
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
            <ShopBreadcrumb title={categoryTitle} parent={parentCategoryTitle} subTitle={subCategoryTitle} />
          </Col>
          <Col sm="12">
            <Row className="toolbox noTopMargin noBtmMargin">
              <div className="top-banner-wrapper  small-section noBtmPadding toolbox-left col-6">
                <div className="top-banner-content">
                  <h4>{categoryTitle}</h4>
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
                  {HELPER.isNotEmpty(selectedBrands) && selectedBrands.map((brand, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        {brand?.name}
                        <i
                          className="fa fa-close"
                          onClick={() => removeBrand(brand)}
                        ></i>
                      </a>
                    </li>
                  ))}
                  {HELPER.isNotEmpty(selectedColor) && selectedColor ? (
                    <li>
                      <a href={null} className="filter_tag">
                        {selectedColor}
                        <i className="fa fa-close" onClick={removeColor}></i>
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {HELPER.isNotEmpty(selectedSize) && selectedSize.map((size, i) => (
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
                  {selectedPrice.max > 0 ??
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
                              <strong>No products found</strong>
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