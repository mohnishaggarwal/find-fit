import { createContext } from 'react'

const list_of_regimes = require('./../regimes.json');

const initState = {
    regime_type: "",
    regime:
    [
        {
        "description": "",
        "schedule": [],
        "link": []
        }
    ]
};

const RegReducer = (state, action) => {
    switch (action.type) {
        case 'changeRegime':
            state.regime_type = action.payload
            return state
        case 'getRegime':
            return state
        default:
            console.log("We most likely just had an error");
            return state;
    }
}

const QAContext = createContext(null);

export { initState, QAReducer, QAContext };