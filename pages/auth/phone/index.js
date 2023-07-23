import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router';

import { Form, Row, Col } from 'reactstrap';
import { FormControl, FormLabel } from '@mui/joy';

import { parsePhoneNumber, isValidNumber } from "libphonenumber-js";


import withPrivateRoute from '../../../hoc/auth/withPrivateRoute';
import AuthLayout from '../../../components/layouts/auth-layout';
import Logo from "../../../components/layouts/headers/common/logo";
import PhoneNumberComponent from './phone';
import { HELPER } from '../../../utils';
import { AUTH_ACTIONS } from '../../../store/actions';

const LoginMobileVerification = () => {
  const dispatch = useDispatch()

  const { meta } = useSelector((state) => state.metadata);
  const { isPhoneVerifyProcessing } = useSelector((state) => state.auth);

  const router = useRouter();
  const [email, setEmail] = useState("test@gmail.com");

  let errors = {
    phone_number: "",
  };

  const [phoneNumber, setPhoneNumber] = useState('')
  const [country, setCountry] = useState('')

  const [error, setError] = useState(errors);


  const handleChange = (phone, dialCode, country) => {
    let errors = {
      phone_number: "",
    };
    setError(errors);
    setCountry(country);
    setPhoneNumber(phone);
  };

  const validatePhone = () => {
    let code = country.dialCode
    if (phoneNumber.substr(0, code.length) === country.dialCode) {
      return parsePhoneNumber("+" + phoneNumber);
    } else {
      return parsePhoneNumber("+" + country.dialCode + phoneNumber);
    }
  };


  const submitForm = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      onLoginAuthSubmit();
    }
  };

  const submitFormOnClick = (event) => {
    event.preventDefault();

    onLoginAuthSubmit();
  };

  const onLoginAuthSubmit = () => {
    let validationCheck = handleValidation();
    if (validationCheck.phone_number === "") {
      if (!isPhoneVerifyProcessing) {
        dispatch(AUTH_ACTIONS.VERIFY_YOUR_PHONE({
          phone_number: phoneNumber.replace(country.dialCode, ""),
          country_code: country.dialCode,
        }));
      }
    }
  };

  const handleValidation = () => {
    let errors = {
      phone_number: "",
    };
    const phone = validatePhone();
    if (!phoneNumber) {
      errors.phone_number = translate("VALIDATIONS.IS_REQUIRED");
    }
    if (!HELPER.isEmpty(phoneNumber) && isValidNumber(phone.number) === false) {
      errors.phone_number = translate("invalid_phone_number");
    }
    setError(errors);
    return errors;
  };

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
            {
              <div className="country-phone-input">
                <Form onSubmit={submitFormOnClick} id="phone-screen-form">
                  <Row>
                    <Col xl="12" lg="12" md="12" sm="12">
                      <div className="form-group">
                        <FormControl>
                          <FormLabel>Phone Number</FormLabel>
                          <div
                            className={
                              error.phone_number !== ""
                                ? "dropInput formInput md-form error"
                                : "dropInput"
                            }
                          >
                            <div
                              className={
                                error.phone_number !== ""
                                  ? "input-group error"
                                  : "input-group"
                              }
                              unselectable="on"
                              onDoubleClick={(e) => e.preventDefault()}
                              onCut={(e) => e.preventDefault()}
                              onKeyDown={submitForm}
                            >
                              <PhoneNumberComponent
                                countryCode={!HELPER.isEmpty(country) ? country?.dialCode : ""}
                                phone={phoneNumber}
                                handleChange={handleChange}
                                error={!HELPER.isEmpty(error.phone_number) ? true : false}
                                errorMessage={error.phone_number}
                              />
                            </div>
                            {
                              error.phone_number !== "" ? (
                                <span className="errorMessage">{error.phone_number}</span>
                              ) : ""
                            }
                          </div>
                        </FormControl>
                      </div>
                    </Col>
                  </Row>
                  <Row className='mt-2'>
                    <button
                      type="submit"
                      className="btn btn-outline black-btn" onClick={() => onLoginAuthSubmit()}
                      disabled={isPhoneVerifyProcessing ? true : false}
                    >Next Step (2/3)
                    </button>
                  </Row>
                </Form>

              </div>
            }
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default withPrivateRoute(LoginMobileVerification);