import React from 'react';
import '../styling/style.css'

import logoImage from '/Users/kaiyatakahashi/Desktop/first-tasttlig-project/client/src/images/tasttlig-logo-black.png'
import BecomeAHostView from './BecomeAHostView';
import RunYourOwnBusinessView from './RunYourOwnBusinessView';
import HostInformationView from './HostInformation';
import QuestionView from './QuestionView';
import QuestionFormView from './QuestionFormView';
import { useTransition, animated } from 'react-spring';
const HomeView = () => {
  const transition = useTransition(true, {
    from: { y: -30},
    enter: { y: 0 },
    config: { mass:1, tension:20, friction:0, clamp: true }
  })
  return (
    <div id='window'>
        {transition((style, item) => 
          item ? <animated.header style={style} id='top-banner' onClick={() => {
            window.open('https://www.godaddy.com/en-ca/websites/website-builder?isc=pwugc&utm_source=wsb&utm_medium=applications&utm_campaign=en-us_corp_applications_banner&utm_content=b257bad9-cb54-4be5-a8b8-8a31b0bc94b3');
          }}>
                    <p id='top-banner-texts'>Powered by GoDaddy Websites + Marketing | <a href='https://www.godaddy.com/en-ca/websites/website-builder?isc=pwugc&utm_source=wsb&utm_medium=applications&utm_campaign=en-us_corp_applications_banner&utm_content=b257bad9-cb54-4be5-a8b8-8a31b0bc94b3'>Create your free site</a></p>
          </animated.header> : ''
        )}
        <body>
            <BecomeAHostView></BecomeAHostView>
            <RunYourOwnBusinessView></RunYourOwnBusinessView>
            <HostInformationView></HostInformationView>
            <QuestionView></QuestionView>
            <QuestionFormView></QuestionFormView>
        </body>
        <footer>
          <h5 id='footer-line'></h5>
          <p className='footer-p'>Copyright © 2022 Tasttlig Corporation - All Rights Reserved.</p>
          <h3></h3>
          <p className='footer-p'>Powered by Tasttlig</p>
        </footer>
    </div>
  );
};


export default HomeView;