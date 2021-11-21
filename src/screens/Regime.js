import React from 'react';
import { Link, Route, useLocation } from 'react-router-dom';

const list_of_regimes = require('./../regimes.json')

function Regime() {

    const location = useLocation()
    //const regime_type = "crossfit"
    const regime_type=location.state.type;
    const regime = list_of_regimes[regime_type]
    const regime_schedule = regime["schedule"]

    function displaySchedule(){
        const display_list = []
        switch(regime_schedule["display_type"]){
            case "daily":
                const schema = regime_schedule["schema"]
                regime_schedule["routine"].map((day,i) =>{
                    display_list.push(
                        <div key={i}>
                            Day {i}
                            <p>Warmup:</p>   
                            <table key={i}>
                                <tr>
                                {
                                    schema["warmup"].map((col,i) =>{
                                        return <th>{col}</th>
                                    })
                                }
                                </tr>
                                {
                                    day["warmup"].map((exercise,i) => {
                                        return(
                                        <tr> 
                                            {exercise.map((col,i) => {
                                                return <th> {col} </th>
                                            })} 
                                        </tr>
                                        )
                                    })
                                }
                            </table>
                            <p>Main Workout:</p>
                            <table>
                                <tr>
                                {
                                    schema["main_workout"].map((col,i) =>{
                                        return <th>{col}</th>
                                    })
                                }
                                </tr>
                                {
                                    day["main_workout"].map((exercise,i) => {
                                        return(
                                            <tr> 
                                                {exercise.map((col,i) => {
                                                    return <th> {col} </th>
                                                })} 
                                            </tr>
                                            )
                                    })
                                }
                            </table>
                        </div>
                    )
                })
                
                return display_list;
            case "weekly":
                let row = [];
                let schedule = [];
                regime_schedule["routine"].map((day,i) =>{
                    if(i % 7 == 0){
                        row = []
                    }
                    row.push(
                    <th>
                        <ul>
                        {
                            day.map((exercise,i)=>{
                                return <li> {exercise} </li>
                            })
                        }
                        </ul>
                    </th>)
                    if(i % 7 == 6){
                        schedule.push(
                        <tr>
                            {row.map(day => day)}
                        </tr>
                        )
                    }
                })

                display_list.push(
                <table>
                    {schedule.map(week => week)}
                </table>)
                return display_list;
            default:
                console.log("We most likely just had an error");
                return;
        }
    }

    return (
        <div>
            <p>We believe you should try {regime["name"]}!</p>
            <div>
                {regime["description"]}
            </div>
            <div>
                {
                    displaySchedule()
                }
            </div>
            <div>
                Links:
                <div>
                    <ul>
                    {
                        regime["links"].map((link,i) => {
                            return <li><a href={link} key={i}>{link} </a></li>
                        })
                    }
                    </ul>
                </div>
            </div>
            <div className="bottom-div">
                <p> Curious about your other matches? </p>
                <Link className="no-link-style" to="/matching-options"> 
                    <div className='regime-button'>
                        <span>Back</span>
                    </div>
                </Link> 
            </div>
            <br />
            <div className="bottom-div">
                <p> Big lifestyle changes? Take this quiz again! </p>
                <Link className="no-link-style" to="/">
                    <div className='regime-button'>
                        <span>Start Over</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Regime;
