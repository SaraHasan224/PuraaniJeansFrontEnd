import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router';

import { Form, Label, Input, Row, Col } from 'reactstrap';

import withPrivateRoute from '../../../hoc/auth/withPrivateRoute';
import AuthLayout from '../../../components/layouts/auth-layout';
import Logo from "../../../components/layouts/headers/common/logo";
import AlertComponent from '../../../components/common/alert';
import useOtp from '../../../hooks/useOtp'
import OtpInput from './otpInput'

const LoginOtpVerification = () => {
    const router = useRouter();
    
	const { verify_otp, setVerify_otp, submitOTP, sendOTP, digitLimit } = useOtp()
    const { meta } = useSelector((state) => state.metadata);
    const { isVerificationAttemptPhone, isVerified } = useSelector((state) => state.auth);


    useEffect(() => {
        if(isVerified) {
          router.push(`/`);
        }
      }, []);

    useEffect(() => {
        if (isVerified) {
          router.push(`/`);
        }
      }, [isVerified]);

    return (
        <AuthLayout parent="home" title="login">
            <div className="d-flex bg-white justify-content-center align-items-center">
                <div className="app-login-box">
                    <div className="brand-logo layout2-logo">
                        <Logo logo={meta?.logo} />
                    </div>
                    <h4 className="mb-0">
                        <span className="d-block mb-2">
                            <b>
                                Otp Verification
                            </b>
                        </span>
                        <span className="mb-2">
                            We’ve sent a 6-digit code to your number {isVerificationAttemptPhone}.
                        </span>
                    </h4>
                    <div className="divider row"></div>
                    <AlertComponent/>
                    <div className="divider row"></div>
                    <div className="mt-5">
                        <Form className="">
                            <Row>
                                <Col xl="8" lg="8" md="8" sm="8">
                                    <OtpInput
                                        value={verify_otp}
                                        onChange={(val) => setVerify_otp(val)}
                                        numInputs={6}
                                        isInputNum
                                        shouldAutoFocus={true}
                                        separator={<span>-</span>}
                                        className="otpFields"
                                    />
                                </Col>
                            </Row>
                            <Row className='mt-5'>
                                <a href="#" className="btn btn-outline black-btn" onClick={(e) => submitOTP(e)}>Next Step (3/3)</a>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default withPrivateRoute(LoginOtpVerification);