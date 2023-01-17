import { LoadingOutlined } from "@ant-design/icons";

const AuthForm = ({
    handleSubmit,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    secret,
    setSecret,
    setConfirmPassword,
    loading,
    page,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            {page !== "login" && (
                <div className="form-group p-2">
                    <small>
                        <label htmlFor="nameInput" className="primary-text">
                            Name
                        </label>
                    </small>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        id="nameInput"
                        className="form-control my-1"
                    />
                </div>
            )}
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
                    <label htmlFor="passwordInput" className="primary-text">
                        Password
                    </label>
                </small>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="passwordInput"
                    className="form-control my-1"
                />
            </div>
            {page !== "login" && (
                <div className="form-group p-2">
                    <small>
                        <label
                            htmlFor="confirmPasswordInput"
                            className="primary-text"
                        >
                            Confirm password
                        </label>
                    </small>
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        id="confirmPasswordInput"
                        className="form-control my-1"
                    />
                </div>
            )}

            {page !== "login" && (
                <>
                    <div className="form-group p-2">
                        <small>
                            <label
                                htmlFor="securityQuestions"
                                className="primary-text"
                            >
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
                            You can use this to reset your password if
                            forgotten.
                        </small>
                    </div>

                    <div className="form-group p-2">
                        <small>
                            <label
                                htmlFor="securityAnswer"
                                className="primary-text"
                            >
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
                </>
            )}

            <div className="form-group text-center p-2">
                <button
                    disabled={
                        page === "login"
                            ? !email || !password || loading
                            : !name ||
                              !email ||
                              !password ||
                              !confirmPassword ||
                              !secret ||
                              loading
                    }
                    className="btn btn-primary col-4 btn-lg"
                >
                    {loading ? (
                        <LoadingOutlined spin className="py-1" />
                    ) : page === "login" ? (
                        "Login"
                    ) : (
                        "Register"
                    )}
                </button>
            </div>
        </form>
    );
};

export default AuthForm;
