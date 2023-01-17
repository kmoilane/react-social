import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [secret, setSecret] = useState("");
    const [ok, setOk] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [state] = useContext(UserContext);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`/register`, {
                name,
                email,
                password,
                confirmPassword,
                secret,
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setSecret("");
                setOk(data.ok);
                setModalOpen(true);
                setLoading(false);
            }
        } catch (err) {
            toast.error(err.response.data);
            setLoading(false);
        }
    };

    const showModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    if (state && state.token) router.push("/");

    return (
        <div className="container-fluid">
            <div className="row py-5 bg-default-image">
                <div className="col text-center">
                    <h1 className="primary-text page-title">Register Page</h1>
                </div>
            </div>
            <div className="container-lg">
                <div className="row py-5">
                    <div className="col-md-4 offset-md-4">
                        <AuthForm
                            handleSubmit={handleSubmit}
                            name={name}
                            setName={setName}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                            secret={secret}
                            setSecret={setSecret}
                            page="register"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Modal
                        title="Congratz!"
                        open={modalOpen}
                        onCancel={closeModal}
                        footer={null}
                    >
                        <p>You have succesfully registered to react-social!</p>
                        <Link href="/login" className="btn btn-primary btn-sm">
                            Login
                        </Link>
                    </Modal>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="text-center">
                        Already registered? <Link href="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
