import React, { Fragment } from 'react';
import { useRouter } from 'next/router'

import ALink from '../../../../features/alink';

const Logo = ({ logo }) => {
    const router = useRouter()
    return (
        <Fragment>
            <ALink href={""}>
                <img src={logo} alt="" className="img-fluid" />
            </ALink>
        </Fragment>
    )
}

export default Logo;