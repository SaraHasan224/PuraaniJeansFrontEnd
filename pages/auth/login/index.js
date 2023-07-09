import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router';

import { Form, Label, Input, Row, Col } from 'reactstrap';

import Logo from "../../../components/layouts/headers/common/logo";
import AuthLayout from '../../../components/layouts/auth-layout';

const Login = () => {
    const { meta } = useSelector((state) => state.metadata);

    const router = useRouter();
    const [email, setEmail] = useState("test@gmail.com");
    const [password, setPassword] = useState("test123");
    const [name, setName] = useState(
        localStorage.getItem('Name')
    );

    useEffect(() => {
        localStorage.setItem('Name', name);
    }, [name]);

    const loginAuth = () => {
        localStorage.setItem("user", true)
        setTimeout(() => {
            router.push(`/page/account/checkout`);
        }, 200);
    }

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
                        {/* <Form className="theme-form"> */}
                            <Row>
                                <Col xl="6" lg="6" md="6" sm="6">
                                    <div className="form-group">
                                        <Label className="form-label" for="email">
                                            <b>First Name</b>
                                        </Label>
                                        <Input type="text" defaultValue={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email" required="" />
                                    </div>
                                </Col>
                                <Col xl="6" lg="6" md="6" sm="6">
                                    <div className="form-group">
                                        <Label className="form-label" for="email">
                                            <b>Last Name</b>
                                        </Label>
                                        <Input type="text" defaultValue={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email" required="" />
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col xl="6" lg="6" md="6" sm="6">
                                    <div className="form-group">
                                        <Label className="form-label" for="email">
                                            <b>Email Address</b>
                                        </Label>
                                        <Input type="text" defaultValue={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email" required="" />
                                    </div>
                                </Col>
                                <Col xl="6" lg="6" md="6" sm="6">
                                    <div className="form-group">
                                        <Label className="form-label" for="email">
                                            <b>Username</b>
                                        </Label>
                                        <Input type="text" defaultValue={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email" required="" />
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col xl="6" lg="6" md="6" sm="6">
                                    <div className="form-group">
                                        <Label className="form-label" for="email">
                                            <b>Password</b>
                                        </Label>
                                        <Input type="text" defaultValue={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email" required="" />
                                    </div>
                                </Col>
                                <Col xl="6" lg="6" md="6" sm="6">
                                    <div className="form-group">
                                        <Label className="form-label" for="email">
                                            <b>Country</b>
                                        </Label>
                                        <Input type="text" defaultValue={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email" required="" />
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col xl="12" lg="12" md="12" sm="12">
                                    <div className="position-relative form-check">
                                        <Input type="checkbox" defaultValue={email} onChange={e => setEmail(e.target.value)} className="form-control form-check-input" required="" />
                                        <label for="exampleCheck" className="form-check-label">Keep me logged in</label>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <a href="#" className="btn btn-outline black-btn" onClick={() => loginAuth()}>Next Step (1/3)</a>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Login;