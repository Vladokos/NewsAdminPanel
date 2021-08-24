import React from "react";
import ReactDOM from "react-dom";
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
    };

    this.informationAboutArticle = this.informationAboutArticle.bind(this);
    this.sendText = this.sendText.bind(this);
    this.getText = this.getText.bind(this);
    this.clearContent = this.clearContent.bind(this);
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

  clearContent() {
    this.setState((state) => ({
      categories: (state.categories = ""),
      title: (state.title = ""),
      text: (state.text = ""),
      id: (state.id = ""),
    }));
  }

  //Send text on server
  sendText() {
    if (this.state.id === null || this.state.id === 0) {
      fetch("/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: this.state.categories,
          titles: this.state.title,
          texts: this.state.text,
        }),
      });
    } else {
      fetch("/article", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.state.id,
          category: this.state.categories,
          titles: this.state.title,
          texts: this.state.text,
        }),
      });
    }
    this.clearContent();
  }
  //get text from server
  async getText() {
    const response = await fetch("/article/6124e969fe7f942128279596", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (response.ok === true) {
      const document = await response.json();
      this.setState((state) => ({
        categories: (state.categories = document.category),
        title: (state.title = document.title),
        text: (state.text = document.text),
        id: (state.id = document._id),
      }));
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
                Enter category:
                <br />
                <input
                  id="category"
                  onChange={this.informationAboutArticle}
                  value={this.state.categories}
                />
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
                Enter text:
                <br />
                <textarea
                  id="text"
                  onChange={this.informationAboutArticle}
                  value={this.state.text}
                />
                <button type="button" onClick={this.sendText}>
                  send
                </button>
              </li>
            </ul>
          </fieldset>
        </form>
        <div>
          <div>Category:{this.state.categories}</div>
          <div>Title:{this.state.title}</div>
          <div onClick={this.getText}>Text:</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Panel />, document.getElementById("root"));
