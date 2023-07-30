import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { Col, Container, Media, Row } from "reactstrap";
import {
    HELPER
} from "../../../../utils";

export function SellerWatchList() {
    const router = useRouter();
    const { sellersWatchList } = useSelector((state) => state.metadata);

    let RatingStars = [];
    let rating = 5;
    for (var i = 0; i < rating; i++) {
        RatingStars.push(<i className="fa fa-star" key={i}></i>);
    }

    return (

        <Container>
            {
                HELPER.isNotEmpty(sellersWatchList) && sellersWatchList.map((item) => {
                    return (
                        <Row className="closet media d-flex align-center">
                            <Col lg="3" xs="5" md="4" sm="4">
                                <div className="mediaImg">
                                    <Media src={item?.logo} alt="#" />
                                </div>
                            </Col>
                            <Col lg="9" xs="7" md="8" sm="8" className="text-left seller-closet">
                                <div className="d-flex">
                                    <Col lg="7" xs="7" md="7" sm="7">
                                        <h5>{item?.closet_name}</h5>
                                        <h6>{item?.country}</h6>
                                        <div className="rating">{RatingStars}</div>
                                    </Col>
                                    <Col lg="3" xs="3" md="3" sm="3">
                                        <div className="follow-button">
                                            <button 
                                                className="btn btn-solid btn-xs btn-find"
                                                onClick={ () => router.push(`/closet/${item?.closet_reference}`, undefined, { shallow: true })}
                                            >
                                                follow
                                            </button>
                                        </div>
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                    )
                })
            }

        </Container>
    );
};