import React, { Fragment } from "react";
import { Container, Col, Row } from "reactstrap";
import FeaturedByCollection from "./collection";

export default function Featured(props){
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
              <FeaturedByCollection product={4} featured={props.featured}/>
        </Container>
      </section>
    </Fragment>
  );
};

export async function getStaticProps() {
    const apiResponse = await fetch(`${process.env.NEXT_API_BASE_URL}api/homepage/featured-section`);
    const jsonApiResponse = await apiResponse.json();
    return {
      props: {
        featured_by: jsonApiResponse?.body?.featured_by,
        jsonApiResponse,
      }
    }
  }