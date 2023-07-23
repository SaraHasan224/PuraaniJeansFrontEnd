import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { isIOS, isIPhone13 } from "react-device-detect";
import startsWith from "lodash.startswith";
import { HELPER } from "../../../utils";

let countryMatched

function PhoneNumberComponent({ handleChange, phone, countryCode }) {
    let dispatch = useDispatch();

    const { metaCountryList } = useSelector(state => state.metadata);

    const [countryList, setCountryList] = useState([]);
    const [phone_number, setPhoneNumber] = useState(
        HELPER.isEmpty(phone) ? phone : phone.replace("+", "")
    );
    const [countryDialCode, setCountryDialCode] = useState(countryCode);
    const [countryChangeCount, setCountryChangeCount] = useState(!HELPER.isEmpty(countryCode) ? 1 : 0);

    useEffect(() => {
        const element = document.getElementsByClassName("form-control");
        element[0].oncontextmenu = eventPrevented;
        element[0].dblclick = eventPrevented;
        element[0].selectionchange = eventPrevented;
        element[0].onselectionstart = eventPrevented;
        element[0].mouseup = eventPrevented;
        element[0].onmousemove = eventPrevented;
        element[0].addEventListener(
            "select",
            function () {
                this.selectionStart = this.selectionEnd;
            },
            false
        );
        element[0].focus();

        if (!HELPER.isEmpty(countryList) && !HELPER.isEmpty(countryDialCode)) {
            setPhoneNumber(countryDialCode + phone_number)
            let country = countryList.find(country => { return parseInt(country.dialCode) === parseInt(countryDialCode) })
            handleChange(phone, countryDialCode, country);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setCountryList(metaCountryList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metaCountryList]);

    const handlePhoneChange = (phone, country) => {
        if (!HELPER.isEmpty(country)) {
            const dialCode = country.dialCode;
            var firstCharIsZero = phone.charAt(0);
            if (parseInt(firstCharIsZero) === 0) {
                let phoneNumber = phone.replace(/^0+/, "");
                setPhoneNumber("+" + dialCode + phoneNumber);
                handleChange(phoneNumber, dialCode, country);
            } else {
                if (!isIOS) {
                    setPhoneNumber(phone);
                } else {
                    if (isIOS && isIPhone13 && !HELPER.isEmpty(phone)) {
                        var updatedDialCode = parseInt(phone.substring(0, dialCode.length));
                        if (
                            parseInt(dialCode) !== parseInt(countryDialCode) &&
                            countryChangeCount === 0
                        ) {
                            setCountryChangeCount(1);
                            phone = countryDialCode + phone;
                            setPhoneNumber(phone);
                        } else if (
                            parseInt(dialCode) !== parseInt(countryDialCode) &&
                            countryChangeCount >= 1
                        ) {
                            if (updatedDialCode !== parseInt(countryDialCode)) {
                                if (
                                    !(
                                        updatedDialCode === parseInt(dialCode) &&
                                        parseInt(dialCode) !== parseInt(countryDialCode)
                                    )
                                ) {
                                    phone = countryDialCode + phone;
                                }
                            }
                        } else if (parseInt(dialCode) === parseInt(countryDialCode)) {
                            setCountryChangeCount(1);
                            if (updatedDialCode !== parseInt(countryDialCode)) {
                                if (
                                    !(
                                        updatedDialCode === parseInt(dialCode) &&
                                        parseInt(dialCode) !== parseInt(countryDialCode)
                                    )
                                ) {
                                    phone = countryDialCode + phone;
                                }
                            }
                        } else {
                            setCountryChangeCount(1);
                        }
                        country = countryList.find(country => { return parseInt(country.dialCode) === parseInt(countryDialCode) })
                    }
                    setPhoneNumber(phone);
                }
                handleChange(phone, countryDialCode, country);
            }
        }

    };


    const eventPrevented = (event) => {
        event.preventDefault();
    };

    const disableBackspace = (event) => {
        if ((event.key === 17 || event.keyCode === 2 || event.keyCode === 65) ||
            ((event.target.value === '+92') && event.key === '0')) {
            event.preventDefault();
        }
    };

    return (
        <PhoneInput
            inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
                // autoComplete: 'off'
            }}
            onFocus={function (e) {
                var val = e.target.value;
                e.target.value = "";
                e.target.value = val;
            }}
            withCountryCallingCode={false}
            autoFormat={false}
            containerClass={"custom-tel-container"}
            inputClass="custom-tel-input"
            buttonClass={"custom-tel-flag-dropdown"}
            dropdownClass={"custom-tel-dropdown"}
            onKeyPress={disableBackspace}
            onKeyDown={disableBackspace}
            placeholder={"phone number"}
            country={"pk"}
            onlyCountries={["pk"]}
            value={phone_number}
            onChange={handlePhoneChange}
            isValid={(inputNumber, country, countries) => {
                if (HELPER.isEmpty(countryList)) {
                    setCountryList(countries)
                    //   dispatch(formAction.UPDATE_COUNTRY_LIST(countries))
                }
                return countries.some((country) => {
                    countryMatched = startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber)
                    if (countryMatched) {
                        setCountryDialCode(country.dialCode);
                    }
                    return (countryMatched);
                });
            }}
        />
    );
}

export default PhoneNumberComponent;