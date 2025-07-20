import React from 'react';
import { AuthContext } from './AuthContet';

const AuthProvider = ({children}) => {

    const authInfo = {

    }





    return (
        <AuthContext value={authInfo}>

            {
                children
            }

        </AuthContext>
    );
};

export default AuthProvider;