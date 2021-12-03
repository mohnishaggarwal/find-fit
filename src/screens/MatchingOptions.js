import React, { useState, useEffect, useContext } from 'react';
import MatchingService from './../services/MatchingService';
import { QAContext } from './../contexts/QAContext';
import { Link } from 'react-router-dom';
import Cycling from '../img/routine-images/Cycling.jpg'
import Calisthenics from '../img/routine-images/Calisthenics.jpg'
import Running from '../img/routine-images/Running.jpg'
import Crossfit from '../img/routine-images/Crossfit.jpg'
import Powerlifting from '../img/routine-images/Powerlifting.jpg'
import Swimming from '../img/routine-images/Swimming.jpg'
import Bodybuilding from '../img/routine-images/Bodybuilding.jpg'

function MatchingOptions() {
    const { qaState } = useContext(QAContext);
    const [regimes, setRegimes] = useState('');

    useEffect(() => {
        setRegimes(MatchingService.matchRegimes(qaState));
    }, [qaState]);

    var myData=Object.keys(regimes).map(function(key){
        return[key, regimes[key]];
    });
    myData = myData.sort(function(first, second){
        return second[1][1]-first[1][1];
    });
    myData = myData.slice(0,3);

    function getImage(routine){
        if(routine==='Cycling'){
            return Cycling;
        }
        if(routine==='Running'){
            return Running;
        }
        if(routine==='Calisthenics'){
            return Calisthenics;
        }
        if(routine==='Swimming'){
            return Swimming;
        }
        if(routine==='Powerlifting'){
            return Powerlifting;
        }
        if(routine==='Crossfit'){
            return Crossfit;
        }
        if(routine==='Bodybuilding'){
            return Bodybuilding;
        }
    }
    // test 
    return (
        <div className="page-options">
            <div className="background-options"></div>
            <div className="options-content">
                <p className="options-title">Your Top Regimes</p>
                <div>
                    <div className="container-options">
                        {myData.map(function(item, i){
                            return (
                            <div className="types-options">
                                <div>
                                    <Link className="link" to={{ pathname:"/regime", state: { type:item[1][0].toLowerCase() } }}>
                                        {item[1][0]}
                                        <div>
                                            <img className="image-options" src={getImage(item[1][0])} alt={item[1][0]}></img>
                                        </div>
                                    </Link>
                                </div>
                                <div>
                                    <p className="score-options">Fit Score: {item[1][1]}</p>
                                </div>
                            </div>)
                        })}
                    </div>
                </div>
                
                <Link className="options-button" to="/questions">Change Answers</Link>
            </div>
            
        </div>
    )
}

export default MatchingOptions;
