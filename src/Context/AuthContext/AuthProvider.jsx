import React from 'react';
import { AuthContext } from './AuthContet';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.init';

const AuthProvider = ({children}) => {

    
    const createUser = (email,password) =>{
       return createUserWithEmailAndPassword(auth,email,password)
    };

    const signIn = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password)
    }



    const authInfo = {
        createUser,
        signIn

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