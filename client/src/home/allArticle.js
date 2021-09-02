import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Article from "./article.js";


class AllArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    axios({
      config: { headers: { Accept: "application/json" } },
      method: "GET",
      url: "/article/",
    }).then(async (response) => {
      if (response.statusText === "OK") {
        const document = await response.data;
        this.setState((state) => ({
          articles: (state.articles = document),
        }));
        console.log(this.state.articles);
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <div>
          <h2>Articles:</h2>
          <Router>
            <div className="articles_roster">
              {this.state.articles.map((article) => (
                <Link to={"/article/" + article._id}>
                  <div key={article._id + " fragment"}>
                    <picture>
                      <img src={article.image} />
                    </picture>
                    <br />
                    <br />
                    <span className="title_articles">{article.title}</span>
                    <br />
                    <br />
                    <span className="category_articles">
                      {article.category}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Router>
        </div>
      </div>
    );
  }
}


export default AllArticle;
