const questions = require('./../questions.json');

const QuestionsService = {
    nextQuestion: (qaState, qaDispatch, selectedAns) => {
        qaDispatch({type: 'set_answer', payload: selectedAns});
        let questionAdded = false;
        console.log(qaState);
        while (!questionAdded) {
            if (qaState.qaIdx === 0) {
                qaDispatch({type: 'add_QA', payload: questions.bmi});
                questionAdded = true;
            }
            else if (qaState.qaIdx === 1) {
                if (selectedAns === "Under") {
                    if (qaState.QAs[0].answer === questions.age.choices[0]) {
                        qaDispatch({type: 'add_QA', payload: questions["injuries-under14-BMI-under-40"]});
                    }
                    else if (qaState.QAs[0].answer === questions.age.choices[1]) {
                        qaDispatch({type: 'add_QA', payload: questions["injuries-14-60-BMI-under-40"]});
                    }
                    else if (qaState.QAs[0].answer === questions.age.choices[2]) {
                        qaDispatch({type: 'add_QA', payload: questions["injuries-14-60-BMI-under-40"]});
                    }
                    else {
                        qaDispatch({type: 'add_QA', payload: questions["injuries-over61-BMI-under-40"]});
                    }
                }
                else {
                    if (qaState.QAs[0].answer === questions.age.choices[0]) {
                        qaDispatch({type: 'add_QA', payload: questions["injuries-under14-BMI-over-40"]});
                    }
                    else if (qaState.QAs[0].answer === questions.age.choices[1]) {
                        qaDispatch({type: 'add_QA', payload: questions["injuries-14-60-BMI-over-40"]});
                    }
                    else if (qaState.QAs[0].answer === questions.age.choices[2]) {
                        qaDispatch({type: 'add_QA', payload: questions["injuries-14-60-BMI-over-40"]});
                    }
                    else {
                        qaDispatch({type: 'add_QA', payload: questions["injuries-over61-BMI-over-40"]});
                    }
                }
                questionAdded = true;
            }
            else if (qaState.qaIdx === 2) {
                if (qaState.QAs[0].answer === questions.age.choices[0] || qaState.QAs[0].answer === questions.age.choices[3]) {
                    qaDispatch({type: 'add_QA', payload: questions["goals-other"]});
                }
                else {
                    qaDispatch({type: 'add_QA', payload: questions["goals-14-60"]});
                }
                questionAdded = true;
            }
            else if (qaState.qaIdx === 3) {
                qaDispatch({type: 'add_QA', payload: questions.swimming});
                questionAdded = true;
            }
            else if (qaState.qaIdx === 4) {
                qaDispatch({type: 'add_QA', payload: questions.cycling});
                questionAdded = true;
            }
            else if (qaState.qaIdx === 5 && (qaState.QAs[0].answer === questions.age.choices[1] || qaState.QAs[0].answer === questions.age.choices[2])) {
                if (qaState.QAs[3].answer.includes(questions["goals-14-60"].choices[0] || qaState.QAs[3].answer.includes(questions["goals-14-60"].choices[1]))) {
                    qaDispatch({type: 'add_QA', payload: questions.weights});
                    questionAdded = true;
                }
                else {
                    qaDispatch({type: 'update_qaIdx', payload: 1});
                    qaDispatch({type: 'add_transitory'});
                }
            }
            else if (qaState.qaIdx === 6 && (qaState.QAs[0].answer === questions.age.choices[1] || qaState.QAs[0].answer === questions.age.choices[2])) {
                if (qaState.QAs[3].answer.includes(questions["goals-14-60"].choices[2] || qaState.QAs[3].answer.includes(questions["goals-14-60"].choices[3]))) {
                    qaDispatch({type: 'add_QA', payload: questions["high-intensity-cardio"]});
                    questionAdded = true;
                }
                else {
                    qaDispatch({type: 'update_qaIdx', payload: 1});
                    qaDispatch({type: 'add_transitory'});
                }
            }
            else if (qaState.qaIdx === 7 && (qaState.QAs[0].answer === questions.age.choices[1] || qaState.QAs[0].answer === questions.age.choices[2])) {
                if (qaState.QAs[3].answer.includes(questions["goals-14-60"].choices[0] || qaState.QAs[3].answer.includes(questions["goals-14-60"].choices[1]))) {
                    qaDispatch({type: 'add_QA', payload: questions["muscle-or-strength"]});
                    questionAdded = true;
                }
                else {
                    console.log("Matching time");
                    //console.log(qaState);
                    return 1;
                }
            }
            else {
                console.log("Matching time");
                //console.log(qaState);
                return 1;
            }
        }
        qaDispatch({type: 'update_qaIdx', payload: 1});
    },
    lastQuestion: (qaDispatch) => {
        qaDispatch({type: 'remove_QA'});
    }

}

export default QuestionsService;