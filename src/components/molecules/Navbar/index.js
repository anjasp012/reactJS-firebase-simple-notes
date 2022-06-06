import React from "react";
import NavLinkTo from "../../atoms/NavLinkTo";
import "./style.css";

function index(props) {
    const lists = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/login",
            text: "Login",
        },
        {
            to: "/register",
            text: "Register",
        },
    ];

    return (
        <div className="container-nav">
            <nav>
                <ul className="navbar">
                    {lists.map((list, i) => {
                        return (
                            <NavLinkTo key={i} to={list.to} text={list.text} />
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}

export default index;
