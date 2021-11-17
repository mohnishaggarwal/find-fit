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

    function next() {
        //console.log(selectedAns);
        let finished;
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
    }

    function last() {
        QuestionsService.lastQuestion(qaDispatch);
        setQuestion(qaState.QAs[qaState.qaIdx].question);
        setAnswers(qaState.QAs[qaState.qaIdx].choices);
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
            <p>This is the page where we ask questions</p>
            <p>{question}</p>
            <button onClick={last}>Last question</button>
            {
                answers.map((ans, idx) => {
                    return <button key={idx} onClick={() => {selectAns(ans)}}>{ans}</button>
                })
            }
            <button onClick={next}>Next question</button>
        </div>  
    )
}

export default Questions;
