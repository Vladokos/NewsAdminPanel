import React from "react";
import axios from "axios";

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articleId: props.articleId,
      article: [],
    };

    this.getArticle = this.getArticle.bind(this);
  }

  getArticle() {
    console.log(this.state.articleId);
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
    console.log("its work");
  }

  render() {
    return (
      <div>
        <button onClick={this.getArticle}>click me</button>
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
        {this.state.articleId}
      </div>
    );
  }
}
export default Article;
