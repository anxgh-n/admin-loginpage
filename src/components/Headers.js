import React from "react";
import { FaHouseUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import './Header.css'
const Headers = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark ">
                <div className="cont custom-bg-color">
                    <span className="navbar-brand fffont">

                        Gaia Systems

                    </span>

                    <ul className="navbar-nav me-right mb-2 mb-lg-0 custom-nav">
                        <li className="nav-item">
                            <Link className="nav-link fsa" to="/users">
                                <button className="bbut">
                                    Home
                                </button>

                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fsa" to="/home">
                                <button className="bbut">
                                    Add Users
                                </button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fsa" to="/">
                                <button className="bbut">
                                    Sign Out{" "}
                                </button>

                            </Link>
                        </li>
                    </ul>

                </div>
            </nav>
        </div>
    );
};

export default Headers;

