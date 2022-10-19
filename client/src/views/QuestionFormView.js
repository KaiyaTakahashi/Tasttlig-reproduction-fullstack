import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import '../styling/style.css'
import { useTransition, animated } from 'react-spring';
import QuestionForm from '../models/QuestionForm.js'
import WarningText from '../components/WarningText';
import { useForm } from 'react-hook-form';
import Axios from 'axios';

const QuestionFormView = ({ open, onClose }) => {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/get").then((response) => {
            console.log(response.data);
        });
    }, []);

    // Animation: slide view from left side
    const transition = useTransition(open,{
        from: { x: -400, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        config: { mass:1, tension:10, friction:0, clamp: true }
    });

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        //localStorage.setItem(data["email"] , JSON.stringify(data))
        Axios.post('http://localhost:3001/api/insert/', {
            userName: data["name"], 
            userEmail: data["email"], 
            userPhoneNumber: data["phone"], 
            other: data["other"], 
            interest: data["interest"]
        }).then(() => {
            alert('successful insert');
        });
    };

    if (!open) {
        return null
    }
    return (
        <div id='question-form-image-view'>
            <div id='question-form-box'>
                <h2 id='question-title'>HAVING QUESTIONS ABOUT HOSTING TASTTLIG?</h2>
                {transition((style, item) =>
                    item? 
                    <animated.div style={style} id='question-form-container'>
                        <div id='question-title-button-flex'>
                            <span></span>
                            <h3 className='title-with-line'>Drop us a line!</h3>
                            <button id='question-form-x-button' onClick={onClose}>X</button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div id='question-form-grid'>
                                <div id='name-tf'>
                                    <input 
                                        defaultValue="" {...register("name")}
                                        placeholder="name"
                                        className='form-text-field'
                                    />
                                </div>
                                <div id='email-tf'>
                                    <input 
                                        {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
                                        placeholder="Email*"
                                        className='form-text-field'
                                    />
                                {errors?.email && <WarningText text={"Please enter a valid email address."} ></WarningText>}
                                </div>
                                <div id='phone-tf'>
                                    <input 
                                        defaultValue="" {...register("phone")}
                                        placeholder="phone"
                                        className='form-text-field'
                                    />
                                </div>
                                <div id='interest-tf'>
                                    <input 
                                        defaultValue="" {...register("interest")}
                                        placeholder="I'm interested in"
                                        className='form-text-field bigger-input'
                                    />
                                </div>
                                <div id='other-tf'>
                                    <input 
                                        defaultValue="" {...register("other")}
                                        placeholder="other"
                                        className='form-text-field bigger-input'
                                    />
                                </div>
                            </div>
                            <p id='question-form-text'>This site is protected by reCAPTCHA and the Google <a href='https://policies.google.com/privacy'>Privacy Policy</a> and <a href='https://policies.google.com/terms'>Terms of Serviece</a> apply.</p>
                            <input type="submit" id='send-button'/>
                        </form>
                        {/* <Button prompt="SEND" onClick={sentButtonTapped} id='send-button'></Button> */}
                    </animated.div> : ''
                )}
            </div>
        </div>
        );
};


export default QuestionFormView;