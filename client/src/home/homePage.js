import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AllArticle from "./allArticle.js";
import Article from "./article.js";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ids: 0,
    };
  }
  getID(id) {
    this.setState({ ids: id });
    console.log(id);
  }
  render() {
    return (
      <div>
        <AllArticle getID={this.getID()} />
      </div>
    );
  }
  
}
{
  /* <Switch>
              {this.state.articles.map((article) => (
                <Route path={"/article/" + article._id}>
                  <Article articleId={article._id} />
                </Route>
              ))}
            </Switch> */
}

export default HomePage;
