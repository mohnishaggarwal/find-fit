import React, { useEffect, useContext, useState } from 'react';
import QuestionsService from './../services/QuestionsService';
import { QAContext } from './../contexts/QAContext';

function Questions() {
    const { qaState, qaDispatch } = useContext(QAContext);
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([]);
    const [selectedAns, setSelectedAns] = useState('');
    const [multChoices, setMultChoices] = useState([]);     // Only to be used on question that says asks for goals.

    function next() {
        //console.log(selectedAns);
        console.log(qaState);
        if (qaState.qaIdx === 3) {
            QuestionsService.nextQuestion(qaState, qaDispatch, multChoices);
        }
        else {
            QuestionsService.nextQuestion(qaState, qaDispatch, selectedAns);
        }
        setQuestion(qaState.QAs[qaState.qaIdx].question);
        setAnswers(qaState.QAs[qaState.qaIdx].choices);
        if(qaState.QAs[qaState.qaIdx].answer !== undefined){
            setSelectedAns(qaState.QAs[qaState.qaIdx].answer);
        }
        else{
            setSelectedAns('');
        }
    }

    function last() {
        QuestionsService.lastQuestion(qaDispatch);
        setQuestion(qaState.QAs[qaState.qaIdx].question);
        setAnswers(qaState.QAs[qaState.qaIdx].choices);
        setSelectedAns(qaState.QAs[qaState.qaIdx].answer)
        //console.log(qaState.QAs);
    }

    function selectAns(selected) {
        if (qaState.qaIdx === 3) {
            setMultChoices((selectedSoFar) => [...selectedSoFar, selected]);
        }
        else {
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
                <div className="form-check">
                {
                    
                    answers.map((ans, idx) => {
                        // console.log(context.qaState.QAs[context.qaState.qaIdx].answer);
                        return <div key={idx} onClick={() => {selectAns(ans)}}>
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id={ans} checked={(qaState.QAs[qaState.qaIdx] !== undefined && qaState.QAs[qaState.qaIdx].answer === ans) || ans === selectedAns} onChange={() => {selectAns(ans)}}/>
                                    <label className="form-check-label" htmlFor="answers">
                                        {ans}
                                    </label>
                                </div>
                               
                    })
                }
                 </div>            
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
