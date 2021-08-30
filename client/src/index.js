import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        <div>
          <h1>Admin Panel</h1>
          <button>open Panel</button>
        </div>
        <div className="panelCreateAritcle">
          <Article seeArticles={this.state.seeArticle} />
        </div>
      </div>
    );
  }
}

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: "",
      title: "",
      text: "",
      id: "",
      articles: [],
      textEditing: false,
      image: null,
      oldImage: null,
    };

    this.informationAboutArticle = this.informationAboutArticle.bind(this);
    this.sendArticle = this.sendArticle.bind(this);
    this.sendImage = this.sendImage.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.openAllArticles = this.openAllArticles.bind(this);
    this.clearContent = this.clearContent.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  informationAboutArticle(inputLine) {
    switch (inputLine.target.id) {
      case "category":
        this.setState({
          categories: inputLine.target.value,
        });
        break;
      case "title":
        this.setState({
          title: inputLine.target.value,
        });
        break;
      case "text":
        this.setState({
          text: inputLine.target.value,
        });
        break;
      default:
        break;
    }
  }

  openAllArticles() {
    this.setState((state) => ({
      textEditing: !state.textEditing,
    }));
  }

  clearContent() {
    this.setState((state) => ({
      id: (state.id = ""),
      title: (state.title = ""),
      categories: (state.categories = ""),
      text: (state.text = ""),
    }));
  }

  //Send article on db
  async sendArticle() {
    if (this.state.id === null || this.state.id === "") {
      const response = await fetch("/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          category: this.state.categories,
          titles: this.state.title,
          texts: this.state.text,
        }),
      });
      if (response.ok === true) {
        const document = await response.json();
        this.setState((state) => ({
          id: (state.id = document._id),
        }));
        this.sendImage();
        this.getArticles();
      }
    } else {
      const response = await fetch("/article", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          id: this.state.id,
          titles: this.state.title,
          category: this.state.categories,
          texts: this.state.text,
        }),
      });
      if (response.ok === true) {
        this.sendImage();
        this.getArticles();
      }
    }
    this.clearContent();
  }

  //send image in server
  async sendImage() {
    const data = new FormData();
    const image = this.state.image;
    const oldImage = this.state.oldImage;
    const id = this.state.id;

    if (this.state.oldImage === this.state.image.name) {
      data.append("image", image);
      data.append("id", id);
    } else {
      data.append("image", image);
      data.append("oldImage", oldImage);
      data.append("id", id);
    }

    await axios({
      config: { headers: { "Content-Type": "multipart/form-data" } },
      method: "PUT",
      url: "/image",
      data: data,
    }).then(async (response) => {
      if (response.statusText === "OK") {
        this.setState({
          id: null,
        });
        this.getArticles();
      }
    });
  }

  //get one article from db
  async getArticle(e) {
    const id = e.target.value;
    // const response = await fetch("/article/" + id, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //   },
    // });
    await axios({
      config: { headers: { Accept: "application/json" } },
      method: "GET",
      url: "/article/" + id,
    }).then(async (response) => {
      if (response.statusText === "OK") {
        const document = await response.data;
        this.setState((state) => ({
          id: (state.id = document._id),
          title: (state.title = document.title),
          categories: (state.categories = document.category),
          text: (state.text = document.text),
          image: (state.image = document.image),
          oldImage: (state.oldImage = document.image),
          textEditing: (state.textEditing = false),
        }));
      }
    });
    // if (response.ok === true) {
    //   const document = await response.json();
    //   this.setState((state) => ({
    //     categories: (state.categories = document.category),
    //     title: (state.title = document.title),
    //     text: (state.text = document.text),
    //     id: (state.id = document._id),
    //     textEditing: (state.textEditing = false),
    //   }));
    // }
  }

  //get all article from db
  async getArticles() {
    const response = await fetch("/article/", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (response.ok === true) {
      const document = await response.json();
      this.setState((state) => ({
        articles: (state.articles = document),
      }));
    }
  }

  //delete article on db
  async deleteArticle() {
    if (this.state.id !== null || this.state.id !== "") {
      const id = this.state.id;
      const image = this.state.image;
      console.log(image);
      const response = await fetch("/article/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          image: image,
        }),
      });
      if (response.ok === true) {
        this.getArticles();
      }
      this.clearContent();
    }
  }

  render() {
    return (
      <div>
        <div>
          <h2>Create panel</h2>
        </div>
        <form>
          <fieldset>
            <legend>Create an article</legend>
            <ul>
              <li>
                Add preview image: <br />
                <input
                  type="file"
                  onChange={(e) =>
                    this.setState((state) => ({
                      image: (state.image = e.target.files[0]),
                    }))
                  }
                />
                <br />
              </li>
              <li>
                Enter title:
                <br />
                <input
                  id="title"
                  onChange={this.informationAboutArticle}
                  value={this.state.title}
                />
              </li>
              <li>
                Enter category:
                <br />
                <input
                  id="category"
                  onChange={this.informationAboutArticle}
                  value={this.state.categories}
                />
              </li>
              <li>
                Enter text:
                <br />
                <textarea
                  id="text"
                  onChange={this.informationAboutArticle}
                  value={this.state.text}
                />
              </li>
              <button type="button" onClick={this.sendArticle}>
                Send
              </button>
              <button
                type="button"
                onClick={() => {
                  this.getArticles();
                  this.openAllArticles();
                }}
              >
                Edit
              </button>
              <button type="button" onClick={this.deleteArticle}>
                Delete
              </button>
            </ul>
          </fieldset>
        </form>
        {/* Change */}
        <div>
          <div>Category:{this.state.categories}</div>
          <div>Title:{this.state.title}</div>
        </div>
        {/* Change */}
        <div
          className={this.state.textEditing === false ? "hidden" : "visible"}
        >
          All articles:
          <ul className="articles_list">
            {this.state.articles.map((article) => (
              <React.Fragment key={article._id + " fragment"}>
                <li key={article._id} className="articles">
                  <img src={article.image} alt="cart" />
                  <br />
                  {article.category}
                  <br />
                  {article.title}
                </li>
                <button
                  key={article._id + " button"}
                  className="article_select"
                  type="button"
                  onClick={this.getArticle}
                  value={article._id}
                >
                  select
                </button>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Panel />, document.getElementById("root"));
