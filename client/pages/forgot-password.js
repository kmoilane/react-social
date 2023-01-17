import { UserContext } from "../context";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import { useRouter } from "next/router";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [secret, setSecret] = useState("");
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);

    const [state, setState] = useContext(UserContext);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`/forgot-password`, {
                email,
                newPassword,
                confirmNewPassword,
                secret,
            });
            console.log("Forgot password res data => ", data);
            if (data.error) {
                toast.error(data.error);
                setLoading(false);
            }
            if (data.success) {
                setEmail("");
                setNewPassword("");
                setConfirmNewPassword("");
                setSecret("");
                setOk(true);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    if (state && state.token) router.push("/");

    return (
        <div className="container-fluid">
            <div className="row py-5 bg-default-image">
                <div className="col text-center">
                    <h1 className="primary-text page-title">Forgot password</h1>
                </div>
            </div>

            <div className="container-lg">
                <div className="row py-5">
                    <div className="col-md-4 offset-md-4">
                        <ForgotPasswordForm
                            handleSubmit={handleSubmit}
                            email={email}
                            setEmail={setEmail}
                            newPassword={newPassword}
                            setNewPassword={setNewPassword}
                            confirmNewPassword={confirmNewPassword}
                            setConfirmNewPassword={setConfirmNewPassword}
                            secret={secret}
                            setSecret={setSecret}
                            loading={loading}
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
                        Sike! Remembered it <Link href="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
