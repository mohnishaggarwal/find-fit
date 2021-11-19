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

    function next(event) {
        let finished;

        // check for if the user answered the question
        if (selectedAns === '' && qaState.qaIdx !== 3) {
            // if user didn't answer a single answer question
            setErrorMessage("Please select one option");
        }
        else if (multChoices.length === 0 && qaState.qaIdx === 3) {
            // user didn't answer multiple answer question
            setErrorMessage("Please select at least one option");
        }
        else {
            // user answered everything
            if (qaState.qaIdx === 3) {
                finished = QuestionsService.nextQuestion(qaState, qaDispatch, multChoices);
            }
            else {
                finished = QuestionsService.nextQuestion(qaState, qaDispatch, selectedAns);
            }
            if (finished === 1) {
                history.push("/matching-options");
            }
            setQuestion(qaState.QAs[qaState.qaIdx].question);
            setAnswers(qaState.QAs[qaState.qaIdx].choices);
            
            if(qaState.QAs[qaState.qaIdx].answer !== undefined){
                setSelectedAns(qaState.QAs[qaState.qaIdx].answer);
            }
            else{
                setSelectedAns('');
            }
            setErrorMessage('');
        }
    }

    function last() {
        setErrorMessage('');
        QuestionsService.lastQuestion(qaDispatch);
        setQuestion(qaState.QAs[qaState.qaIdx].question);
        setAnswers(qaState.QAs[qaState.qaIdx].choices);
        setSelectedAns(qaState.QAs[qaState.qaIdx].answer);
        if (qaState.qaIdx === 3) {
            setMultChoices(qaState.QAs[qaState.qaIdx].answer);
        }
        //console.log(qaState.QAs);
    }

    function selectAns(selected) {
        if (qaState.qaIdx === 3) {
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

    useEffect(() => {
        //console.log(qaState);
        setQuestion(qaState.QAs[qaState.qaIdx].question);
        setAnswers(qaState.QAs[qaState.qaIdx].choices);

    }, [qaState]);

    return (
        <div>
            <div className='questions-container'>
                <div className='questions-question-box'>
                    {question}
                </div>
                {
                    (qaState.qaIdx === 1) && <div>
                        If you don't know your BMI, you can use this BMI calculator (<a target="_blank" href="https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc.htm">Click me</a>)
                    </div>
                }
                { qaState.qaIdx !== 3 ? (
                    <div className="form-check">
                    {
                        
                        answers.map((ans, idx) => {
                            if (qaState.QAs[qaState.qaIdx].answer !== undefined && selectedAns === ''){
                                // handles filling in question if it had been answered and saved before
                                selectAns(qaState.QAs[qaState.qaIdx].answer);
                            }
                            return <div key={idx} onClick={() => {selectAns(ans)}}>
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id={ans} checked={ans === selectedAns} onChange={() => void(0)}/>
                                        <label className="form-check-label" htmlFor="answers">
                                        
                                            {ans}
                                        </label>
                                    </div>
                                
                        })
                    }
                    </div>   
                ) : (
                    <div className="form-check">
                        {
                        answers.map((ans, idx) => {
                            return <div key={idx} onClick={() => {selectAns(ans)}}>
                                        <input className="form-check-input" type="checkbox" value={ans} id={ans} onChange={(e) => void(0)} checked={multChoices.includes(ans)}/>
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            {ans}
                                        </label>
                                    </div>
                        })
                    }
                    </div>
                )
                }
                <div id="invalid-input-message" style={{color: 'red'}}>{errorMessage}</div>        
                <br/>
                {
                    (qaState !== undefined && qaState.qaIdx !== 0) && 
                    <button onClick={last}>Last question</button>
                    
                }
                <button onClick={next}>Next question</button>
            </div>
        </div>  
    )
}

export default Questions;
