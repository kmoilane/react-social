import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";

export default function Nav() {
    const [current, setCurrent] = useState("");
    const [state, setState] = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    const logout = () => {
        window.localStorage.removeItem("auth");
        setState(null);
        router.push("/login");
    };

    return (
        <nav className="nav bg-dark d-flex justify-content-end">
            <Link
                href="/"
                className={`nav-link accent-text
                ${current === "/" && "active"}`}
            >
                Home
            </Link>
            {state !== null ? (
                <>
                    <Link
                        href="/user/dashboard"
                        className={`nav-link accent-text
                            ${current === "/user/dashboard" && "active"}`}
                    >
                        {state && state.user && state.user.name}
                    </Link>
                    <a onClick={logout} className="nav-link accent-text">
                        Logout
                    </a>
                </>
            ) : (
                <>
                    <Link
                        href="/register"
                        className={`nav-link accent-text
                        ${current === "/register" && "active"}`}
                    >
                        Register
                    </Link>
                    <Link
                        href="/login"
                        className={`nav-link accent-text
                        ${current === "/login" && "active"}`}
                    >
                        Login
                    </Link>
                </>
            )}
        </nav>
    );
}
