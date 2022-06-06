import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../../components/atoms/Button";
import { loginUserAPI } from "../../../config/redux/action";
import { useNavigate } from "react-router-dom";

function Login(props) {
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

    const redirectAuth = useNavigate();
    const handleLoginSubmit = async () => {
        const { email, password } = authUser;
        console.log("before auth :", email, password);
        const res = await props
            .loginAPI({
                email,
                password,
            })
            .catch((err) => err);
        if (res) {
            console.log("login success ==>", res);
            localStorage.setItem("userData", JSON.stringify(res));
            setAuthUser({
                email: "",
                password: "",
            });
            redirectAuth("/");
        }
    };

    return (
        <div>
            <div className="auth-card">
                <p className="auth-title">Login</p>
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
                    onClick={handleLoginSubmit}
                    className="auth-btn"
                    title="Login"
                    loading={props.isLoading}
                />
            </div>
        </div>
    );
}

const reduxState = (state) => ({
    isLoading: state.isLoading,
    isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(loginUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Login);
