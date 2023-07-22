import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Button,
  Collapse,
} from "reactstrap";
import Logo from "../../layouts/headers/common/logo";
import CopyRight from "./copyright";
import ALink from "../../../features/alink";
import { useSelector } from "react-redux";

const Footer = ({
  containerFluid,
  logoName,
  layoutClass,
  footerClass,
  footerLayOut,
  footerSection,
  belowSection,
  belowContainerFluid,
  CopyRightFluid,
  newLatter,
}) => {
  const { subscription } = useSelector((state) => state.metadata);

  const [isOpen, setIsOpen] = useState();
  const [collapse, setCollapse] = useState(0);
  const width = window.innerWidth < 750;
  useEffect(() => {
    const changeCollapse = () => {
      if (window.innerWidth < 750) {
        setCollapse(0);
        setIsOpen(false);
      } else setIsOpen(true);
    };

    window.addEventListener("resize", changeCollapse);

    return () => {
      window.removeEventListener('resize', changeCollapse)
    }

  }, []);
  return (
    <div>
      <footer className={footerClass}>
        <section className={belowSection}>
          {newLatter ? (
            <Container fluid={containerFluid ? containerFluid : ""} className={footerLayOut}>
              <section className={footerSection}>
                <Row>
                  <Col lg="8" md="12" sm="12" xs="12">
                    <div className="subscribe">
                      <div>
                        <h4>{subscription?.title}</h4>
                        <p>{subscription?.sub_title}</p>
                      </div>
                    </div>
                  </Col>
                  <Col lg="4" md="12" sm="12" xs="12">
                    <form className="form_search form-inline subscribe-form subscribe-form-custom-design" role="textbox">
                      {/* eslint-disable-next-line */}
                      <Input
                        id="query search-autocomplete"
                        type="search"
                        placeholder="Type your email"
                        className="nav-search nav-search-field"
                        aria-expanded="true"
                      />
                      <button
                        type="submit"
                        name="nav-submit-button"
                        className="btn-search subscription-search-btn"
                      >
                        <i className="fa fa-search"></i>
                      </button>
                    </form>
                    <Form className="form-inline subscribe-form d-none">
                      <div className="mx-sm-3">
                        <Input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter your email"
                        />
                      </div>
                      <Button type="submit" className="btn btn-solid">
                        subscribe
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </section>
            </Container>
          ) : (
            ""
          )}
          <div className="dark-layout">
            <Container fluid={belowContainerFluid ? belowContainerFluid : ""}>
              <Row className="footer-theme partition-f">
                <Col lg="4" md="6">
                  <div
                    className={`footer-title ${isOpen && collapse == 1 ? "active" : ""
                      } footer-mobile-title`}
                  >
                    <h4
                      onClick={() => {
                        setCollapse(1);
                        setIsOpen(!isOpen);
                      }}
                    >
                      about
                      <span className="according-menu"></span>
                    </h4>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 1 ? isOpen : false) : true}
                    className="footer-aboutUs"
                  >
                    <div className="footer-contant">
                      <div className="footer-logo">
                        <Logo logo={logoName} />
                      </div>
                      <p>{process.env.NEXT_PUBLIC_ABOUT_US_FOOTER}</p>
                      <div className="footer-social">
                        <ul>
                          <li>
                            <ALink href={`${process.env.NEXT_PUBLIC_LINKS_FACEBOOK}`} target="_blank">
                              <i
                                className="fa fa-facebook"
                                aria-hidden="true"
                              ></i>
                            </ALink>
                          </li>
                          <li>
                            <ALink href={`${process.env.NEXT_PUBLIC_LINKS_YOUTUBE}`} target="_blank">
                              <i
                                className="fa fa-google-plus"
                                aria-hidden="true"
                              ></i>
                            </ALink>
                          </li>
                          <li>
                            <ALink href={`${process.env.NEXT_PUBLIC_LINKS_TWITTER}`} target="_blank">
                              <i
                                className="fa fa-twitter"
                                aria-hidden="true"
                              ></i>
                            </ALink>
                          </li>
                          <li>
                            <ALink href={`${process.env.NEXT_PUBLIC_LINKS_INSTAGRAM}`} target="_blank">
                              <i
                                className="fa fa-instagram"
                                aria-hidden="true"
                              ></i>
                            </ALink>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Collapse>
                </Col>
                <Col className="offset-xl-1">
                  <div className="sub-title">
                    <div
                      className={`footer-title ${isOpen && collapse == 2 ? "active" : ""
                        } `}
                    >
                      <h4
                        onClick={() => {
                          if (width) {
                            setIsOpen(!isOpen);
                            setCollapse(2);
                          } else setIsOpen(true);
                        }}
                      >
                        Quick Links
                        <span className="according-menu"></span>
                      </h4>
                    </div>
                    <Collapse
                      isOpen={width ? (collapse === 2 ? isOpen : false) : true}
                    >
                      <div className="footer-contant">
                        <ul>
                          <li>
                            <ALink href={`/page/about-us`}>
                              <a>About Us</a>
                            </ALink>
                          </li>
                          <li>
                            <ALink href={`/page/review`}>
                              <a> Reviews </a>
                            </ALink>
                          </li>
                          <li>
                            <ALink href={`/page/terms`}>
                              <a>Terms & Conditions</a>
                            </ALink>
                          </li>
                          <li>
                            <ALink href={`/page/privacy`}>
                              <a> Privacy Policy </a>
                            </ALink>
                          </li>
                          <li>
                            <ALink href={`/page/faq`}>
                              <a> FAQs </a>
                            </ALink>
                          </li>
                          <li>
                            <ALink href={`/page/account/contact312`}>
                              <a> Contact Us </a>
                            </ALink>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </Col>
                <Col>
                  <div className="sub-title">
                    <div
                      className={`footer-title ${isOpen && collapse == 3 ? "active" : ""
                        } `}
                    >
                      <h4
                        onClick={() => {
                          if (width) {
                            setIsOpen(!isOpen);
                            setCollapse(3);
                          } else setIsOpen(true);
                        }}
                      >
                        Product Categories
                        <span className="according-menu"></span>
                      </h4>
                    </div>
                    <Collapse
                      isOpen={width ? (collapse === 3 ? isOpen : false) : true}
                    >
                      <div className="footer-contant">
                        <ul>
                          <li>
                            <ALink href={`/page/account/contact312`}>
                              <a> Men Wear </a>
                            </ALink>
                          </li>
                          <li>
                            <ALink href={`/page/account/contact312`}>
                              <a> Women Wear </a>
                            </ALink>
                          </li>
                          <li>
                            <ALink href={`/page/account/contact312`}>
                              <a> Shoes </a>
                            </ALink>
                          </li>
                          <li>
                            <ALink href={`/page/account/contact312`}>
                              <a> Bags </a>
                            </ALink>
                          </li>
                          <li>
                            <ALink href={`/page/account/contact312`}>
                              <a> Hats </a>
                            </ALink>
                          </li>
                          <li>
                            <ALink href={`/page/account/contact312`}>
                              <a> Caps </a>
                            </ALink>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </Col>
                <Col>
                  <div className="sub-title">
                    <div
                      className={`footer-title ${isOpen && collapse == 4 ? "active" : ""
                        } `}
                    >
                      <h4
                        onClick={() => {
                          if (width) {
                            setIsOpen(!isOpen);
                            setCollapse(4);
                          } else setIsOpen(true);
                        }}
                      >
                        store information
                        <span className="according-menu"></span>
                      </h4>
                    </div>
                    <Collapse
                      isOpen={width ? (collapse === 4 ? isOpen : false) : true}
                    >
                      <div className="footer-contant">
                        <ul className="contact-list">
                          <li>
                            <i className="fa fa-map-marker"></i>{process.env.NEXT_PUBLIC_CONTACT_ADDRESS}
                          </li>
                          <li>
                            <i className="fa fa-phone"></i>Call Us: {process.env.NEXT_PUBLIC_CONTACT_US}
                          </li>
                          <li>
                            <i className="fa fa-envelope-o"></i>Email Us:{" "}
                            <ALink href="mailto:#">
                              {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                            </ALink>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </section>

        <CopyRight
          layout={layoutClass}
          fluid={CopyRightFluid ? CopyRightFluid : ""}
        />
      </footer>
    </div>
  );
};
export default Footer;
