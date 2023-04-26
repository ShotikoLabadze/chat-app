import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "firebase/app";
import Login from "./components/Login";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <Router>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
