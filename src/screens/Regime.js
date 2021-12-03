import React from 'react';
import { Link, Route, useLocation } from 'react-router-dom';
import Comments from './../components/Comments'

const list_of_regimes = require('./../regimes.json')

function Regime() {
    const location = useLocation()
    //const regime_type = "crossfit"
    let regime_type = location.state.type;
    const regime = list_of_regimes[regime_type]
    const regime_schedule = regime["schedule"]

    function generate_daily_warmup(schema, day){
        let warm_up_comp = "";
        if (schema.length !== 0 && day.length !== 0){
            warm_up_comp = (
                <div className="regime-warmup">
                    <p className="left-align">Warmup:</p>   
                    <table className="regime-table regime-daily-schedule">
                        <tr className="regime-schedule-header" >
                        {
                            schema.map((col,i) =>{
                                return <th className="regime-schedule-header" width={parseInt(100/schema.length) + "%"}>{col}</th>
                            })
                        }
                        </tr>
                        {
                            day.map((exercise,i) => {
                                return(
                                <tr> 
                                    {exercise.map((col,i) => {
                                        return <th className="regime-table-body" width={parseInt(100/schema.length) + "%"}> {col} </th>
                                    })} 
                                </tr>
                                )
                            })
                        }
                    </table>
                </div>
            )
        }
        return warm_up_comp;
    }

    function generate_daily_main_workout(schema, day){
        return (
            <div className="regime-main-workout">
                <p className="left-align">Main Workout:</p>
                <table className="regime-table regime-daily-schedule">
                    <tr className="regime-schedule-header" >
                    {
                        schema.map((col) =>{
                            return <th className="regime-schedule-header" width={parseInt(100/schema.length) + "%"}>{col}</th>
                        })
                    }
                    </tr>
                    {
                        day.map((exercise) => {
                            return(
                                <tr> 
                                    {exercise.map((col,i) => {
                                        return <th className="regime-table-body" width={parseInt(100/schema.length) + "%"}> {col} </th>
                                    })} 
                                </tr>
                                )
                        })
                    }
                </table>
            </div>
        )
    }

    function generate_daily(){
        let display_list = [];                
        const schema = regime_schedule["schema"]
        regime_schedule["routine"].map((day,i) =>{
            display_list.push(
                <div className="regime-daily">
                    <h3 className="regime-routine-schedule-header"> Day {i + 1} </h3>
                    <div className="regime-daily-schedule">
                        {generate_daily_warmup(schema["warmup"],day["warmup"])}
                        {generate_daily_main_workout(schema["main_workout"], day["main_workout"])}
                    </div>
                </div>
            )
        })
        return display_list;
    }
    function generate_weekly(){
        let display_list = [];
        const days_of_the_week = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]

        regime_schedule["routine"].map((week,i) =>{

            let row = [];
            let schedule = [];
            let week_display_list = [];

            week_display_list.push(<h3 className="regime-routine-schedule-header"> Week {i + 1}</h3>)

            days_of_the_week.map((day)=>{
                row.push(<th>{day}</th>);
            })
            schedule.push(<tr className="regime-schedule-header" >{row}</tr>);
            row = []

            week["main_workout"].map((day)=>{
                row.push(
                    <th className="regime-table-body">
                        <ul>
                        {
                            day.map((exercise) => {
                                return <li className="no-list-style"> {exercise} </li>
                            })
                        }
                        </ul>
                    </th>
                )
            })

            schedule.push(<tr>{row}</tr>)
            week_display_list.push(
                <div className="regime-weekly-schedule">
                    <table className="regime-table regime-weekly-schedule">
                        {schedule.map(row => row)}
                    </table>
                </div>
            )

            display_list.push(
                <div className="regime-weekly">
                    {week_display_list.map(element => element)}
                </div>
            )

        })

        return display_list;
    }

    function getImage(img_name){
        return (
            <img className="regime-link-img"
            src={require("../img/routine-link-images/" + img_name).default}></img>
        )
    }
    function displaySchedule(){
        let display = []
        display.push(<p className="regime-workout-description">{regime_schedule["description"]}</p>)
        switch(regime_schedule["display_type"]){
            case "daily":
                display.push(generate_daily());
                break;
            case "weekly":
                display.push(generate_weekly());
                break;
            default:
                console.log("We most likely just had an error");
                return;
        }
        return display
    }

    return (
        <div className="regime-page">
            <div className="regime-banner">
                <div>
                    <p className="regime-title"> We believe you should try:</p>
                    <p className="regime-title bolder-text"> {regime["name"]}! </p> 
                </div>
            </div>
            <div className="regime-body">
                <div className="regime-main-body">
                    <div className="regime-left">
                        <div className="regime-description">
                            {regime["description"]}
                        </div>
                        <div className="regime-routine">
                            <h2 className="regime-routine-header"> Beginner's Regime </h2>
                            {
                                (displaySchedule()).map(component => {
                                    return component;
                                })
                            }
                        </div>
                    </div>
                    <div className="regime-right">
                        {
                            regime["links"].map((link,i) => {
                                return(
                                <div className="regime-link-section">
                                    <p>{link["description"]}</p>
                                    <div>
                                        <a href={link["link"]} target="_blank" key={i}>
                                            {getImage(link["img"])}
                                        </a> 
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="regime-bottom-div">
                    <div id="regime-back">
                        <p> Curious about your other matches? </p>
                            <div className='regime-button'>
                                <Link className="no-link-style" to="/matching-options"> 
                                    <div className="regime-button-text">Back</div>
                                </Link> 
                            </div>
                    </div>
                    <div id="regime-start-over">
                        <p> Big lifestyle changes? Take this quiz again! </p>
                            <div className='regime-button'>
                                <a className="no-link-style" href="/">
                                    <div className="regime-button-text">Start Over</div>
                                </a>
                            </div>
                    </div>
                </div>
                <Comments regime={regime_type}/>
            </div>
        </div>
    )
}

export default Regime;
