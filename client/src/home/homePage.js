import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AllArticle from "./allArticle.js";
import Article from "./article.js";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
    };

    this.getID = this.getID.bind(this);
  }
  //bug
  getID(ids) {
    this.setState({
      id: (this.state.id = ids),
    });
    console.log(this.state.id);
  }
  render() {
    return (
      <Router>
        <div>
          <Route path="/article"  >
            <Article/>
          </Route>
          <Route path="/" exact>
            <AllArticle/>
          </Route>
        </div>
      </Router>
    );
  }
}

export default HomePage;
