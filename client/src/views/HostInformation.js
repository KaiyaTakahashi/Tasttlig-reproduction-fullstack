import React from 'react';
import Button from '/Users/kaiyatakahashi/Desktop/first-tasttlig-project/client/src/components/Button.js';
import '../styling/style.css'

const HostInformationView = () => {
  return (
    <div id='host-information-flex'>
        <h2 className='black-title' id='run-your-tittle'>BECOME A TASTTLIG HOST</h2>
        <div id='host-information-items-flex'>
            <div className='host-information-item'>
                <h2 className='title-with-line'>Host Information</h2>
                <p>
                    Tasttlig hosts register a business with their tax authorities in their jurisdictions of business. This enables hosts to claim expenses as part of running their business successfully.
                </p>
                <p>
                    Hosts are instrumental in delivering the core mission statement of showcasing the world in the best light. This is done by hosting events in restaurants and businesses to celebrate diversity of the neighbourhood.
                </p>
                <p>
                    Hosts follow a successful blueprint of running events in neighbourhood businesses.  Tasttlig has created events in businesses since our founding on September 17th, 2018. This tradition has remained core to our business. The scope of our business has been expanded to help realize our entrepreneurial goals. 
                </p>
                <p>
                    Tasttlig corporation has strong executive leadership in place to help us bring structure and confidence to our businesses. From our CEO, with over 10 years of experience in finance and 4 years building Tasttlig, to our CTO with over 10 years building technological to our COO with over 10 years operating businesses, our team is ready to support you build a successful business as a Tasttlig host.
                </p>
            </div>
            <div>
                <h2 className='title-with-line'>Make Money Hosting</h2>
                <p>
                Hosts make on average $40,000 per year. $20,000 is delivered through business income and the other $20,000 provides business expense benefit to the host. 
                </p>
                <br></br>
                <Button prompt={"BECOME A HOST"} onClick={() => {
                    window.scrollTo(0, 0);
                }}></Button>
            </div>
        </div>
    </div>
  );
};


export default HostInformationView;