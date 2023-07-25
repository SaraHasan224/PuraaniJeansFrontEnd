import React from 'react';
import Router from 'next/router';
import { HELPER, LOCAL_STORAGE_SERVICE } from '../../utils';

const login = '/auth/signin?redirected=true'; // Define your login route address.

/**
 * Check user authentication and authorization
 * It depends on you and your auth service provider.
 * @returns {{auth: null}}
 */

const checkUserAuthentication = () => {
  let checkAuth = false;
    // Perform localStorage action
    checkAuth = LOCAL_STORAGE_SERVICE._getFromLocalStorage("access_token");
  return { auth: HELPER.isNotEmpty(checkAuth) ? checkAuth : false }; // change null to { isAdmin: true } for test it.
};

export default WrappedComponent => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {
    const userAuth = await checkUserAuthentication();

    // Are you an authorized user or not?
    if (!userAuth?.auth) {
      // Handle server-side and client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: login,
        });
        context.res?.end();
      } else {
        Router.replace(login);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({...context, auth: userAuth});
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  return hocComponent;
};