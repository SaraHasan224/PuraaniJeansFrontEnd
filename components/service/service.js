import React from "react";
import { Container, Row, Col } from "reactstrap";
import ServiceContent from "./ServiceContent";

const Data = [
  {
    title: "Recommend",
    service: "Some Products that we picked for you",
    mdWidth: 2,
    price: '',
    theme: "",
    titleLink: "/shop"
  },
  {
    link: "/my-assets/images/backgrounds/recommendations/1.png",
    title: "Breakout 2 piece",
    service: "Summer net stuff",
    mdWidth: 3,
    price: 'Rs 2300',
    theme: "",
    titleLink: "/shop"
  },
  {
    link: "/my-assets/images/backgrounds/recommendations/2.png",
    title: "Sapphire pret",
    service: "sapphire pret shirt",
    mdWidth: 3,
    price: 'Rs 10000',
    theme: "",
    titleLink: "/shop"
  },
  {
    link: "/my-assets/images/backgrounds/recommendations/3.png",
    title: "Sana Safinaz lawn",
    service: "Sana safinaz lawn baggy",
    mdWidth: 3,
    price: 'Rs 200',
    theme: "",
    titleLink: "/shop"
  },
  {
    title: "View alll",
    service: "1000+ Products",
    mdWidth: 1,
    price: '',
    theme: "bg-dark text-white",
    titleLink: "/shop"
  },
];

const Services = ({ sectionClass }) => {
  return (
    <Container>
      <section className={sectionClass}>
        <Row>
          {Data.map((data, index) => {
            return (
              <Col md={data?.mdWidth} className={`service-block ${data.theme}`} key={index}>
                <ServiceContent
                  link={data.link}
                  title={data.title}
                  service={data.service}
                  price={data.price}
                  titleLink={data.titleLink}
                />
              </Col>
            );
          })}
        </Row>
      </section>
    </Container>
  );
};

export default Services;
