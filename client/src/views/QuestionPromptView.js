import React from 'react';
import Button from '../components/Button';
import '../styling/style.css'

import questionImage from '/Users/kaiyatakahashi/Desktop/first-tasttlig-project/client/src/images/festivals.jpg';
import { useTransition, animated } from 'react-spring';

const QuestionPromptView = ({ open, onClose }) => {
    const transition = useTransition(!open, {
        from: { opacity: 0},
        enter: { opacity: 1},
    })
    if (open) {
        return null
    }
    return (
        <div id='question-view-container'>
            <div id='question-image'></div>
            <div id='question-box'>
                <h2 id='question-title'>HAVING QUESTIONS ABOUT HOSTING TASTTLIG?</h2>
                {transition((style, item) =>
                    item ? <animated.div style={style} id='question-prompt'>
                                <div id='question-prompt'>
                                    <h3 className='title-with-line' id='question-prompt-title'>We are here to help.</h3>
                                    <Button prompt={"DROP US A LINE!"} onClick={onClose}></Button>
                                </div>
                    </animated.div> : ''
                )}
            </div>
        </div>
        );
};


export default QuestionPromptView;