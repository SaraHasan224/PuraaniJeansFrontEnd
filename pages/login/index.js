import React from 'react';
import AuthSlider from '../../components/auth/slider';
import { Helmet } from 'react-helmet';

const Login = () => {
    return (
        <>
            <Helmet>
            {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
            {/* <link rel="icon" type="image/x-icon" href={"/my-assets/images/icons/favicon.png"} /> */}
            {/* <title>{process.env.NEXT_PUBLIC_APP_NAME} - {process.env.NEXT_PUBLIC_APP_SUB_TITLE}</title> */}
            </Helmet>
            <div className="app-container app-theme-white body-tabs-shadow">
                <div className="app-container">
                    <div className="h-100">
                        <div className="h-100 no-gutters row">
                            <div className="d-none d-lg-block col-lg-4">
                                <AuthSlider/>
                            </div>
                            <div className="h-100 d-flex bg-white justify-content-center align-items-center col-md-12 col-lg-8">
                                <div className="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
                                    <div className="app-logo"></div>
                                    <h4 className="mb-0">
                                        <span className="d-block">Welcome back,</span>
                                        <span>Please sign in to your account.</span></h4>
                                    <div className="divider row"></div>
                                    <div>
                                        <form method="POST" id="form-signin" autoComplete="off" action="{{ route('signin') }}">
                                            <div className="form-row">
                                                <div className="col-md-12">
                                                
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label for="exampleEmail" className="">Email</label>
                                                        <input
                                                            name="email"
                                                            id="email"
                                                            placeholder="Enter your email"
                                                            type="email"
                                                            className="form-control"
                                                            maxlength="100"
                                                            autofocus="true"
                                                            value="{{request()->get('email')  ?? session('email') ?? old('email')}}"
                                                        />
                                                            <p id="email_error" className="help-block error"></p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label for="examplePassword" className="">Password</label>
                                                        <div className="pRelative">
                                                            <input
                                                                name="password"
                                                                id="password"
                                                                placeholder="••••••••••••••"
                                                                type="password"
                                                                className="form-control pwdField"
                                                                required
                                                                autocomplete="off"
                                                                minLength="6"
                                                                maxlength="20"
                                                            />
                                                                <span id="toggle_pwd" className="fas fa-fw fa-eye pwd-icon"></span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="position-relative form-check">
                                                <input name="check" id="exampleCheck" type="checkbox" className="form-check-input"/>
                                                    <label for="exampleCheck" className="form-check-label">Keep me logged in</label>
                                            </div>
                                            <div className="divider row"></div>
                                            <div className="d-flex align-items-center">
                                                <div className="ml-auto">
                                                    <a className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="{{ route('password.request') }}">
                                                    Forgot your password?
                                                    </a>
                                                    <button className="btn btn-primary btn-lg" type="submit">Login to Dashboard</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;