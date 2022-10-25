import React from 'react';
import '../styling/style.css'

import logoImage from '/Users/kaiyatakahashi/Desktop/first-tasttlig-project/client/src/images/tasttlig-logo-black.png';
import becomeHostImage from '/Users/kaiyatakahashi/Desktop/first-tasttlig-project/client/src/images/banner.jpg'
import Button from '../components/Button';
import Login from '../views/SignUpView';
import { useNavigate } from 'react-router-dom';

const BecomeAHostView = () => {
    let navigate = useNavigate();
  return (
    <div>
        <header>
            <img id='logo-image' src={logoImage}  onClick={() => {
                window.location.reload();
            }}></img>
        </header>
        <div>
            <div id='become-host-image-frame'></div>
            <div id='tile-and-button'>
                <h1 id='make-money-title'>MAKE MONEY FROM HOME</h1>
                <Button onClick={() => {
                    window.scrollTo(0, 0);
                    // To Login page
                    navigate('/login')
                }} prompt={"BECOME A TASTTLIG HOST"}></Button>
            </div>
        </div>
    </div>
  );
};


export default BecomeAHostView;