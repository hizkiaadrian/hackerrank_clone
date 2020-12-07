import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function ThankYou() {
    return (
        <div className="centered-page">
            <h1><FontAwesomeIcon icon={faCheckCircle} /></h1>
            <h2>Thank you!</h2>
            <h4 style={{textAlign: 'center'}}>
                We have received your submission successfully.<br/>
                We will get back to you shortly.
            </h4>
        </div>
    )
}

export default ThankYou;
