import React, { Fragment } from 'react';
import { Container, Row, Col, Media } from 'reactstrap';
import ALink from '../../features/alink';

const CopyRight = ({ layout, fluid }) => {
    return (
        <Fragment>
            <div className={`sub-footer ${layout}`}>
                <Container fluid={fluid}>
                    <Row>
                        <Col xl="6" md="6" sm="12">
                            <div className="footer-end">
                                <p><i className="fa fa-copyright" aria-hidden="true"></i> {process.env.NEXT_PUBLIC_COPYRIGHTS} <span>{process.env.NEXT_PUBLIC_COPYRIGHTS_COMPANY_NAME}</span></p>
                            </div>
                        </Col>
                        <Col xl="6" md="6" sm="12">
                            <div className="payment-card-bottom">
                                <ul>
                                    <li>
                                        <ALink href={`/`}>Main</ALink>
                                    </li>
                                    <li>
                                        <ALink href="#">Portfolios</ALink>
                                    </li>
                                    <li>
                                        <ALink href={`/page/account/contact`}>Contact Us</ALink>
                                    </li>
                                    <li>
                                        <ALink href={`/page/about-us`}>About Us</ALink>
                                    </li>
                                    <li>
                                        <ALink href={`/page/faq`}>FAQs</ALink>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    )
}

export default CopyRight;