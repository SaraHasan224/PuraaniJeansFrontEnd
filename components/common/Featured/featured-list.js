import React, { Fragment, useEffect } from "react";
import { Container, Col, Row } from "reactstrap";
import FeaturedByCollection from "./collection";
import { HOMEPAGE_ACTIONS } from "../../../store/actions";
import { useDispatch } from "react-redux";

export default function Featured(){
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(HOMEPAGE_ACTIONS.GET_FEATURED_ITEMS());
  }, []);

  return (
    <Fragment>
      <section className="home-featured-section">
        <Container className="featured-container">
          <Row className="multiple-slider mb-3">
            <Col xl="12" lg="12" md="12">
              <div className="title2 text-start">
                <h2 className="title-inner1">Choose, Communicate & Buy</h2>
              </div>
            </Col>
          </Row>
              <FeaturedByCollection product={4}/>
        </Container>
      </section>
    </Fragment>
  );
};

export async function getStaticProps() {
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/homepage/featured-section`);
    const jsonApiResponse = await apiResponse.json();
    return {
      props: {
        featured_by: jsonApiResponse?.body?.featured_by,
        jsonApiResponse,
      }
    }
  }