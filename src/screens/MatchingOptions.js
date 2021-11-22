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

    //regimes is not sorted, so I will try store into array then sort
    //take the top 3 choices and display their links below
    var myData=Object.keys(regimes).map(function(key){
        return[key, regimes[key]];
    });
    myData = myData.sort(function(first, second){
        return second[1][1]-first[1][1];
    });
    myData = myData.slice(0,3);
    //score would be myData[i][1][1]
    //passing parameters (params) react router pass in
    return (
        <div>
            <p class="options-class">Here are your top three regimes!</p>
            <div>
                <div>
                    {myData.map(function(item, i){
                        return (
                        <div>
                            <div>
                                <Link to={{ pathname:"/regime", state: { type:item[1][0].toLowerCase() } }}>
                                    {item[1][0]}
                                </Link>
                            </div>
                            <div>
                                <p>Score={item[1][1]}</p>
                            </div>
                        </div>)
                    })}
                </div>
            </div>
            
            <Link to="/questions">Change Answers</Link>
        </div>
    )
}

export default MatchingOptions;
