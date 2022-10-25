import React from 'react';
import { useForm } from 'react-hook-form';
import '../styling/style.css'
import Axios from 'axios';

Axios.defaults.withCredentials = true;

const SignUpView = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        Axios.post('http://localhost:3001/api/members', {
            name: data["name"],
            email: data["email"]
        }).then(() => {
            alert("You are signed in!")
        });
    };

    return (
        <div>
            <header>
                <p>this is loging</p>
            </header>
            <body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        defaultValue="" {...register("name")}
                        placeholder="name"
                        className='form-text-field'
                    />
                    <input 
                        defaultValue="" {...register("email")}
                        placeholder="email"
                        className='form-text-field'
                    />
                    <input type="submit"></input>
                </form>
            </body>
        </div>
    );
};


export default SignUpView;