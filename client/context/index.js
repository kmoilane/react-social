import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [state, setState] = useState({
        user: {},
        token: "",
    });

    useEffect(() => {
        setState(JSON.parse(window.localStorage.getItem("auth")));
    }, []);

    const router = useRouter();

    const token = state && state.token ? state.token : "";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            let res = error.response;
            if (
                res.status === 401 &&
                res.config &&
                !res.config.__isRetryRequest
            ) {
                window.localStorage.removeItem("auth");
                setState(null);
                router.push("/login");
            }
        }
    );

    return (
        <UserContext.Provider value={[state, setState]}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };