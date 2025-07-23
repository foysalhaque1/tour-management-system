import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContet';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.init';

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    
    const createUser = (email,password) =>{
        setLoading(true)
       return createUserWithEmailAndPassword(auth,email,password)
    };

    const signIn = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth);
    };

    const signInWithGoogle = () =>{
        return signInWithPopup(auth,googleProvider);
    };

    

    const update = (updateData) =>{
      return  updateProfile(auth.currentUser,updateData)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            console.log('user in the auth state change',currentUser)
            setLoading(false)
        });
        return unsubscribe

    },[])



    const authInfo = {
        createUser,
        signIn,
        user,
        loading,
        logOut,
        signInWithGoogle,
        update

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