import React, { useEffect, useState } from "react";
import NavBar from "./common/navbar";
import CartContainer from "../../containers/CartContainer";
import Logo from "./common/logo";
import { Container, Row, Col, Media } from "reactstrap";
import cart from "../../../public/assets/images/icon/cart.png";
import SearchOverlay from "./common/search-overlay";
import search from "../../../public/assets/images/icon/search.png";
import SearchNavigation from "./common/search-nav";
import ALink from "../../../features/alink";
import { useDispatch, useSelector } from "react-redux";
import { HELPER } from "../../../utils";
import { CUSTOMER_ACTIONS } from "../../../store/actions/customerActions";

const Header = (props) => {
  const {
    logoName,
  } = props;
  const dispatch = useDispatch()

  const { closet } = useSelector((state) => state.closet);
  const { closetRef, customerMetaRequested, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(function () {
      document.querySelectorAll(".loader-wrapper").style = "display: none";
    }, 2000);

    if((!closetRef || !isLoggedIn) && !customerMetaRequested) {
      dispatch(CUSTOMER_ACTIONS.FETCH_CUSTOMER_METADATA());
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (number >= 300) {
      if (window.innerWidth < 578) {
        document.getElementById("sticky").classList.remove("fixed");
      } else document.getElementById("sticky").classList.add("fixed");
    } else {
      document.getElementById("sticky").classList.remove("fixed");
    }
  };

  const openSearch = () => {
    document.getElementById("search-overlay").style.display = "block";
  };

  return (
    <div>
      <header id="sticky" className="sticky header-2 header-6">
        <Container>
          <Row>
            <Col>
              <div className="main-menu border-section border-top-0">
                <div className="brand-logo layout2-logo">
                  <Logo logo={logoName} />
                </div>
                <div>
                  <SearchNavigation />
                </div>
                <div className="menu-left pull-right">
                  <div>
                    <div className="icon-nav">
                      <ul>
                        <li className="onhover-div mobile-search">
                          <div>
                            <Media
                              src={search.src}
                              onClick={openSearch}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </li>
                        {/*Header Cart Component */}
                        <CartContainer icon={cart.src} />
                        <li className="onhover-div create-closet">
                          <ALink href={HELPER.isNotEmpty(closetRef) ? `/account/dashboard/${closetRef}` : `/account/create`} className="btn btn-solid black-btn " tabIndex="0">
                            {HELPER.isNotEmpty(closetRef) ? "My Closet" : "Create Closet"}
                          </ALink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col lg="12">
              <div className="main-nav-center">
                <NavBar />
              </div>
            </Col>
          </Row>
        </Container>
        <SearchOverlay />
      </header>
    </div>
  );
};

export default Header;
