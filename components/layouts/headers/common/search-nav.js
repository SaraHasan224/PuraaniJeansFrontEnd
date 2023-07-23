import { Autocomplete } from "@mui/joy";
import React from "react";
import { useSelector } from "react-redux";
import {
    Input,
} from "reactstrap";

const SearchNavigation = () => {
    const { cities } = useSelector((state) => state.metadata);
    const citiesList = cities && cities.map((item, key) => {
        return (item) 
    })

    return (
        <>
            <form className="header-search">
                <div className="inner-form">
                    <div className="input-field first-wrap">
                        <div className="input-select">
                            <div className="choices" role="listbox" data-type="select-one" tabIndex="0" aria-haspopup="true"
                                aria-expanded="false" dir="ltr"
                                aria-activedescendant="choices-choices-single-defaul-yq-item-choice-2">
                                <div className="choices__inner">
                                    <Autocomplete 
                                        placeholder="Select city"
                                        options={citiesList}
                                    />;
                                    {/* <select className="choices__input is-hidden form-select py-2" size="1">
                                    {
                                        cities && cities.map((item, key) => {
                                            return (<option value={`${item}`} key={`city-${key}`}>{item}</option>) 
                                        })
                                    }
                                    </select> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="input-field second-wrap">
                        <input id="search" type="text" placeholder="Enter Keywords?" />
                    </div>
                    <div className="input-field third-wrap">
                        <button className="btn-search" type="button">
                            <svg className="svg-inline--fa fa-search fa-w-16" aria-hidden="true" data-prefix="fas"
                                data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor"
                                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </form>

            <form className="form_search d-none" role="textbox">
                {/* eslint-disable-next-line */}
                <Input id="query search-autocomplete" type="search" placeholder="Find the best for your pet..."
                    className="nav-search nav-search-field" aria-expanded="true" />
                <button type="submit" name="nav-submit-button" className="btn-search">
                    <i className="fa fa-search"></i>
                </button>
            </form>
        </>
    );
};

export default SearchNavigation;