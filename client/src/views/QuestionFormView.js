import React, { useEffect } from 'react';
import '../styling/style.css'
import { useTransition, animated } from 'react-spring';
import WarningText from '../components/WarningText';
import { useForm } from 'react-hook-form';
import Axios from 'axios';

Axios.defaults.withCredentials = true;

const QuestionFormView = ({ open, onClose }) => {

    useEffect(() => {
        Axios.get("http://localhost:3001/api/insert").then((response) => {
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
        Axios.post('http://localhost:3001/api/questions', {
            name: data["name"], 
            email: data["email"], 
            phone: data["phone"], 
            other: data["other"], 
            interest: data["interest"]
        }).then(() => {
            alert('successful insert');
        });
        Axios.post('http://localhost:3001/api/members', {
            name: data["name"],
            email: data["email"]
        }).then(() => {
            alert('You are also signed in');
        })
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