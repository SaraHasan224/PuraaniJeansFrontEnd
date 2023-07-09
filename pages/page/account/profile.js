import React from 'react';
import CommonLayout from '../../../components/layouts/common-layout';
import ProfilePage from './common/profile-page';

const Profile = () => {
    return (
        <CommonLayout parent="home" title="profile">
            <ProfilePage />
        </CommonLayout>        
    )
}

export default Profile;