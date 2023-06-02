import React, { Fragment } from 'react';
import Link from 'next/link';

const Logo = ({ logo }) => {
    return (
        <Fragment>
            <Link href={'/'} >
                <a>
                    <img src={logo} alt="" className="img-fluid" />
                </a>
            </Link>
        </Fragment>
    )
}

export default Logo;