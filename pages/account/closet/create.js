import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Input, Form } from "reactstrap";

import CommonLayout from '../../../components/layouts/common-layout';

import vendor from "../../../public/my-assets/images/backgrounds/main-banner/create-closet.png";
import withPrivateRoute from '../../../hoc/auth/withPrivateRoute';
import { CLOSET_ACTIONS } from '../../../store/actions';
import { Textarea, Tooltip } from '@mui/joy';
import { HELPER } from '../../../utils';

const BannerData = [
    {
        no: "1",
        title: "List your products & Get support service provider",
        desc:
            "Register your business for free and create a productcatalogue. Sell under your own private label or sell an existing brand. Get your documentation & cataloging done with ease from our Professional Services network.",
    },
    {
        no: "2",
        title: "Receive Orders & Schedule A Pickup",
        desc:
            "Once listed, your products will be available to millions of users.Get orders and manage your online business via our Seller Panel and Seller Zone Mobile App.",
    },
    {
        no: "3",
        title: "Receive Quick Payment & Grow Your Business",
        desc:
            "Receive quick and hassle-free payments in your account once your orders are fulfilled. Expand your business with low interest & collateral-free loans.",
    },
];

const BannerComponent = ({ no, title, desc }) => {
    return (
        <Col lg="4">
            <div className="step-box">
                <div>
                    <div className="steps">{no}</div>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                </div>
            </div>
        </Col>
    );
};


const CreateCloset = () => {
    const router = useRouter();
    const dispatch = useDispatch()

    const { closetLoggedIn } = useSelector((state) => state.closet);
    const { closetRef } = useSelector((state) => state.auth);

    const [closetName, setClosetName] = useState("");
    const [closetAbout, setClosetAbout] = useState("");
    const [logoDataUrl, setLogoDataUrl] = useState(null);
    const [bannerDataUrl, setBannerDataUrl] = useState(null);

    useEffect(() => {
        if (closetLoggedIn) {
            router.push(`/account/closet/dashboard/${closetRef}`, undefined, { shallow: true });
        }
    }, [closetLoggedIn]);

    const onClosetCreation = () => {
        dispatch(CLOSET_ACTIONS.CREATE_CLOSET({
            name: closetName,
            logo: logoDataUrl,
            banner: bannerDataUrl,
            about: closetAbout
        }));
    }

    const handleLogoUpload = (files) => {
        HELPER.blobToDataURL(files, function (dataurl) {
            setLogoDataUrl(dataurl)
        });

    };

    const handleBannerUpload = (files) => {
        HELPER.blobToDataURL(files, function (dataurl) {
            setBannerDataUrl(dataurl)
        });
    };

    const resetImage = (type) => {
        if (type == "banner") {
            setBannerDataUrl(null)
        } else {
            setLogoDataUrl(null)
        }
    };

    return (
        <CommonLayout parent="home" title="Create your closet">
            <>
                <section className="about-page section-b-space">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <div className="banner-section">
                                    <img src={vendor.src} className="img-fluid blur-up lazyload" alt="" />
                                </div>
                            </Col>
                            <Col sm="12">
                                <h4>
                                    Start your business with {process.env.NEXT_PUBLIC_APP_NAME} & reach customers across the
                                    World...
                                </h4>
                                <p className="mb-0">
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                    accusantium doloremque laudantium,
                                </p>
                                <p>
                                    On the other hand, we denounce with righteous indignation and
                                    dislike men who are so beguiled and demoralized by the charms of
                                    pleasure of the moment, so blinded by desire, that they cannot
                                    foresee the pain and trouble that are bound to ensue; and equal
                                    blame belongs to those who fail in their duty through weakness
                                    of will, which is the same as saying through shrinking from toil
                                    and pain. These cases are perfectly simple and easy to
                                    distinguish. In a free hour, when our power of choice is
                                    untrammelled and when nothing prevents our being able to do what
                                    we like best, every pleasure is to be welcomed and every pain
                                    avoided. But in certain circumstances and owing to the claims of
                                    duty or the obligations of business it will frequently occur
                                    that pleasures have to be repudiated and annoyances accepted.
                                    The wise man therefore always holds in these matters to this
                                    principle of selection: he rejects pleasures to secure other
                                    greater pleasures, or else he endures pains to avoid worse
                                    pains.
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* <!-- how to start section start --> */}
                <section className="section-b-space become-closet">
                    <Container>
                        <h4>doing business on {process.env.NEXT_PUBLIC_APP_NAME} is really easy</h4>
                        <div className="step-bg">
                            <Row>
                                {BannerData.map((banner, i) => {
                                    return (
                                        <BannerComponent key={i} no={banner.no} title={banner.title} desc={banner.desc} />
                                    );
                                })}
                            </Row>
                        </div>
                    </Container>
                </section>
                {/* <!-- how to start section end --> */}

                {/* <!-- start selling section start --> */}
                <section className="start-selling section-b-space">
                    <Container>
                        <Col>
                            <div>
                                <h4>start selling</h4>
                                <p>
                                    {process.env.NEXT_PUBLIC_APP_NAME} marketplace is leading platform for selling
                                    online. Be it a manufacturer, vendor or supplier, simply sell
                                    your products online on {process.env.NEXT_PUBLIC_APP_NAME} and become a top ecommerce
                                    player with minimum investment. Through a team of experts
                                    offering exclusive seller workshops, training, seller support
                                    and convenient seller portal, {process.env.NEXT_PUBLIC_APP_NAME} focuses on educating and
                                    empowering sellers across Pakistan. Selling on {process.env.NEXT_PUBLIC_APP_NAME}.com is
                                    easy and absolutely free. All you need is to register, list your
                                    catalogue and start selling your products.
                                </p>
                                <Row>
                                    <Col lg="6" md="6" sm="6" xs="6">
                                        <div className="account-setting">
                                            <h5><b>Closet Name</b></h5>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your closet name"
                                                onChange={(e) => setClosetName(e.target.value)}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg="6" md="6" sm="6" xs="6">
                                        <div className="account-setting">
                                            <h5><b>Closet Description</b></h5>
                                            <Textarea
                                                minRows={4}
                                                name="Outlined"
                                                variant="outlined"
                                                placeholder="Enter something about your closet"
                                                onChange={(e) => setClosetAbout(e.target.value)}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='mt-5'>
                                    <Col lg="6" md="6" sm="6" xs="6">
                                        <div className="account-setting">
                                            <h5><b>Closet logo</b></h5>
                                            <Tooltip arrow title="Upload closet logo" htmlFor="raised-button-file">
                                                <input
                                                    type="file"
                                                    name="myImage"
                                                    onChange={(event) => {
                                                        handleLogoUpload(event.target.files[0])
                                                    }}
                                                />
                                            </Tooltip>
                                            {logoDataUrl && (
                                                <div>
                                                    <img
                                                        alt="not found"
                                                        width={"250px"}
                                                        src={logoDataUrl}
                                                    />
                                                    <br />
                                                    <button onClick={() => resetImage("logo")} className="btn btn-primary mt-0">
                                                        Remove Icon
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col lg="6" md="6" sm="6" xs="6">
                                        <div className="account-setting">
                                            <h5><b>Closet Banner</b></h5>
                                            <Tooltip arrow title="Upload closet banner" htmlFor="raised-button-file">
                                                <input
                                                    type="file"
                                                    name="myImage"
                                                    onChange={(event) => {
                                                        handleBannerUpload(event.target.files[0])
                                                    }}
                                                />
                                            </Tooltip>
                                            {bannerDataUrl && (
                                                <div>
                                                    <img
                                                        alt="not found"
                                                        width={"250px"}
                                                        src={bannerDataUrl}
                                                    />
                                                    <br />
                                                    <button onClick={() => resetImage("banner")} className="btn btn-primary mt-0">
                                                        Remove Banner
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <button onClick={(e) => onClosetCreation(e)} className="btn btn-solid btn-sm">
                                    start selling
                                </button>
                            </div>
                        </Col>
                    </Container>
                </section>
                {/* <!-- start selling section end --> */}
            </>
        </CommonLayout>
    )
}
export default withPrivateRoute(CreateCloset);