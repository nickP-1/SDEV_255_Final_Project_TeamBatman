import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "../login.css";


function Login() {
    const [isAccount, setIsAccount] = useState(false);

    return  (
        <>
            <div className="login-container">
                <div className="login-box">
                    <div className="school-logo">
                        <div className="logo-circle"></div>
                        <h1>Batman University</h1>
                        <p>{isAccount ? "Account Registration" : "Campus Portal"}</p>
                    </div>
                    {isAccount ? (
                        <RegisterForm onRegistrationSuccess={() => setIsAccount(false)} />
                    ) : (
                        <LoginForm /> 
                    )}

                    <p
                        className="help-text"
                        // Move style into login.css
                        style={{ cursor: "pointer", textDecoration: "underline", color: "#3182ce" }}
                        onClick={() => setIsAccount(!isAccount)}
                    >
                        {isAccount ? "Already have an account? Sign In" : "Don't have an account? Register Here"}
                    </p>

                    <p className="help-text"> Need Help? Contact your school's IT department.</p>
                </div>
            </div>
        </>
    );
}

export default Login