import React from "react";
import axios from "axios";

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articleId: 0,
      article: [],
    };
  }

  componentDidMount() {
    let str = window.location.href;
    str = str.substr(30);
    this.setState({
      articleId: (this.state.articleId = str),
    });
    console.log(this.state.articleId);

    if (this.state.articleId !== 0) {
      axios({
        config: { headers: { Accept: "application/json" } },
        method: "GET",
        url: "/article/" + this.state.articleId,
      }).then(async (response) => {
        if (response.statusText === "OK") {
          const document = await response.data;
          this.setState((state) => ({
            article: (state.article = document),
          }));
          console.log(this.state.article);
        }
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          <span className="title_article">{this.state.article.title}</span>
          <br />
          <br />
          <span className="category_article">
            {this.state.article.category}
          </span>
          <br />
          <br />
          <div className="article_text">
            <p
              dangerouslySetInnerHTML={{ __html: this.state.article.text }}
            ></p>
          </div>
        </div>
      </div>
    );
  }
}
export default Article;
