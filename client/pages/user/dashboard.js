import { useContext } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

const Dashboard = () => {
    const [state, setState] = useContext(UserContext);

    return (
        <UserRoute>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className="text-center d-1">Dashboard</h1>
                    </div>
                </div>
            </div>
        </UserRoute>
    );
};

export default Dashboard;
