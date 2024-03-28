import axios from "axios";
import { useAuth } from "../src/contexts/context";
import { useEffect, useState } from "react";
import Unauthorized from "../src/Components/Unauthorized";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
export const PrivateRoute = () => {
    const { auth } = useAuth(); 
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const userAuthCheck = async () => {
            try {
                let res = await axios.get("http://localhost:5000/api/auth/user-auth", {
                    headers: {
                        "Authorization": auth?.token
                    }
                });
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };

        if (auth?.token) {
            userAuthCheck();
        }
    }, [auth?.token]);

    return ok ? <Outlet/> : <Unauthorized />;
};