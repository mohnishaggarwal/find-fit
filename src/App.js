import './App.css';
import './home.css';
import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import Questions from './screens/Questions';
import MatchingOptions from './screens/MatchingOptions';
import Regime from './screens/Regime';
import { initState, QAReducer, QAContext } from './contexts/QAContext.js';


function App() {
  const [state, dispatch] = useReducer(QAReducer, initState);

  return (
    <QAContext.Provider value={{ qaState: state, qaDispatch: dispatch }}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/questions">
              <Questions />
            </Route>
            <Route exact path="/matching-options">
              <MatchingOptions />
            </Route>
            <Route exact path="/regime">
              <Regime />
            </Route>
          </Switch>
        </div>
      </Router>
    </QAContext.Provider>
  );
}

export default App;
