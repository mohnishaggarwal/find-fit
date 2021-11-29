import React, { useEffect, useContext, useState } from 'react';
import QuestionsService from './../services/QuestionsService';
import { QAContext } from './../contexts/QAContext';
import { useHistory } from "react-router-dom";

function Questions() {
    const { qaState, qaDispatch } = useContext(QAContext);
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([]);
    const [selectedAns, setSelectedAns] = useState('');
    const [multChoices, setMultChoices] = useState([]);     // Only to be used on question that says asks for goals.
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState(""); 
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmi, setBMI] = useState("");

    function checkIfAnswered() {
        // check for if the user answered the question
        if (selectedAns === '' && qaState.qaIdx !== 3 && qaState.qaIdx !== 2) {
            // if user didn't answer a single answer question
            setErrorMessage("Please select one option");
            return false;
        }
        else if (multChoices.length === 0 && (qaState.qaIdx === 3 || qaState.qaIdx === 2)) {
            // user didn't answer multiple answer question
            setErrorMessage("Please select at least one option");
            return false;
        }
        return true;

    }

    function next() {
        let finished = 0;
        if (checkIfAnswered()){
            // user answered everything
            if (qaState.qaIdx === 2 || qaState.qaIdx === 3) {
                QuestionsService.nextQuestion(qaState, qaDispatch, multChoices);
                setMultChoices([]);
            }
            else {
                finished = QuestionsService.nextQuestion(qaState, qaDispatch, selectedAns);
            }
            if (finished === 1) {
                history.push("/matching-options");
            }
            else {
                setQuestion(qaState.QAs[qaState.qaIdx].question);
                setAnswers(qaState.QAs[qaState.qaIdx].choices);
                if(qaState.QAs[qaState.qaIdx].answer !== undefined){
                    setSelectedAns(qaState.QAs[qaState.qaIdx].answer);
                }
                else{
                    setSelectedAns('');
                    setMultChoices([]);
                }
                setErrorMessage('');
                setBMI("");
            }
        }
        //console.log(qaState.QAs[qaState.qaIdx-1]);
    }

    function last() {
        setErrorMessage('');
        QuestionsService.lastQuestion(qaDispatch);
        setQuestion(qaState.QAs[qaState.qaIdx].question);
        setAnswers(qaState.QAs[qaState.qaIdx].choices);
        setSelectedAns(qaState.QAs[qaState.qaIdx].answer);
        if (qaState.qaIdx === 2 || qaState.qaIdx === 3) {
            setMultChoices(qaState.QAs[qaState.qaIdx].answer);
        }
        //console.log(qaState.QAs);
    }

    function selectAns(selected) {
        if (qaState.qaIdx === 2 || qaState.qaIdx === 3) {
            if (multChoices.includes("None of the above listed injuries") && selected !== "None of the above listed injuries") {
                setMultChoices(multChoices.filter((value, index, arr) => {
                    return value !== "None of the above listed injuries";
                }));
            }
            if (selected === "None of the above listed injuries" && multChoices.length !== 0) {
                setMultChoices(multChoices.filter((value, index, arr) => {
                    return value === "None of the above listed injuries";
                }));
            }
            if (multChoices.includes(selected)){
                setMultChoices(multChoices.filter((value, index, arr) => {
                    return value !== selected;
                }));
            }
            else{
                setErrorMessage('');
                setMultChoices((selectedSoFar) => [...selectedSoFar, selected]);
            }
        }
        else {
            setErrorMessage('');
            setSelectedAns(selected);
        }
    }

    function calculateBMI() {
        if (weight === "" || height === ""){
            setBMI("Please enter a number into each field");
        }
        else
        setBMI(((parseInt(weight,10) * 703)/(parseInt(height,10)*parseInt(height,10))).toFixed(1) )
    }

    useEffect(() => {
        //console.log(qaState);
        if (qaState.QAs[qaState.qaIdx].question === "transitory") {
            qaDispatch({type: 'remove_QA'});
        }
        setQuestion(qaState.QAs[qaState.qaIdx].question);
        setAnswers(qaState.QAs[qaState.qaIdx].choices);

    }, []);

    return (
        <div className='home'>
            <div className='questions-background-img'></div>
            <div className='questions-container'>
                <div className='questions-question-box'>
                    <div>{question}</div>
                </div>
                { qaState.qaIdx !== 2 && qaState.qaIdx !== 3 ? (
                    <div>
                    {
                        
                        answers.map((ans, idx) => {
                            if (qaState.QAs[qaState.qaIdx].answer !== undefined && selectedAns === ''){
                                // handles filling in question if it had been answered and saved before
                                selectAns(qaState.QAs[qaState.qaIdx].answer);
                            }

                            return <div key={idx} onClick={() => {selectAns(ans)}}
                            className={`questions-answer-box ${ans === answers.at(-1) ? "questions-bottom-answer-box" : ""}`}>
                                <input className="form-check-input questions-answer-input-button" type="radio" name="flexRadioDefault" id={ans} checked={ans === selectedAns} onChange={() => void(0)}/>
                                        <label className="form-check-label question-answer-text-container" htmlFor="answers">
                                            {ans}
                                        </label>
                                    </div>
                                
                        })
                    }
                    </div>   
                ) : (
                    <div>
                        {
                        answers.map((ans, idx) => {
                            return <div key={idx} onClick={() => {selectAns(ans)}} className={`questions-answer-box ${ans === answers.at(-1) ? "questions-bottom-answer-box" : ""}`}>
                                        <input className="form-check-input questions-answer-input-button" type="checkbox"  value={ans} id={ans} onChange={(e) => void(0)} checked={multChoices.includes(ans)}/>
                                        <label className="form-check-label question-answer-text-container" htmlFor="flexCheckDefault">
                                            {ans}
                                        </label>
                                    </div>
                        })
                    }
                    </div>
                )
                }
                <div id="invalid-input-message" className="questions-error-message">{errorMessage}</div>        
                <br/>

                {
                    (qaState.qaIdx === 1) && <div className="questions-bmi-calculator-container">
                        Here is a BMI calculator for if you don't know your BMI. This is optional.
                        <div className="questions-bmi-calculator">
                            <div className="questions-bmi-calculator-field">
                                <label>
                                    Height (inches):&nbsp;
                                    <input type="text" onChange={(event) => setHeight(event.target.value)}/>
                                </label>
                            </div>
                            <div className="questions-bmi-calculator-field">
                                <label>
                                    Weight (pounds):&nbsp;
                                    <input type="text" onChange={(event) => setWeight(event.target.value)}/>
                                </label>
                            </div>
                            </div>
                        <div className="questions-bmi-button">
                            <input type="button" value="Calculate BMI" onClick={() => calculateBMI()}/>
                        </div>
                        <div>Your BMI is: {bmi}</div>
                    </div>
                }
                <br/>
                <div className="questions-nav-button-container">
                    {
                        (qaState !== undefined && qaState.qaIdx !== 0) && 
                        <button onClick={last} className="questions-nav-buttons">Back</button>
                        
                    }
                    {
                        ((selectedAns === '' && qaState.qaIdx !== 3 && qaState.qaIdx !== 2) ||(multChoices.length === 0 && (qaState.qaIdx === 3 || qaState.qaIdx === 2))) ? 
                        (<button onClick={next} className="questions-nav-buttons-disabled" >Next</button>) : 
                        (<button onClick={next} className="questions-nav-buttons">Next</button>)

                    }
                    
                </div>
            </div>
        </div>  
    )
}

export default Questions;
