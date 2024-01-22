import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic();

    // creating user using email and password
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // signIn with email and password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout 
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    // manage state and see if there is any logged in user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            
            if(currentUser) {
                const userEmail = {
                    email: currentUser.email
                }
                axiosPublic.post('/jwt', userEmail)
                .then(res => {
                    if(res.data.token) {
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
            }else {
                localStorage.removeItem('access-token')
            }

           setLoading(false)
            
        })
        return () => {
            return unSubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;