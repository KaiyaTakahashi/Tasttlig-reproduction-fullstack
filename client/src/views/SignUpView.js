import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styling/style.css'
import Axios from 'axios';

Axios.defaults.withCredentials = true;

const SignUpView = () => {

    const [loginMessage, setLoginMessage] = useState("");

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm();
    const onSubmit = data => {
        Axios.post('http://localhost:3001/api/register', {
            username: data["username"],
            password: data["password"]
        }).then((response) => {
            console.log(response)
            alert("You are registered!")
        });
    };
    const onLogin = data => {
        Axios.post('http://localhost:3001/api/login', {
            username: data["usernameLog"],
            password: data["passwordLog"]
        }).then((response) => {
            console.log(response)
            if (response.data.auth) {
                setLoginMessage("Hello " + data.usernameLog + " You are logged in");
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                localStorage.setItem("username", data["usernameLog"]);
            } else {
                setLoginMessage(response.data.message);
            }
        });
    };

    useEffect(() => {
        Axios.get('http://localhost:3001/api/authentication', {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            },
        }).then((response) => {
            console.log(response);
            if (response.data.auth) {
                setLoginMessage(response.data.message)
            } else {
                Axios.get('http://localhost:3001/api/refresh', {
                    headers: {
                        "refresh-token": localStorage.getItem("refreshToken"),
                        "username": localStorage.getItem("username"),
                    },
                }).then((res) => {

                })
            }
        })
    }, []);

    return (
        <div>
            <header>
            </header>
            <body>
                <h1>Register</h1>
                <form key={1} onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        defaultValue="" {...register("username")}
                        placeholder="username"
                        className='form-text-field'
                    />
                    <input 
                        defaultValue="" {...register("password")}
                        placeholder="password"
                        className='form-text-field'
                        type='password'
                    />
                    <input type="submit"></input>
                </form>
                <h1>Login</h1>
                <form key={2} onSubmit={handleSubmit2(onLogin)}>
                    <input 
                        defaultValue="" {...register2("usernameLog")}
                        placeholder="username"
                        className='form-text-field'
                    />
                    <input 
                        defaultValue="" {...register2("passwordLog")}
                        placeholder="password"
                        className='form-text-field'
                        type='password'
                    />
                    <input type="submit"></input>
                </form>
                <h2>{loginMessage}</h2>
            </body>
        </div>
    );
};


export default SignUpView;