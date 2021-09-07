import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import "./index.css";
import CreateArticle from "./createArticle";
import HomePage from "./home/homePage.js";

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/api/admin_panel">
              <CreateArticle seeArticles={this.state.seeArticle} />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<Panel />, document.getElementById("root"));
