import React, { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { ReviewSlider } from "./common/review";
import { SellerWatchList } from "./common/sellers";


export default function TrendingSellers() {
    return (
        <Fragment>
            <section className="home-featured-closets section-b-space bg-size blur-up lazyloaded">
                <div className="ratio_square">
                    <Container>
                        <Row>
                            <Col lg="8" className="featured_sq ratio_square">
                                <ReviewSlider/>
                            </Col>
                            <Col lg="3" className="theme-closets">
                                <div className="theme-card bg-white">
                                    <h5 className="title-border">Sellers to watch</h5>
                                    <SellerWatchList/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
        </Fragment>
    );
};
