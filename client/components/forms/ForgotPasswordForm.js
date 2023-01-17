import { LoadingOutlined } from "@ant-design/icons";

const ForgotPasswordForm = ({
    handleSubmit,
    email,
    setEmail,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    secret,
    setSecret,
    loading,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group p-2">
                <small>
                    <label htmlFor="emailInput" className="primary-text">
                        Email
                    </label>
                </small>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="emailInput"
                    className="form-control my-1"
                />
            </div>
            <div className="form-group p-2">
                <small>
                    <label htmlFor="newPasswordInput" className="primary-text">
                        New password
                    </label>
                </small>
                <input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    id="newPasswordInput"
                    className="form-control my-1"
                />
            </div>

            <div className="form-group p-2">
                <small>
                    <label
                        htmlFor="confirmNewPasswordInput"
                        className="primary-text"
                    >
                        Confirm new password
                    </label>
                </small>
                <input
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    type="password"
                    id="confirmNewPasswordInput"
                    className="form-control my-1"
                />
            </div>

            <div className="form-group p-2">
                <small>
                    <label htmlFor="securityQuestions" className="primary-text">
                        Pick a security question
                    </label>
                </small>
                <select
                    className="form-control my-1 dropdown"
                    id="securityQuestions"
                >
                    <option>What is your favourite color?</option>
                    <option>What is your best friend's name?</option>
                    <option>What city were you born in?</option>
                    <option>Who is your favourite superhero?</option>
                    <option>What is your favourite movie?</option>
                    <option>What is your favourite food?</option>
                    <option>What is your favourite book?</option>
                </select>

                <small className="form-text text-muted">
                    You can use this to reset your password if forgotten.
                </small>
            </div>

            <div className="form-group p-2">
                <small>
                    <label htmlFor="securityAnswer" className="primary-text">
                        Answer to your security question
                    </label>
                </small>
                <input
                    type="text"
                    id="securityAnswer"
                    className="form-control my-1"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                />
            </div>

            <div className="form-group text-center p-2">
                <button
                    disabled={
                        !email || !newPassword || !confirmNewPassword || !secret
                    }
                    className="btn btn-primary col-4 btn-lg"
                >
                    {loading ? (
                        <LoadingOutlined spin className="py-1" />
                    ) : (
                        "Change Password"
                    )}
                </button>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;
