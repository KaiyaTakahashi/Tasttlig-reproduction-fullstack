import React, {useState} from 'react';
import Button from '../components/Button';

import questionImage from '/Users/kaiyatakahashi/Desktop/first-tasttlig-project/client/src/images/festivals.jpg';

import '../styling/style.css'
import QuestionFormView from './QuestionFormView';
import QuestionPromptView from './QuestionPromptView';

const QuestionView = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
      <div>
        <QuestionPromptView open={isOpen} onClose={() => {
            setIsOpen(true);
        }}></QuestionPromptView>
        <QuestionFormView open={isOpen} onClose={() => {
            setIsOpen(false);
        }}></QuestionFormView>
    </div>
  );
};


export default QuestionView;