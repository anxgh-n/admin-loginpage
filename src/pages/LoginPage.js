import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Login.css'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    //get email and password
    const userName = 'anaghmanoj@gmail.com'
    const userPassword = 'Anagh1102'

    //get email and password - adding admin adresses from local storage
    //     const userName = localStorage.getItem('email')
    //     ? localStorage.getItem('email') : 'anaghmanoj@gmail.com'
    // const userPassword = localStorage.getItem('password')
    //     ? localStorage.getItem('password') : 'Anagh1102'


    //submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === userName && password === userPassword) {
            toast.success('Login Success')
            navigate('/users')
        }
        else {
            toast.error('Invalid Email OR Password')
        }
    };

    return (
        <>
            <section>

                <div class="formm-box">
                    <div class="formmm"></div>
                    <form action="">
                        <h2 className="h22">Login</h2>

                        <div class="inputbox inp-bx">
                            <ion-icon name="mail-outline"></ion-icon>

                            <input
                                type="email"
                                className="form-cont"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"

                            />
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email
                            </label>
                        </div>

                        <div class="inputbox inp-bx">

                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input
                                type="password"
                                className="form-cont"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                id="exampleInputPassword1"

                            />
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Password
                            </label>
                        </div>


                        <button type="submit" className="form__button" onClick={handleSubmit}>
                            Login
                        </button>

                    </form>
                </div>

            </section>
        </>
    );
};

export default LoginPage;