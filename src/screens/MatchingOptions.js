import React from 'react';
import { Link } from 'react-router-dom';

function MatchingOptions() {
    return (
        <div>
            <p>This is the page where we give the user possible regimes</p>
            <Link to="/questions">Change</Link>
        </div>
    )
}

export default MatchingOptions;
