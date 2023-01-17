import { UserProvider } from "../context";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import "../public/css/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd";

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <UserProvider>
                <Nav />
                <ToastContainer position="top-center" autoClose={3000} />
                <Component {...pageProps} />
            </UserProvider>
        </>
    );
}
