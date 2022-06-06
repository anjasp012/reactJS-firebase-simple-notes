import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

function index({ to, text }) {
    return (
        <li>
            <NavLink
                className={({ isActive }) =>
                    isActive ? "nav-link bg-skyblue" : "nav-link bg-none"
                }
                to={to}
            >
                {text}
            </NavLink>
        </li>
    );
}

export default index;
