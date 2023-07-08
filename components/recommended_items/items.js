import React from "react";
import { Container, Row, Col } from "reactstrap";
import ItemContent from "./item-content";
import ALink from "../../features/alink";

const Data = [
  {
    title: "Recommend",
    service: "Some Products that we picked for you",
    price: '',
    theme: "",
    titleLink: "/shop"
  },
  {
    link: "/my-assets/images/backgrounds/recommendations/1.png",
    title: "Breakout 2 piece",
    service: "Summer net stuff",
    price: 'Rs 2300',
    theme: "",
    titleLink: "/shop"
  },
  {
    link: "/my-assets/images/backgrounds/recommendations/2.png",
    title: "Sapphire pret",
    service: "sapphire pret shirt",
    price: 'Rs 10000',
    theme: "",
    titleLink: "/shop"
  },
  {
    link: "/my-assets/images/backgrounds/recommendations/3.png",
    title: "Sana Safinaz lawn",
    service: "Sana safinaz lawn baggy",
    price: 'Rs 200',
    theme: "",
    titleLink: "/shop"
  },
  {
    title: "View alll",
    service: "1000+ Products",
    price: '',
    theme: "bg-dark text-white",
    titleLink: "/shop"
  },
];

const Services = ({ items }) => {
  return (
    <Container className="home-services">
      <section className={"border-section noTopPadding"}>
        <Row className="d-flex services">
          <Col className={`service-block`}>
            <div
              className={`media `}
            >
              <div className="media-body">
                <h4>
                  <ALink href={"#"}>
                  Recommend
                  </ALink>
                </h4>
                <p>Some Products that we picked for you</p>
              </div>
            </div>
          </Col>
          {items.map((item, index) => {
            return (
              <Col className={`service-block `} key={`service-block-${index}`}>
                <ItemContent item={item} />
              </Col>
            );
          })}
          <Col className={`service-block bg-dark text-white`}>
            <div className={`media`}>
              <div className="media-body">
                <h4>
                  <ALink href={"#"}>View alll</ALink>
                </h4>
                <div className="price">{"1000+ Products"}</div>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default Services;