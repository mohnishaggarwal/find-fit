import React, { useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { QAContext } from './../contexts/QAContext';

function Home() {
    const { qaState, qaDispatch } = useContext(QAContext);

    useEffect(() => {
        qaDispatch({type: 'clear_state'});
    }, [qaDispatch])

    return (
        <div className='home'>
            <div className='background-img'></div>
            <div className='home-container'>
                <div className='home-header'>Welcome!</div>
                <div className='home-description'>
                    Just beginning your fitness journey? Intimidated by all the different ways to get fit? 
                    <br/><br/>
                    We’re here to help! But first, we want to get to know you! After answering these ten questions, we will match you with a fitness regime that we believe will best suit your goals and logistics! 
                </div>
                <Link className='no-link-style' to="/questions">
                    <div className='home-begin-button'>
                        <span>Let's Begin!</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Home;
