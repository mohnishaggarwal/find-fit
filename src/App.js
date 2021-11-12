import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import Questions from './screens/Questions';
import MatchingOptions from './screens/MatchingOptions';
import Regime from './screens/Regime';

function App() {
  return (
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
  );
}

export default App;
