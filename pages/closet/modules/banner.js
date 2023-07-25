import { Col, Media } from "reactstrap";

const CollectionBanner = ({ img, about, offer, classes }) => {
  return (
    <Col md="12">
        <a>
          <div className={`collection-banner ${classes}`}>
            <Media src={img} className="img-fluid" alt="" />
            <div className="contain-banner">
              <div>
                <h4>{offer}</h4>
                <h2>{about}</h2>
              </div>
            </div>
          </div>
        </a>
    </Col>
  );
};

export default CollectionBanner;