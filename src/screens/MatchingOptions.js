import React, { useState, useEffect, useContext } from 'react';
import MatchingService from './../services/MatchingService';
import { QAContext } from './../contexts/QAContext';
import { Link } from 'react-router-dom';

function MatchingOptions() {
    const { qaState } = useContext(QAContext);
    const [regimes, setRegimes] = useState('');

    useEffect(() => {
        setRegimes(MatchingService.matchRegimes(qaState));
    }, [qaState]);

    return (
        <div>
            <p>This is the page where we give the user possible regimes</p>
            <Link to="/questions">Change</Link>
        </div>
    )
}

export default MatchingOptions;
