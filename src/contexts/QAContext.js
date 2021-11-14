import { createContext } from 'react'

const questions = require('./../questions.json');

const initState = {
    qaIdx: 0,
    QAs: [
        {
            "question": questions.age.question,
            "choices": questions.age.choices
        }
    ]
};

const QAReducer = (state, action) => {
    switch (action.type) {
        case 'add_QA':
            //console.log(`Adding the following question and answer:\n${JSON.stringify(action.payload)}`);
            state.QAs.push(action.payload);
            return state;
        case 'update_qaIdx':
            //console.log(`Changing the question index by: ${action.payload}`);
            state.qaIdx += action.payload;
            return state;
        case 'set_answer':
            //console.log(`Setting the answer to ${state.QAs[state.qaIdx].question} to ${action.payload}`);
            state.QAs[state.qaIdx].answer = action.payload;
            return state;
        case 'remove_QA':
            state.QAs.pop();
            state.qaIdx -= 1;
            return state;
        default:
            console.log("We most likely just had an error");
            return state;
    }
}

const QAContext = createContext(null);

export { initState, QAReducer, QAContext };