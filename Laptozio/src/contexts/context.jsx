/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, createContext, useContext, useEffect } from "react";
const AuthContext = createContext();

const AuthProvider  = (props)=>{
    const [auth, setAuth] = useState({
        user: null,
        token: '',
    })

    useEffect(()=>{
        const data = localStorage.getItem("auth")
        if(data){
            const parsedData = JSON.parse(data)
        setAuth({
            ...auth, 
            user: parsedData.user,
            token: parsedData.token,
        })
        }
        console.log(data);
    //eslint-disable-next-line
    }, [])

    return <AuthContext.Provider value={{auth, setAuth}}>
        {props.children}
    </AuthContext.Provider>
}
const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth}