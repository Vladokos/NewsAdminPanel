import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateArticle from "./home/createArticle";
import HomePage from "./home/homePage";



export default class Panel extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/">
              <CreateArticle/>
            </Route>
            <Route path="/api/admin_panel">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
