import React, { useState, useEffect, createRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { Textarea, Tooltip } from '@mui/joy';
import {
    Form,
    Row,
    Col,
    Card,
    CardBody,
    Input,
    TabPane,
} from "reactstrap";
import Resizer from "react-image-file-resizer";
import { COOKIE_STORAGE_SERVICE, HELPER } from '../../../../../utils';
import { CLOSET_ACTIONS } from '../../../../../store/actions';
import AlertComponent from '../../../../../components/common/alert';
import { AUTH_CONSTANTS, CLOSET_CONSTANTS } from '../../../../../store/actionTypes';
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

function resizeFile(file, maxWidth, maxHeight, width, height = 0) {
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            maxWidth,
            maxHeight,
            "PNG",
            width,
            height,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });
}

const SettingsTab = () => {
    const dispatch = useDispatch()
    const router = useRouter();

    const { closet } = useSelector((state) => state.closet);
    const { closetRef } = useSelector((state) => state.auth);

    const [closetName, setClosetName] = useState(closet?.name);
    const [closetAbout, setClosetAbout] = useState(closet?.description ?? "");
    const [logo, setLogo] = useState('');
    const [banner, setBanner] = useState('');
    // const [logoDataUrl, setLogoDataUrl] = useState("");
    // const [bannerDataUrl, setBannerDataUrl] = useState("");
    const logoCropperRef = createRef();
    const bannerCropperRef = createRef();

    const onSettingsUpdate = () => {
        if (typeof logoCropperRef.current?.cropper !== "undefined") {
            setLogo(logoCropperRef.current?.cropper.getCroppedCanvas().toDataURL());
        }
        if (typeof bannerCropperRef.current?.cropper !== "undefined") {
            setBanner(bannerCropperRef.current?.cropper.getCroppedCanvas().toDataURL());
        }
        
        dispatch(CLOSET_ACTIONS.CLOSET_UPDATE_SETTINGS({
            name: closetName,
            logo: HELPER.isNotEmpty(logo) ? logo : closet?.logo,
            banner: HELPER.isNotEmpty(banner) ? banner : closet?.banner,
            // logo: logoDataUrl,
            // banner: bannerDataUrl,
            about: closetAbout
        }, closetRef));
    }

    const handleLogoUpload = async (e) => {
        // const handleLogoUpload = async(file) => {
        try {
            e.preventDefault();
            let files;
            if (e.dataTransfer) {
                files = e.dataTransfer.files;
            } else if (e.target) {
                files = e.target.files;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setLogo(reader.result);
            };
            reader.readAsDataURL(files[0]);

            // const image = await resizeFile(file, 300, 300, 300, 0);
            // setLogo(file);
            // setLogoDataUrl(image)
        } catch (err) {
            console.log(err);
        }
        // setLogo(files);
        // HELPER.blobToDataURL(files, function (dataurl) {
        // setLogoDataUrl(dataurl)
        // });

    };

    const handleBannerUpload = async (e) => {
        // const handleBannerUpload = async (file) => {
        try {
            e.preventDefault();
            let files;
            if (e.dataTransfer) {
                files = e.dataTransfer.files;
            } else if (e.target) {
                files = e.target.files;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setBanner(reader.result);
            };
            reader.readAsDataURL(files[0]);

            // const image = await resizeFile(file, 1100, 400, 1100, 0);
            // setBanner(file);
            // setBannerDataUrl(image)
        } catch (err) {
            console.log(err);
        }
    };

    const resetImage = (type) => {
        if (type == "banner") {
            setBanner(null)
            // setBannerDataUrl(null)
        } else {
            setLogo(null)
            // setLogoDataUrl(null)
        }
    };

    const signOutOfMyAccount = () => {
        COOKIE_STORAGE_SERVICE._removeAccessToken();
        dispatch({ type: AUTH_CONSTANTS.RESET_DETAILS })
        dispatch({ type: CLOSET_CONSTANTS.RESET_DETAILS })
        router.push(`/`, undefined, { shallow: true });
    };

    return (
        <TabPane tabId="5">
            <Row>
                <Col sm="12">
                    <Card className="mt-0">
                        <CardBody>
                            <Card className="dashboard-table mt-0">
                                <CardBody>
                                    <div className="top-sec">
                                        <button onClick={() => signOutOfMyAccount()} className="btn btn-sm btn-solid">
                                            Sign out
                                        </button>
                                    </div>
                                </CardBody>
                            </Card>
                            <div className="dashboard-box">
                                <div className="dashboard-title">
                                    <h4>Settings</h4>
                                </div>
                                <div className="dashboard-detail">
                                    <div className="account-setting">
                                        <Row>
                                            <Col sm="12">
                                                <div className="divider row"></div>
                                                <AlertComponent />
                                                <div className="divider row"></div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6" md="6" sm="12">
                                                <h5>
                                                    <b>Change Closet Name</b>
                                                </h5>
                                                <Input type="text" className="form-control" placeholder="Enter your closet name"
                                                    onChange={(e) => setClosetName(e.target.value)}
                                                    value={closetName}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className='mt-2'>
                                            <Col lg="6" md="6" sm="12">
                                                <h5>
                                                    <b>Change Closet Description</b>
                                                </h5>
                                                <Textarea minRows={4} name="Outlined" variant="outlined"
                                                    placeholder="Enter something about your closet" onChange={(e) => setClosetAbout(e.target.value)}
                                                    value={closetAbout}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className='mt-2'>
                                            <Col lg="6" md="6" sm="12">
                                                <h5><b>Closet logo</b></h5>
                                                <Tooltip arrow title="Upload closet logo" htmlFor="raised-button-file">
                                                    <input
                                                        type="file"
                                                        name="myImage"
                                                        accept="image/png, image/pneg, image/gif, image/jpg, image/jpeg"
                                                        onChange={(event) => {
                                                            handleLogoUpload(event)
                                                            // handleLogoUpload(event.target.files[0])
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Col>
                                            <Col lg="6" md="6" sm="12">
                                                {closet?.logo && (
                                                    <div>
                                                        <img
                                                            alt="not found"
                                                            width={"250px"}
                                                            src={closet?.logo}
                                                        />
                                                        <br />
                                                        {logo && <button onClick={() => resetImage("logo")} className="btn btn-primary mt-2">
                                                            Remove Icon
                                                        </button> }
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
                                        { logo ? <Row>
                                            <Col lg="12" md="12" sm="12">
                                                <Cropper
                                                    ref={logoCropperRef}
                                                    style={{ height: 100, width: "100%" }}
                                                    zoomTo={-0.000001}
                                                    initialAspectRatio={1}
                                                    preview=".img-preview"
                                                    src={logo}
                                                    viewMode={1}
                                                    minCropBoxHeight={130}
                                                    minCropBoxWidth={130}
                                                    minCanvasHeight={130}
                                                    minCanvasWidth={130}
                                                    background={false}
                                                    responsive={true}
                                                    cropBoxResizable={false}
                                                    cropBoxMovable={false}
                                                    autoCropArea={1}
                                                    aspectRatio={1.4}
                                                    checkOrientation={false} 
                                                    guides={false}
                                                    toggleDragModeOnDblclick={false}
                                                />
                                            </Col>
                                        </Row> : "" }
                                        <Row className='mt-4'>
                                            <Col lg="6" md="6" sm="12">
                                                <h5><b>Closet Banner</b></h5>
                                                <Tooltip arrow title="Upload closet banner" htmlFor="raised-button-file">
                                                    <input
                                                        type="file"
                                                        name="myImage"
                                                        accept="image/png, image/pneg, image/gif, image/jpg, image/jpeg"
                                                        onChange={(event) => {
                                                            handleBannerUpload(event)
                                                            // handleBannerUpload(event.target.files[0])
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Col>
                                            <Col lg="6" md="6" sm="12">
                                                {closet?.banner && (
                                                    <div>
                                                        <img
                                                            alt="not found"
                                                            width={"250px"}
                                                            src={closet?.banner}
                                                        />
                                                        <br />
                                                        {banner && <button onClick={() => resetImage("banner")} className="btn btn-primary mt-2">
                                                            Remove Banner
                                                        </button> }
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
                                        { banner ? <Row>
                                            <Col lg="12" md="12" sm="12">
                                                <Cropper
                                                    ref={bannerCropperRef}
                                                    style={{ height: 100, width: "100%" }}
                                                    zoomTo={-0.000001}
                                                    initialAspectRatio={1}
                                                    preview=".img-preview"
                                                    src={banner}
                                                    viewMode={1}
                                                    minCropBoxHeight={230}
                                                    minCropBoxWidth={230}
                                                    minCanvasHeight={130}
                                                    minCanvasWidth={130}
                                                    background={false}
                                                    responsive={true}
                                                    cropBoxResizable={false}
                                                    cropBoxMovable={false}
                                                    autoCropArea={1}
                                                    aspectRatio={2.5}
                                                    checkOrientation={false} 
                                                    guides={false}
                                                    toggleDragModeOnDblclick={false}
                                                />
                                            </Col>
                                        </Row> : "" }
                                        <Row>
                                            <Col sm="12">
                                                <button onClick={(e) => onSettingsUpdate(e)} className="btn btn-solid btn-green btn-sm">
                                                    Save
                                                </button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </TabPane>
    );
}

export default SettingsTab;