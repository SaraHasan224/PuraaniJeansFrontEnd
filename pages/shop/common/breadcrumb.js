import React from "react";
import { useRouter } from 'next/router';

import { Container, Row, Col } from "reactstrap";
import Link from 'next/link';
import ALink from "../../../features/alink";

const ShopBreadcrumb = ({ title, parent, subTitle }) => {
    const router = useRouter();
    const type = router.query.type;
    const query = router.query;

    return (
        <>
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">{parent}</ALink>
                        </li>
                        {
                            title ? <li className={`breadcrumb-item ${subTitle === "" ? "active" : ""}`}><ALink href="/shop/sidebar/list">{title}</ALink></li> : ""
                        }
                        {
                            subTitle ? <li className={`breadcrumb-item ${subTitle ? "active" : ""}`}>{subTitle}</li> : ""
                        }
                        {
                            query.search ?
                                <li className="breadcrumb-item">
                                    <span>Search - {query.searchTerm}</span>
                                </li>
                                : ""
                        }
                    </ol>
                </div>
            </nav>
        </>
    );
};

export default ShopBreadcrumb;
