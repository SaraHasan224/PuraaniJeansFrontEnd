import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router';

import { Form, Label, Input, Row, Col } from 'reactstrap';

import Logo from "../../../components/layouts/headers/common/logo";
import AuthLayout from '../../../components/layouts/auth-layout';
import { Autocomplete, CircularProgress, FormControl, FormHelperText, FormLabel } from '@mui/joy';
import { AUTH_ACTIONS, HOMEPAGE_ACTIONS, META_ACTIONS } from '../../../store/actions';
import { CONSTANTS, HELPER, LOCAL_STORAGE_SERVICE } from '../../../utils';
import ALink from '../../../features/alink';
import AlertComponent from '../../../components/common/alert';

const SignIn = () => {
    const dispatch = useDispatch()
    const { meta, authBanners } = useSelector((state) => state.metadata);
    const { isLoggedIn, isVerified, isVerificationAttempt, retryOtp, authLoading } = useSelector((state) => state.auth);

    const router = useRouter();
    const [open, setOpen] = useState(false);

    const [country, setCountry] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [subsStatus, setSubsStatus] = useState(CONSTANTS.NO);
    const [isLoggedInSubmitPressed, setIsLoggedInSubmitPressed] = useState(false);

    const onSignInAction = () => {
       if(!authLoading && !isLoggedInSubmitPressed) {
        dispatch(AUTH_ACTIONS.SIGNUP_YOUR_ACCOUNT({
            country: country?.code,
            first_name: fName,
            last_name: lName,
            email_address: email,
            password,
            password_confirmation: cpassword,
            subscription: subsStatus,
        }));
        setIsLoggedInSubmitPressed(true)
       }
    }

    useEffect(() => {
        if(HELPER.isEmpty(authBanners)) {
            document.documentElement.style.setProperty("--gradient1", "#ff4c3b");
            document.documentElement.style.setProperty("--gradient2", "#FA4729");
            dispatch(HOMEPAGE_ACTIONS.FETCH_HOMEPAGE_APP_METADATA())
        } 
        dispatch(META_ACTIONS.COUNTRIES_LIST()); // For demo purposes.

        if(isVerified) {
          router.push(`/`);
        }else if(isVerificationAttempt || retryOtp) {
            router.push(`/auth/otp`);
        }else if(isLoggedIn) {
            router.push(`/auth/phone`);
        }


        return () => { };
    }, []);


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
                                Log In to your account
                            </b>
                        </span>
                        <span className="mb-2">
                            Exploring the large variety of clothes with {process.env.NEXT_PUBLIC_APP_NAME}.
                        </span>
                    </h4>
                    <h6 className="mt-4">
                        <span>
                                Don't have an account yet?&nbsp;
                                <ALink href="/auth/signup">
                                    Click here to <b><u>Sign up</u></b>
                                </ALink>
                        </span>
                    </h6>
                    <div className="divider row"></div>
                    <AlertComponent/>
                    <div className="divider row"></div>
                    <div className="mt-5">
                        <Form className="">
                            <Row>
                                <Col xl="12" lg="12" md="12" sm="12">
                                    <div className="form-group">
                                        <Label className="form-label" htmlFor="email">
                                            <b>Email Address</b>
                                        </Label>
                                        <Input
                                            type="email"
                                            defaultValue={email}
                                            onChange={e => setEmail(e.target.value)}
                                            className="form-control"
                                            placeholder="Email"
                                            required={true}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col xl="12" lg="12" md="12" sm="12">
                                    <div className="form-group">
                                        <Label className="form-label" htmlFor="email">
                                            <b>Password</b>
                                        </Label>
                                        <Input
                                            type="password"
                                            defaultValue={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className="form-control"
                                            placeholder="Password"
                                            required={true}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mt-5'>
                                <button
                                    type="submit"
                                    className="btn btn-outline black-btn" onClick={() => onSignInAction()}
                                    disabled={authLoading && !isLoggedIn ? true : false}
                                >Next Step (1/3)
                                </button>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default SignIn;