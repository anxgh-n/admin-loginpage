import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Headers from "../components/Headers";
import './Home.css'
import { Link } from "react-router-dom";

function Home({ formSub }) {
    const profilePIcDefault =
        "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg";


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [profilePic, setProfilePic] = useState(null);

    const onSub = (data) => {
        data.id = Date.now();
        data.fav = false;
        data.profilePic = profilePic; // Include profile picture file in the submitted data
        formSub(data);
        reset();
        setProfilePic(null); // Reset the profile picture state
    };

    const handleImg = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file));
        }
    };



    return (
        <>
            <Headers />

            <div className="container content mt-4">
                <Link to="/users">
                    <button className="btn btn-cl">Go Home</button>
                </Link>
                <div className="row border p-4 bcgedit">
                    {/* Profile Picture Section */}
                    <div className="col-md-4 prof-cont">
                        <div className="profile_section">
                            <p>Add Profile Picture </p>
                            <img
                                src={profilePic || profilePIcDefault}
                                alt="profile_pic"
                                className="img-thumbnail"
                                height={200}
                                width={200}
                                style={{ opacity: 1.0 }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label"></label>
                            <input
                                className="form-control"
                                onChange={handleImg}
                                type="file"
                                id="formFile"
                            />
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit(onSub)}>
                            <div>


                                <div className="form-group">

                                    <label className="col-form-label">Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Name..."
                                        className="form-control"
                                        {...register("name", {
                                            required: "Name is Required"
                                        })}
                                    />
                                    {errors.name && (
                                        <small className="text-danger">{errors.name.message}</small>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label">Email:</label>
                                    <input
                                        type="text"
                                        placeholder="Email..."
                                        className="form-control"
                                        {...register("email", {
                                            required: "Email is Required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address",
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <small className="text-danger">{errors.email.message}</small>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label">Phone Number:</label>
                                    <div className="row">
                                        <div className="col-4">
                                            <select
                                                className="form-control"
                                                {...register("countryCode")}
                                            >
                                                <option value="+91-">+91</option>
                                                <option value="+1-">+1</option>
                                                <option value="+966-">+966</option>
                                                <option value="+971-">+971</option>
                                                <option value="+65-">+65</option>
                                                {/* Add more country code options as needed */}
                                            </select>
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                placeholder="Phone no..."
                                                className="form-control"
                                                {...register("phoneNumber", {
                                                    required: "Phone Number is Required",
                                                    pattern: {
                                                        value: /^[0-9]+$/,
                                                        message: "Invalid phone number",
                                                    },
                                                })}
                                            />
                                        </div>
                                    </div>
                                    {errors.phoneNumber && (
                                        <small className="text-danger">{errors.phoneNumber.message}</small>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label">Gender:</label>
                                    <select
                                        className="form-control"
                                        {...register("gender", { required: "Gender is Required" })}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    {errors.gender && (
                                        <small className="text-danger">{errors.gender.message}</small>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="col-form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password..."
                                        {...register("password", {
                                            required: "Password is Required",
                                            pattern: {
                                                value: /^[A-Z0-9.-]{2,}$/i,
                                                message: "Invalid password",
                                            },
                                        })}
                                    />
                                    {errors.password && (
                                        <small className="text-danger">{errors.password.message}</small>
                                    )}
                                </div>

                                <input
                                    type="submit"
                                    className="btn my-3 btn-size"
                                    value="Submit"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Home;
