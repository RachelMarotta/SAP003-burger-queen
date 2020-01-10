import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Floor from './pages/Floor';
import Kitchen from './pages/Kitchen';
import Server from './pages/Server'

function App() {
  return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Floor} />
          <Route path="/kitchen" component={Kitchen} />
          {/* <Route path="/server" component={Server} /> */}
        </Switch>
      </Router>

  );
}

export default App;