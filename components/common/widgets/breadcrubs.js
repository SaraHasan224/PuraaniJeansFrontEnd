import React from "react";
import { useRouter } from 'next/router';

import { Container, Row, Col } from "reactstrap";
import Link from 'next/link';
import ALink from "../../../features/alink";

const Breadcrubs = ({ title, parent, subTitle }) => {
  const router = useRouter();
  const type = router.query.type;
  const query = router.query;

  return (
    <>
      <div className="breadcrumb-section">
        <Container>
          <Row>
            <Col sm="6">
              <div className="page-title">
                <h2>{title}</h2>
              </div>
            </Col>
            <Col sm="6">
              <nav aria-label="breadcrumb" className="theme-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">{parent}</Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    {title}
                  </li>
                  {subTitle === undefined ? (
                    ""
                  ) : (
                    <li className="breadcrumb-item active" aria-current="page">
                      {subTitle}
                    </li>
                  )}
                </ol>
              </nav>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Breadcrubs;
