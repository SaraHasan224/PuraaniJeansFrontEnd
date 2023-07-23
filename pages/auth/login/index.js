import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router';

import { Form, Label, Input, Row, Col } from 'reactstrap';

import Logo from "../../../components/layouts/headers/common/logo";
import AuthLayout from '../../../components/layouts/auth-layout';
import { Autocomplete, CircularProgress, FormControl, FormHelperText, FormLabel } from '@mui/joy';
import { AUTH_ACTIONS, HOMEPAGE_ACTIONS, META_ACTIONS } from '../../../store/actions';
import { CONSTANTS, HELPER, LOCAL_STORAGE_SERVICE } from '../../../utils';

const Login = () => {
    const dispatch = useDispatch()

    const { meta, metaLoading, metaCountryList, authBanners } = useSelector((state) => state.metadata);
    const { isLoggedIn, isLoggedInCustomer, isLoggedProcessing } = useSelector((state) => state.auth);

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

    const onLoginAuthSubmit = () => {
       if(!isLoggedProcessing && !isLoggedInSubmitPressed) {
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
        return () => { };
    }, []);

    useEffect(() => {
        if(isLoggedIn) {
            LOCAL_STORAGE_SERVICE._saveToLocalStorage("user", true)
            LOCAL_STORAGE_SERVICE._saveToLocalStorage("user_info", isLoggedInCustomer);
            router.push(`/auth/phone`);
        }
    }, [isLoggedIn]);


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
                                Create your account
                            </b>
                        </span>
                        <span className="mb-2">
                            Exploring the large variety of clothes with Purani jeans.
                        </span>
                    </h4>
                    <div className="divider row"></div>
                    <div className="mt-5">
                        <Form className="">
                            <Row>
                                <Col xl="6" lg="6" md="6" sm="6">
                                    <div className="form-group">
                                        <FormControl>
                                            <FormLabel>Country</FormLabel>
                                            <Autocomplete
                                                placeholder="Select home country"
                                                open={open}
                                                onOpen={() => {
                                                    setOpen(true);
                                                }}
                                                onClose={() => {
                                                    setOpen(false);
                                                }}
                                                required={true}
                                                onChange={(e, values) => setCountry(values)}
                                                isOptionEqualToValue={(option, value) => option.name === value.name}
                                                getOptionLabel={(option) => option.name}
                                                options={metaCountryList}
                                                loading={metaLoading}
                                                endDecorator={
                                                    metaLoading ? (
                                                        <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                                                    ) : null
                                                }
                                            />
                                            <FormHelperText>Select your home country.</FormHelperText>
                                        </FormControl>
                                    </div>
                                </Col>
                                <Col xl="6" lg="6" md="6" sm="6">
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
                                <Col xl="6" lg="6" md="6" sm="6">
                                    <div className="form-group">
                                        <Label className="form-label" htmlFor="email">
                                            <b>First Name</b>
                                        </Label>
                                        <Input
                                            type="text"
                                            defaultValue={fName}
                                            onChange={e => setFName(e.target.value)}
                                            className="form-control"
                                            placeholder="First Name"
                                            required={true}
                                        />
                                    </div>
                                </Col>
                                <Col xl="6" lg="6" md="6" sm="6">
                                    <div className="form-group">
                                        <Label className="form-label" htmlFor="email">
                                            <b>Last Name</b>
                                        </Label>
                                        <Input
                                            type="text"
                                            defaultValue={lName}
                                            onChange={e => setLName(e.target.value)}
                                            className="form-control"
                                            placeholder="Last Name"
                                            required={true}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col xl="6" lg="6" md="6" sm="6">
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
                                <Col xl="6" lg="6" md="6" sm="6">
                                    <div className="form-group">
                                        <Label className="form-label" htmlFor="email">
                                            <b>Password Confirmation</b>
                                        </Label>
                                        <Input
                                            type="password"
                                            defaultValue={cpassword}
                                            onChange={e => setCPassword(e.target.value)}
                                            className="form-control"
                                            placeholder="Password Confirmation"
                                            required={true}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col xl="12" lg="12" md="12" sm="12">
                                    <div className="position-relative form-check">
                                        <Input
                                            type="checkbox"
                                            defaultValue={subsStatus}
                                            onChange={e => setSubsStatus(!subsStatus)}
                                            className="form-control form-check-input"
                                            required={true}
                                        />
                                        <label htmlFor="exampleCheck" className="form-check-label">Keep me logged in</label>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <button
                                    type="submit"
                                    className="btn btn-outline black-btn" onClick={() => onLoginAuthSubmit()}
                                    disabled={isLoggedProcessing ? true : false}
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

export default Login;