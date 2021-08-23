import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    fetch("/").then();
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
      textEditIsOpen: false,
    };

    this.informationAboutArticle = this.informationAboutArticle.bind(this);
    this.sendText = this.sendText.bind(this);
    this.getText = this.getText.bind(this);
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
  //Send text on server
  sendText() {
    fetch("/text", {
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
  }
  //get text from server
  async getText() {
    const response = await fetch("/text", {
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
      }));
    }
  }

  render() {
    return (
      <div>
        <div>
          <h2>Create panel</h2>
        </div>
        <div>
          <ul>
            <li>
              <button>Publish article</button>
            </li>
            <li>
              <button onClick={this.clearAll} type="button">
                Clear
              </button>
            </li>
          </ul>
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

              <ul>
                <li>
                  Bold:
                  <button id="bold" type="button" onClick={this.addStyleFont}>
                    add bold
                  </button>
                </li>
                <li>
                  Italic:
                  <button id="italica" type="button">
                    add Italic
                  </button>
                </li>
                <li>
                  Link:
                  <button id="link" type="button">
                    add Link
                  </button>
                </li>
              </ul>
              <li>
                Enter text:
                <br />
                <textarea
                  id="text"
                  onChange={this.informationAboutArticle}
                  value={this.state.text}
                />
                <button type="submit" onClick={this.sendText}>
                  send
                </button>
              </li>
              <li
                className={
                  this.state.textEditIsOpen ? "textEditOpen" : "hidden"
                }
              >
                <textarea
                  value={this.state.textEdit}
                  onChange={this.changeParagraph}
                  onKeyPress={this.keyChekOnEditParagraph}
                />
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
