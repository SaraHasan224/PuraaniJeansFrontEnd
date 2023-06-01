import React, { Fragment } from 'react';
import Link from 'next/link';

const Logo = ({ logo }) => {
    return (
        <Fragment>
            <Link href={'/'} >
                <a>
                    <img src={`/my-assets/images/icons/${logo?logo:'logo.png'}`} alt="" className="img-fluid" />
                </a>
            </Link>
        </Fragment>
    )
}

export default Logo;