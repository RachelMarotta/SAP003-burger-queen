import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Floor from './pages/Floor';
import Kitchen from './pages/Kitchen';
import Waiter from './pages/Waiter'

function App() {
  return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Floor} />
          <Route path="/kitchen" component={Kitchen} />
          <Route path="/waiter" component={Waiter} />
        </Switch>
      </Router>

  );
}

export default App;