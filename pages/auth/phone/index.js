import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router';

import { Form, Label, Input, Row, Col } from 'reactstrap';

import AuthLayout from '../../../components/layouts/auth-layout';
import Logo from "../../../components/layouts/headers/common/logo";

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
                                Enter the code
                            </b>
                        </span>
                        <span className="mb-2">
                            We need to verify your account.
                        </span>
                    </h4>
                    <div className="divider row"></div>
                    <div className="mt-5">
                        <Form className="">
                            <Row>
                                <Col xl="12" lg="12" md="12" sm="12">
                                    <div className="form-group">
                                        <Label className="form-label" for="email">
                                            <b>Phone number</b>
                                        </Label>
                                        <Input type="text" defaultValue={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email" required="" />
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mt-5'>
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