import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../../components/atoms/Button";
import { registerUserAPI } from "../../../config/redux/action";

function Register(props) {
    console.log(props.isLoading);
    const [authUser, setAuthUser] = useState({
        email: "",
        password: "",
    });

    const handleChangeText = (e) => {
        setAuthUser({
            ...authUser,
            [e.target.id]: e.target.value,
        });
    };
    const handleRegisterSubmit = async () => {
        const { email, password } = authUser;
        console.log("before auth :", email, password);
        const res = await props
            .registerAPI({
                email,
                password,
            })
            .catch((err) => err);
        if (res) {
            setAuthUser({
                email: "",
                password: "",
            });
        } else {
            alert("email & password anda tidak memenuhi aturan");
        }
    };

    return (
        <div>
            <div className="auth-card">
                <p className="auth-title">Register</p>
                <input
                    value={authUser.email}
                    id="email"
                    onChange={handleChangeText}
                    className="auth-input"
                    type="email"
                    placeholder="email"
                />
                <input
                    value={authUser.password}
                    id="password"
                    onChange={handleChangeText}
                    className="auth-input"
                    type="password"
                    placeholder="password"
                />
                <Button
                    onClick={handleRegisterSubmit}
                    className="auth-btn"
                    title="Register"
                    loading={props.isLoading}
                />
            </div>
        </div>
    );
}

const reduxState = (state) => ({ isLoading: state.isLoading });

const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Register);
