import React from 'react';
import { Col, Media } from 'reactstrap';
import Category from './category';
import Brand from './brand'
import Color from './color'
import Size from './size'
import Price from './price';
import Condition from './condition';
import Standard from './standard';

const FilterPage = ({sm,sidebarView,closeSidebar}) => {
    return (
        <>
            <Col sm={sm} className="collection-filter" style={sidebarView ? {left:"0px"} : {}}>
                {/* <!-- side-bar colleps block stat --> */}
                <div className="collection-filter-block">
                    {/* <!-- brand filter start --> */}
                    <div className="collection-mobile-back" onClick={() => closeSidebar()}>
                        <span className="filter-back">
                            <i className="fa fa-angle-left" aria-hidden="true"></i> back
                        </span>
                    </div>
                    <Price />
                    <Category />
                    <Brand/>
                    <Size/>
                    <Condition/>
                    <Standard/>
                    <Color/>
                </div>
            </Col>
        </>
    )
}

export default FilterPage;