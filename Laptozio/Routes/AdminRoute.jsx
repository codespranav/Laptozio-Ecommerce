import axios from "axios";
import { useAuth } from "../src/contexts/context";
import { useEffect, useState } from "react";
import Unauthorized from "../src/Components/Unauthorized";
import { Outlet } from "react-router-dom";

export const AdminRoute = () => {
    const { auth } = useAuth(); 
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const adminAuthCheck = async () => {
            try {
                let res = await axios.get("http://localhost:5000/api/auth/admin-auth", {
                    headers: {
                        Authorization: auth?.token
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
            adminAuthCheck();
        }
    }, [auth?.token]);

    return ok ? <Outlet/> : <Unauthorized />;
};
