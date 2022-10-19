import React from 'react';
import '../styling/style.css'

import tempImage from '/Users/kaiyatakahashi/Desktop/first-tasttlig-project/client/src/images/celebrate-customers.jpg';

const RunYourOwnBusinessView = () => {
  return (
    <div id='become-a-host-container'>
        <h2 className='black-title' id='run-your-tittle'>RUN YOUR OWN BUSINESS</h2>

        <div id='become-a-host-grid'>
            <div className='block'>
                <img src={tempImage} className='image-in-grid'></img>
            </div>
            <div className='block'>
                <h2 className='title-with-line'>Business Income</h2>
                <p className='block-p'>Tasttlig Hosts make on average $20,000 in business income a year. They run their own business 
                    in their chosen neighbourhoods. Host create a series of events to celebrate the diversity in their 
                    communities by collaborating with the businesses in the neighbourhoods to create events to 
                    promote them.</p>
            </div>
            <div className='block'>
                <h2 className='title-with-line'>Business Pension</h2>
                <p className='block-p'>A business pension plan is setup for the host to save money towards their retirement.  This 
                    pension plan helps the host during their retirement years outside the capital gains stemming 
                    from sale or transfer of their businesses. </p>
            </div>
            <div className='block'>
                <img src={tempImage} className='image-in-grid'></img>
            </div>
            <div className='block'>
                <img src={tempImage} className='image-in-grid'></img>
            </div>
            <div className='block'>
                <h2 className='title-with-line'>Business Support</h2>
                <p className='block-p'>Hosts are provided with resoures to ensure they have business success.</p>
                <ul>
                    <li>Financing</li>
                    <li>Marketing</li>
                    <li>Technology</li>
                </ul>
                <p className='block-p'>Our support helps hosts quickly build their businesses on our platform.</p>
            </div>         
            <div className='block'>
                <h2 className='title-with-line'>Business Success</h2>
                <p className='block-p'>
                Tasttlig provides a framework that ensures business success. From our proven business track 
                record to advanced technologies making it easy for businesses to work with us to our 
                business benefit packages, our goal is to ensure Tasttlig hosts are setup for success. 
                </p>
            </div>
            <div className='block'>  
                <img src={tempImage} className='image-in-grid'></img>
            </div> 
        </div>
        <img src={tempImage} id='bottom-image'></img>
    </div>
  );
};


export default RunYourOwnBusinessView;