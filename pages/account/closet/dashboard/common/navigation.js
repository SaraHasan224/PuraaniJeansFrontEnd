import React from 'react';
import { useSelector } from 'react-redux';

import {
    Media,
    NavItem,
    NavLink,
    Nav,
  } from "reactstrap";
  import seventeen from "../../../../../public/assets/images/logos/17.png";

const DashboardNavigation = ({ active, setActive }) => {
    const {  closet  } = useSelector((state) => state.closet);


    return (
        <div className="dashboard-sidebar">
            <div className="profile-top">
                <div className="profile-image">
                    <Media src={closet?.logo} alt="" className="img-fluid" />
                </div>
                <div className="profile-detail">
                    <h5>{closet?.name}</h5>
                    <h6>{closet?.email}</h6>
                </div>
            </div>
            <div className="faq-tab">
                <Nav tabs className="border-tab-primary">
                    <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                        <NavLink
                            className={active === "1" ? "active" : ""}
                            onClick={() => setActive("1")}
                        >
                            Dashboard
                        </NavLink>
                    </NavItem>
                    <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                        <NavLink
                            className={active === "2" ? "active" : ""}
                            onClick={() => setActive("2")}
                        >
                            Products
                        </NavLink>
                    </NavItem>
                    <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                        <NavLink
                            className={active === "3" ? "active" : ""}
                            onClick={() => setActive("3")}
                        >
                            Order
                        </NavLink>
                    </NavItem>
                    <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                        <NavLink
                            className={active === "5" ? "active" : ""}
                            onClick={() => setActive("5")}
                        >
                            Settings
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        </div>
    )
}

export default DashboardNavigation;