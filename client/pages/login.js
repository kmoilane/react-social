import { UserContext } from "../context";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
import { useRouter } from "next/router";

const Login = () => {
    const [email, setEmail] = useState("karri@gmail.com");
    const [password, setPassword] = useState("111111");
    const [loading, setLoading] = useState(false);

    const [state, setState] = useContext(UserContext);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`/login`, {
                email,
                password,
            });

            if (data.error) {
                toast.error(data.error);
                setLoading(false);
            } else {
                setState({
                    user: data.user,
                    token: data.token,
                });
                window.localStorage.setItem("auth", JSON.stringify(data));
                router.push("/");
            }
        } catch (err) {
            toast.error("Wrong email or password");
            setLoading(false);
        }
    };

    if (state && state.token) router.push("/");

    return (
        <div className="container-fluid">
            <div className="row py-5 bg-default-image">
                <div className="col text-center">
                    <h1 className="primary-text page-title">Login</h1>
                </div>
            </div>

            <div className="container-lg">
                <div className="row py-5">
                    <div className="col-md-4 offset-md-4">
                        <AuthForm
                            handleSubmit={handleSubmit}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            page="login"
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">
                        Don't have a user?{" "}
                        <Link href="/register">Register</Link>
                    </p>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">
                        <Link href="/forgot-password">Forgot password?</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
