import { useState } from "react";
import { API_BASE_URL } from "../../.config";

function RegisterForm({ onRegistrationSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await fetch(`${API_BASE_URL}/auth/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, email, firstName, lastName, accessCode}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create account.");
            }

            alert("Account created successfully.");
            onRegistrationSuccess(); // Tells the login.jsx to redirect to sign-in view.
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <div className="input-group">
                <label htmlFor="reg-username">Username </label>
                <input
                    type="text"
                    id="reg-username"
                    placeholder="Create username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="reg-password">Password </label>
                <input
                    type="text"
                    id="reg-password"
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /> 
            </div>

            <div className="input-group">
                <label htmlFor="reg-email">Email </label>
                <input
                    type="email"
                    id="reg-email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="reg-firstName">Name </label>
                <input
                    type="text"
                    id="reg-firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                /> 
            </div>

            <div className="input-group">
                <label htmlFor="reg-lastName">Surname </label>
                <input 
                    type="text"
                    id="reg-lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                /> 
            </div>

            <div className="input-group">
                <label htmlFor="accessCode">Teacher Registration Code </label>
                <input
                    type="text"
                    id="accessCode"
                    placeholder="Leave blank if you are a student"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                /> 
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className="login-button">Create Account</button>
        </form>
    );
}

export default RegisterForm;