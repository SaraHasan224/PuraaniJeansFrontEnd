import React, { useState, useEffect } from 'react';
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
import ALink from '../../../../../features/alink';
import { HELPER } from '../../../../../utils';
import { CLOSET_ACTIONS } from '../../../../../store/actions';
import AlertComponent from '../../../../../components/common/alert';

const SettingsTab = () => {
    const dispatch = useDispatch()

    const { closet } = useSelector((state) => state.closet);
    const { closetRef } = useSelector((state) => state.auth);

    const [closetName, setClosetName] = useState(closet?.name);
    const [closetAbout, setClosetAbout] = useState(closet?.description ?? "");
    const [logo, setLogo] = useState(closet?.logo);
    const [logoDataUrl, setLogoDataUrl] = useState(null);
    const [banner, setBanner] = useState(closet?.banner);
    const [bannerDataUrl, setBannerDataUrl] = useState(null);

    const onSettingsUpdate = () => {
        dispatch(CLOSET_ACTIONS.CLOSET_UPDATE_SETTINGS({
            name: closetName,
            logo: logoDataUrl,
            banner: bannerDataUrl,
            about: closetAbout
        }, closetRef));
    }

    const handleLogoUpload = (files) => {
        setLogo(files);
        HELPER.blobToDataURL(files, function (dataurl) {
            setLogoDataUrl(dataurl)
        });

    };

    const handleBannerUpload = (files) => {
        setBanner(files);
        HELPER.blobToDataURL(files, function (dataurl) {
            setBannerDataUrl(dataurl)
        });
    };

    const resetImage = (type) => {
        if (type == "banner") {
            setBanner(null)
            setBannerDataUrl(null)
        } else {
            setLogo(null)
            setLogoDataUrl(null)
        }
    };

    return (
        <TabPane tabId="5">
            <Row>
                <Col sm="12">
                    <Card className="mt-0">
                        <CardBody>
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
                                            <Col sm="6">
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
                                            <Col sm="6">
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
                                            <Col sm="6">
                                                <h5><b>Closet logo</b></h5>
                                                <Tooltip arrow title="Upload closet logo" htmlFor="raised-button-file">
                                                    <input
                                                        type="file"
                                                        name="myImage"
                                                        accept="image/png, image/pneg, image/gif, image/jpg, image/jpeg, image/webp"
                                                        onChange={(event) => {
                                                            handleLogoUpload(event.target.files[0])
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Col>
                                            <Col sm="6">
                                                {logo && (
                                                    <div>
                                                        <img
                                                            alt="not found"
                                                            width={"250px"}
                                                            src={HELPER.isEmpty(logoDataUrl) ? logo : logoDataUrl}
                                                        />
                                                        <br />
                                                        <button onClick={() => resetImage("logo")} className="btn btn-primary mt-2">
                                                            Remove Icon
                                                        </button>
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
                                        <Row className='mt-4'>
                                            <Col sm="6">
                                                <h5><b>Closet Banner</b></h5>
                                                <Tooltip arrow title="Upload closet banner" htmlFor="raised-button-file">
                                                    <input
                                                        type="file"
                                                        name="myImage"
                                                        accept="image/png, image/pneg, image/gif, image/jpg, image/jpeg, image/webp"
                                                        onChange={(event) => {
                                                            handleBannerUpload(event.target.files[0])
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Col>
                                            <Col sm="6">
                                                {banner && (
                                                    <div>
                                                        <img
                                                            alt="not found"
                                                            width={"250px"}
                                                            src={HELPER.isEmpty(bannerDataUrl) ? banner : bannerDataUrl}
                                                        />
                                                        <br />
                                                        <button onClick={() => resetImage("banner")} className="btn btn-primary mt-2">
                                                            Remove Banner
                                                        </button>
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
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