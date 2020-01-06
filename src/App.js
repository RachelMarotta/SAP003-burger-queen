import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Floor from './pages/Floor';
import Kitchen from './pages/Kitchen';
import Navbar from './components/Navbar';

function App() {
  return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Floor} />
          <Route path="/kitchen" component={Kitchen} />
        </Switch>
      </Router>

  );
}

export default App;