const questions = require('./../questions.json');

const MatchingService = {
    matchRegimes: (qaState) => {
        let matchRegimes = {
            "Bodybuilding": 0,
            "Crossfit": 0,
            "Powerlifting": 0,
            "Calisthenics": 0,
            "Running": 0,
            "Cycling": 0,
            "Swimming": 0
        };

        const small = 5;
        const med = 10;
        const large = 15;

        let idx = 0;
        qaState.QAs.forEach((QA) => {
            if (idx === 0) {
                if (QA.answer === questions.age.choices[0]) {
                    delete matchRegimes["Bodybuilding"];
                    delete matchRegimes["Crossfit"];
                    delete matchRegimes["Powerlifting"];
                } else if (QA.answer === questions.age.choices[1]) {
                    matchRegimes["Bodybuilding"] += small;
                    matchRegimes["Crossfit"] += small;
                    matchRegimes["Powerlifting"] += small;
                } else if (QA.answer === questions.age.choices[2]) {
                    matchRegimes["Bodybuilding"] += small;
                } else {
                    delete matchRegimes["Bodybuilding"];
                    delete matchRegimes["Crossfit"];
                    delete matchRegimes["Powerlifting"];
                }
            } else if (idx === 1) {
                if (QA.answer === questions.bmi.choices[1]) {
                    if (matchRegimes.hasOwnProperty("Crossfit")) {
                        delete matchRegimes["Crossfit"];
                    }
                    delete matchRegimes["Running"];
                }
            } else if (idx === 2) {
                if (QA.question === questions["injuries-under14-BMI-under-40"].question) {
                    if (QA.answer.includes(questions["injuries-under14-BMI-under-40"].choices[0])) {
                        if ("Running" in matchRegimes) {
                            delete matchRegimes["Running"];
                        }
                    }
                    if (QA.answer.includes(questions["injuries-under14-BMI-under-40"].choices[1])) {
                        if ("Calisthenics" in matchRegimes) {
                            delete matchRegimes["Calisthenics"];
                        }
                    }
                } else if (QA.question === questions["injuries-under14-BMI-over-40"].question) {
                    if (QA.answer.includes(questions["injuries-under14-BMI-over-40"].choices[0]) || QA.answer.includes(questions["injuries-under14-BMI-over-40"].choices[1])) {
                        if ("Calisthenics" in matchRegimes) {
                            delete matchRegimes["Calisthenics"];
                        }
                    }
                } else if (QA.question === questions["injuries-14-60-BMI-under-40"].question) {
                    if (QA.answer.includes(questions["injuries-14-60-BMI-under-40"].choices[0])) {
                        if ("Bodybuilding" in matchRegimes) {
                            delete matchRegimes["Bodybuilding"];
                        }
                        if ("Powerlifting" in matchRegimes) {
                            delete matchRegimes["Powerlifting"];
                        }
                        if ("Crossfit" in matchRegimes) {
                            delete matchRegimes["Crossfit"];
                        }
                    }
                    if (QA.answer.includes(questions["injuries-14-60-BMI-under-40"].choices[1])) {
                        if ("Calisthenics" in matchRegimes) {
                            delete matchRegimes["Calisthenics"];
                        }
                    }
                    if (QA.answer.includes(questions["injuries-14-60-BMI-under-40"].choices[2])) {
                        if ("Running" in matchRegimes) {
                            delete matchRegimes["Running"];
                        }
                    }
                } else if (QA.question === questions["injuries-14-60-BMI-over-40"].question) {
                    if (QA.answer.includes(questions["injuries-14-60-BMI-over-40"].choices[0])) {
                        if ("Bodybuilding" in matchRegimes) {
                            delete matchRegimes["Bodybuilding"];
                        }
                        if ("Powerlifting" in matchRegimes) {
                            delete matchRegimes["Powerlifting"];
                        }
                        if ("Crossfit" in matchRegimes) {
                            delete matchRegimes["Crossfit"];
                        }
                    }
                    if (QA.answer.includes(questions["injuries-14-60-BMI-over-40"].choices[1])) {
                        if ("Calisthenics" in matchRegimes) {
                            delete matchRegimes["Calisthenics"];
                        }
                    }
                } else if (QA.question === questions["injuries-over61-BMI-under-40"].question) {
                    if (QA.answer.includes(questions["injuries-over61-BMI-under-40"].choices[0])) {
                        if ("Calisthenics" in matchRegimes) {
                            delete matchRegimes["Calisthenics"];
                        }
                    }
                    if (QA.answer.includes(questions["injuries-over61-BMI-under-40"].choices[1])) {
                        if ("Running" in matchRegimes) {
                            delete matchRegimes["Running"];
                        }
                    }
                } else {
                    if (QA.answer.includes(questions["injuries-over61-BMI-over-40"].choices[0]) || QA.answer.includes(questions["injuries-over61-BMI-over-40"].choices[1])) {
                        if ("Calisthenics" in matchRegimes) {
                            delete matchRegimes["Calisthenics"];
                        }
                    }
                }
            } else if (idx === 3) {
                QA.answer.forEach((ans) => {
                    if (ans === questions["goals-14-60"].choices[0]) {
                        if ("Bodybuilding" in matchRegimes) {
                            matchRegimes["Bodybuilding"] += large;
                        }
                        if ("Calisthenics" in matchRegimes) {
                            matchRegimes["Calisthenics"] += med;
                        }
                    }
                    if (ans === questions["goals-14-60"].choices[1]) {
                        if ("Powerlifting" in matchRegimes) {
                            matchRegimes["Powerlifting"] += large;
                        }
                        if ("Calisthenics" in matchRegimes) {
                            matchRegimes["Calisthenics"] += med;
                        }
                    }
                    if (ans === questions["goals-14-60"].choices[2]) {
                        if ("Crossfit" in matchRegimes) {
                            matchRegimes["Crossfit"] += large;
                        }
                        if ("Cycling" in matchRegimes) {
                            matchRegimes["Cycling"] += large;
                        }
                        if ("Swimming" in matchRegimes) {
                            matchRegimes["Swimming"] += large;
                        }
                        if ("Running" in matchRegimes) {
                            matchRegimes["Running"] += large;
                        }
                    }
                    if (ans === questions["goals-14-60"].choices[3]) {
                        if ("Cycling" in matchRegimes) {
                            matchRegimes["Cycling"] += large;
                        }
                        if ("Running" in matchRegimes) {
                            matchRegimes["Running"] += large;
                        }
                        if ("Calisthenics" in matchRegimes) {
                            matchRegimes["Calisthenics"] += med;
                        }
                        if ("Swimming" in matchRegimes) {
                            matchRegimes["Swimming"] += large;
                        }
                        if ("Crossfit" in matchRegimes) {
                            matchRegimes["Crossfit"] += small;
                        }
                    }
                    if (ans === questions["goals-other"].choices[0]) {
                        if ("Calisthenics" in matchRegimes) {
                            matchRegimes["Calisthenics"] += large;
                        }
                        if ("Swimming" in matchRegimes) {
                            matchRegimes["Swimming"] += med;
                        }
                    }
                })
            } else if (idx === 4) {
                if (QA.answer === questions.swimming.choices[0]) {
                    if ("Swimming" in matchRegimes) {
                        matchRegimes["Swimming"] += large;
                    }
                }
            } else if (idx === 5) {
                if (QA.answer === questions.cycling.choices[0]) {
                    if ("Cycling" in matchRegimes) {
                        matchRegimes["Cycling"] += large;
                    }
                }
            } else if (idx === 6) {
                if (QA.answer === questions.weights.choices[1]) {
                    if ("Bodybuilding" in matchRegimes) {
                        delete matchRegimes["Bodybuilding"];
                    }
                    if ("Powerlifting" in matchRegimes) {
                        delete matchRegimes["Powerlifting"];
                    }
                    if ("Crossfit" in matchRegimes) {
                        delete matchRegimes["Crossfit"];
                    }
                }
            } else if (idx === 7) {
                if (QA.answer === questions["high-intensity-cardio"].choices[1]) {
                    if ("Crossfit" in matchRegimes) {
                        delete matchRegimes["Crossfit"];
                    }
                }
            } else if (idx === 8) {
                if (QA.answer === questions["muscle-or-strength"].choices[0]) {
                    if ("Bodybuilding" in matchRegimes) {
                        matchRegimes["Bodybuilding"] += large;
                    }
                }
                else {
                    if ("Powerlifting" in matchRegimes) {
                        matchRegimes["Powerlifting"] += large;
                    }
                }
            }
            idx++;
            console.log(matchRegimes);
        });

        let results = [];
        for (var res in matchRegimes) {
            results.push([res, matchRegimes[res]]);
        }
        //results.sort((res1, res2) => { res1[1] - res2[1]; });
        console.log(results);
        return results;
    }
}

export default MatchingService;