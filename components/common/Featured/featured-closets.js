import React, { Fragment, useState, useEffect } from "react";
import Slider from "react-slick";
import { Col, Container, Media, Row } from "reactstrap";
import ProductItem from "./featured-products";
const tools_product_4 = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

const ReviewContent = [
    {
        img: '/assets/images/avtar.jpg',
        name: "William Barrel",
        datetime: "Frontend Developer",
        review:
            "Donec rhoncus massa quis nibh imperdiet dictum. Vestibulum id est sit amet felis fringilla bibendum at at leo. Proin molestie ac nisi eu laoreet. Integer faucibus enim nec ullamcorper tempor. Aenean nec felis dui. Integer tristique odio mi, in volutpat metus posuere eu. Aenean suscipit ipsum nunc, id volutpat lorem hendrerit ac. Sed id elit quam. In ac mauris arcu. Praesent eget lectus sit amet diam vestibulum varius Suspendisse dignissim mattis leo, nec facilisis erat tempor quis. Vestibulum eu vestibulum ex.",
        likes: "14",
        dislikes: "2",
    },
    {
        img: '/assets/images/2.jpg',
        name: "William Barrel",
        datetime: "Frontend Developer",
        review:
            "Donec rhoncus massa quis nibh imperdiet dictum. Vestibulum id est sit amet felis fringilla bibendum at at leo. Proin molestie ac nisi eu laoreet. Integer faucibus enim nec ullamcorper tempor. Aenean nec felis dui. Integer tristique odio mi, in volutpat metus posuere eu. Aenean suscipit ipsum nunc, id volutpat lorem hendrerit ac. Sed id elit quam. In ac mauris arcu. Praesent eget lectus sit amet diam vestibulum varius Suspendisse dignissim mattis leo, nec facilisis erat tempor quis. Vestibulum eu vestibulum ex.",
        likes: "14",
        dislikes: "2",
    },
    {
        img: '/assets/images/20.jpg',
        name: "William Barrel",
        datetime: "Frontend Developer",
        review:
            "Donec rhoncus massa quis nibh imperdiet dictum. Vestibulum id est sit amet felis fringilla bibendum at at leo. Proin molestie ac nisi eu laoreet. Integer faucibus enim nec ullamcorper tempor. Aenean nec felis dui. Integer tristique odio mi, in volutpat metus posuere eu. Aenean suscipit ipsum nunc, id volutpat lorem hendrerit ac. Sed id elit quam. In ac mauris arcu. Praesent eget lectus sit amet diam vestibulum varius Suspendisse dignissim mattis leo, nec facilisis erat tempor quis. Vestibulum eu vestibulum ex.",
        likes: "14",
        dislikes: "2",
    },
    {
        img: '/assets/images/avtar.jpg',
        name: "William Barrel",
        datetime: "Frontend Developer",
        review:
            "Donec rhoncus massa quis nibh imperdiet dictum. Vestibulum id est sit amet felis fringilla bibendum at at leo. Proin molestie ac nisi eu laoreet. Integer faucibus enim nec ullamcorper tempor. Aenean nec felis dui. Integer tristique odio mi, in volutpat metus posuere eu. Aenean suscipit ipsum nunc, id volutpat lorem hendrerit ac. Sed id elit quam. In ac mauris arcu. Praesent eget lectus sit amet diam vestibulum varius Suspendisse dignissim mattis leo, nec facilisis erat tempor quis. Vestibulum eu vestibulum ex.",
        likes: "14",
        dislikes: "2",
    },
    {
        img: '/assets/images/2.jpg',
        name: "William Barrel",
        datetime: "Frontend Developer",
        review:
            "Donec rhoncus massa quis nibh imperdiet dictum. Vestibulum id est sit amet felis fringilla bibendum at at leo. Proin molestie ac nisi eu laoreet. Integer faucibus enim nec ullamcorper tempor. Aenean nec felis dui. Integer tristique odio mi, in volutpat metus posuere eu. Aenean suscipit ipsum nunc, id volutpat lorem hendrerit ac. Sed id elit quam. In ac mauris arcu. Praesent eget lectus sit amet diam vestibulum varius Suspendisse dignissim mattis leo, nec facilisis erat tempor quis. Vestibulum eu vestibulum ex.",
        likes: "14",
        dislikes: "2",
    },
];


export default function FeaturedCloset(props) {
    let RatingStars = [];
    let rating = 5;
    for (var i = 0; i < rating; i++) {
      RatingStars.push(<i className="fa fa-star" key={i}></i>);
    }

    return (
        <Fragment>
            <section className="home-featured-closets section-b-space bg-size blur-up lazyloaded">
                <div className="ratio_square">
                    <Container>
                        <Row>
                            <Col lg="8" className="tools-grey ratio_square">
                                <section className="section-b-space blog-detail-page review-page">
                                    <Container>
                                        <Row>
                                            <Col sm="12">
                                                <ul className="comment-section">
                                                    <Slider {...tools_product_4}>
                                                        {ReviewContent.map((review, i) => {
                                                            return (
                                                                <MasterReview
                                                                    key={i}
                                                                    img={review.img}
                                                                    name={review.name}
                                                                    datetime={review.datetime}
                                                                    review={review.review}
                                                                    likes={review.likes}
                                                                    dislikes={review.dislikes}
                                                                />
                                                            );
                                                        })}
                                                    </Slider>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </Container>
                                </section>
                            </Col>
                            <Col lg="3" className="theme-closets">
                                <div className="theme-card bg-white">
                                    <h5 className="title-border">Sellers to watch</h5>
                                    <Container>
                                        <Row>
                                            <section>
                                                <div className="media">
                                                    <div className="text-center d-flex">
                                                        <Col lg="3" xs="5" md="4" sm="4" className="align-center">
                                                            <Media src={"/assets/images/avtar.jpg"} alt="#" />
                                                        </Col>
                                                        <Col lg="9" xs="7" md="8" sm="8" className="text-left">
                                                            <Row>
                                                                <Col lg="8" md="8" sm="8" xs="8">
                                                                    <h5>Makeup Shakeup</h5>
                                                                    <h6>Hyderabad</h6>
                                                                    <div className="rating">{RatingStars}</div>
                                                                </Col>
                                                                <Col>
                                                                    <div className="follow-button">
                                                                        <a href="#" className="btn btn-solid btn-xs btn-find">
                                                                            follow
                                                                        </a>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </div>
                                                </div>
                                            </section>
                                        </Row>
                                    </Container>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
        </Fragment>
    );
};

const MasterReview = ({ img, name, datetime, review, likes, dislikes }) => {
    return (
        <li>
            <div className="media">
                <Media src={img} alt="Generic placeholder image" />
                <div className="media-body">
                    <h4>{name}</h4>
                    <h6>({datetime})</h6>
                    <p>{review}</p>
                </div>
            </div>
        </li>
    );
};