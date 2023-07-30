import Slider from "react-slick";

import { Col, Container, Row } from "reactstrap";
import { ReviewMedia } from "./reviewDetail";

const sliderSettings = {
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


export function ReviewSlider() {
    return (
        <section className="section-b-space f-closet-detail-page review-page">
            <Container>
                <Row>
                    <Col sm="12">
                        <ul className="comment-section">
                            <Slider {...sliderSettings}>
                                {ReviewContent.map((review, i) => {
                                    return (
                                        <ReviewMedia
                                            key={i}
                                            review={review}
                                        />
                                    );
                                })}
                            </Slider>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};