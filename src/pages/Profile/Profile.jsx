import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
    const status = useSelector(state => state.authReducer.status);

    console.log(status, 21213121);
    
    return (
        <div>Profile</div>
    )
}
