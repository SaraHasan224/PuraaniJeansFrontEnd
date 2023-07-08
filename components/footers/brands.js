import React from "react";
import Brands from "../common/brands";
import ALink from "../../features/alink";

const BrandsFooter = ({title, description, btn_name, bg_img_src}) => {
return (
<>
    <div>
        <section className="p-0 brands-parallax d-flex">
            <div className="full-banner parallax parallax-banner19 text-center p-center">
                <div className="container">
                    <div className="row">
                        <div className="col-9">
                            <div className="banner-contain">
                                <h4>{title}</h4>
                                <p>{description}</p>
                                <ALink href={"/"} className="btn btn-solid black-btn" tabIndex="0">
                                    {btn_name}
                                </ALink>
                            </div>
                            <div className="ml-3 mr-3">
                                <Brands />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="brands-bg">
                                <img src={bg_img_src} alt="" className="img-fluid blur-up lazyload media" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</>
);
};
export default BrandsFooter;