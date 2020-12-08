import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import Links from '../../configs/api-links.json';
import Loader from 'react-loader-spinner';

function ThankYou() {
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();

    useEffect(() => {
        let userId = sessionStorage.getItem('uuid');
        if (!userId)
            history.replace("/");
        else {
            fetch(`${Links.check_submission}?uuid=${userId}`, {
                method: 'GET'
            }).then(async response => {
                const res = await response.json();
                if (res.success) {
                    if (res.submitted) {
                        setIsLoading(false);
                        sessionStorage.clear();
                        return;
                    }
                    else {
                        history.replace("/assessment");
                    }
                } 
                else
                    history.replace("/");
            });
        }
    }, [history])

    return isLoading 
            ? <div className="centered-page">
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
                <h3>Loading</h3>
            </div> 
            : (
                <div className="centered-page">
                    <h1><FontAwesomeIcon icon={faCheckCircle} /></h1>
                    <h2>Thank you!</h2>
                    <h4 style={{textAlign: 'center'}}>
                        We have received your submission successfully.<br/>
                        We will get back to you shortly.
                    </h4>
                </div>
            );
};

export default ThankYou;
