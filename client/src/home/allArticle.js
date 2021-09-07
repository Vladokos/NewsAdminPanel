import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


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
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <div>
          <h2>Articles:</h2>

          <div className="articles_roster">
            {this.state.articles.map((article) => (
              <Link to={"/article/" + article._id} key={article._id + "link"}>
                <div key={article._id + " fragment"}   >
                  <picture>
                    <img key={article._id + "img"}  src={article.image} alt="" />
                  </picture>
                  <br />
                  <br />
                  <span key={article._id + "title"}  className="title_articles" >{article.title}</span>
                  <br />
                  <br />
                  <span key={article._id + "category"}  className="category_articles" >{article.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default AllArticle;
