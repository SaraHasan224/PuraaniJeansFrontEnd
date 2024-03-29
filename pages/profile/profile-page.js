import React from 'react';
import { Container, Row, Form, Input, Label, Col } from 'reactstrap';

const ProfilePage = () => {
    return (
        <>
            <section className="contact-page register-page">
                <Container>
                    <Row>
                        <Col sm="12">
                            <h3>PERSONAL DETAIL</h3>
                            <Form className="theme-form">
                                <Row>
                                    <Col md="6">
                                        <Label className="form-label" htmlFor="name">First Name</Label>
                                        <Input type="text" className="form-control" id="name" placeholder="Enter Your name"
                                            required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" htmlFor="email">Last Name</Label>
                                        <Input type="text" className="form-control" id="last-name" placeholder="Email" required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" htmlFor="review">Phone number</Label>
                                        <Input type="number" className="form-control" id="review" placeholder="Enter your number"
                                            required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" htmlFor="email">Email</Label>
                                        <Input type="email" className="form-control" id="email" placeholder="Email" required="" />
                                    </Col>
                                    <Col md="12">
                                        <Label className="form-label" htmlFor="review">Write Your Message</Label>
                                        <textarea className="form-control mb-0" placeholder="Write Your Message"
                                            id="exampleFormControlTextarea1" rows="6"></textarea>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="contact-page register-page section-b-space">
                <Container>
                    <Row>
                        <Col sm="12">
                            <h3>SHIPPING ADDRESS</h3>
                            <Form className="theme-form">
                                <Row>
                                    <Col md="6">
                                        <Label className="form-label" htmlFor="name">flat / plot</Label>
                                        <Input type="text" className="form-control" id="home-ploat" placeholder="company name"
                                            required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" htmlFor="name">Address *</Label>
                                        <Input type="text" className="form-control" id="address-two" placeholder="Address"
                                            required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" htmlFor="email">Zip Code *</Label>
                                        <Input type="number" className="form-control" id="zip-code" placeholder="zip-code"
                                            required="" />
                                    </Col>
                                    <Col md="6" className="select_input">
                                        <Label className="form-label" htmlFor="review">Country *</Label>
                                        <select className="form-select py-2" size="1">
                                            <option value="Pakistan">Pakistan</option>
                                            <option value="UAE">UAE</option>
                                            <option value="U.K">U.K</option>
                                            <option value="US">US</option>
                                        </select>
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" htmlFor="review">City *</Label>
                                        <Input type="text" className="form-control" id="city" placeholder="City" required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" htmlFor="review">Region/State *</Label>
                                        <Input type="text" className="form-control" id="region-state" placeholder="Region/state"
                                            required="" />
                                    </Col>
                                    <div className="col-md-12">
                                        <button className="btn btn-sm btn-solid" type="submit">Save setting</button>
                                    </div>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ProfilePage;