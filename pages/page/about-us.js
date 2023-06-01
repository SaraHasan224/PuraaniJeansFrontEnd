import React from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row, Col, Media } from "reactstrap";
import aboutus from "../../public/assets/images/about/about-us.jpg";
import Slider from "react-slick";
import { Slider2 } from "../../services/script";


const TeamDetailData = [
  {
    img: '/assets/images/avtar.jpg',
    name: "john doe",
    post: "designer",
    about:
      "Sometimes your only available transportation is a leap of faith.",
  },
  {
    img: '/assets/images/2.jpg',
    name: "john doe",
    post: "designer",
    about:
      "Sometimes your only available transportation is a leap of faith.",
  },
  {
    img: '/assets/images/avtar.jpg',
    name: "john doe",
    post: "designer",
    about:
      "Sometimes your only available transportation is a leap of faith.",
  },
  {
    img: '/assets/images/avtar.jpg',
    name: "john doe",
    post: "designer",
    about:
      "Sometimes your only available transportation is a leap of faith.",
  },
  {
    img: '/assets/images/avtar.jpg',
    name: "john doe",
    post: "designer",
    about:
      "Sometimes your only available transportation is a leap of faith.",
  },
  {
    img: '/assets/images/avtar.jpg',
    name: "john doe",
    post: "designer",
    about:
      "Sometimes your only available transportation is a leap of faith.",
  },
];

const TeamDetail = ({ img, name, post, about }) => {
  return (
    <div>
      <div className="media">
        <div className="text-center">
          <Media src={img} alt="#" />
          <h5>{name}</h5>
          <h6>{post}</h6>
        </div>
        <div className="media-body">
          <p>{about}</p>
        </div>
      </div>
    </div>
  );
};
const AboutUs = () => {
  return (
    <>
      <CommonLayout parent="home" title="About-us">
        {/* // <!-- about section start --> */}
        <section className="about-page section-b-space">
          <Container>
            <Row>
              <Col lg="12">
                <div className="banner-section">
                  <Media
                    src={aboutus.src}
                    className="img-fluid blur-up lazyload"
                    alt=""
                  />
                </div>
              </Col>
              <Col sm="12">
                <h4>
                  A flower knows, when its butterfly will return, and if the moon walks out, the sky will understand
                </h4>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                  The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        {/* <!--Testimonial start--> */}
        <section className="testimonial small-section">
          <Container>
            <Row>
              <Col sm="12">
                <Slider
                  {...Slider2}
                  className="slide-2 testimonial-slider no-arrow"
                >
                  {TeamDetailData.map((data, i) => {
                    return (
                      <TeamDetail
                        key={i}
                        img={data.img}
                        name={data.name}
                        post={data.post}
                        about={data.about}
                      />
                    );
                  })}
                </Slider>
              </Col>
            </Row>
          </Container>
        </section>
        {/* <!--Testimonial ends--> */}
      </CommonLayout>
    </>
  );
};

export default AboutUs;
