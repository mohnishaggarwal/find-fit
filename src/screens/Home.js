import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <p>Homepage</p>
            <Link to="/questions">Begin</Link>
        </div>
    )
}

export default Home;
