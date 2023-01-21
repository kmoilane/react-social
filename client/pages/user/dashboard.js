import { useContext } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

const Dashboard = () => {
    const [state, setState] = useContext(UserContext);

    return (
        <UserRoute>
            <div className="container-fluid">
                <div className="row py-5 bg-default-image">
                    <div className="col text-center">
                        <h1 className="primary-text page-title">
                            For You Page
                        </h1>
                    </div>
                </div>

                <div className="row py-3">
                    <div className="col-md-8">CreatePostForm</div>
                    <div className="col-md-4">Sidebar</div>
                </div>
            </div>
        </UserRoute>
    );
};

export default Dashboard;
