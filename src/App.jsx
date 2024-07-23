import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./home/Home";
import ProjectPage from "./pages/Project/Project";
import "./app.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/description" component={ProjectPage} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
