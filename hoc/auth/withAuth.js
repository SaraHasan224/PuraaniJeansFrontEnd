import { useEffect, useState } from 'react';
import Router from 'next/router';

const withAuth = (WrappedComponent) => {
const WithAuth = (props) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data here and set it using setUser
        // For example:
        // setUser(fetchUserData());

        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        Router.push('/login');
        return null;
    }

    return <WrappedComponent {...props} />;
};

WithAuth.getInitialProps = async (ctx) => {
    const wrappedComponentInitialProps = WrappedComponent.getInitialProps
        ? await WrappedComponent.getInitialProps(ctx)
        : {};

       return { ...wrappedComponentInitialProps };
    };

   return WithAuth;
};

export default withAuth;
