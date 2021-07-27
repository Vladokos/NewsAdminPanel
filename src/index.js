import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  render() {
    return (
      <div>
        <div>
          <h1>Admin Panel</h1>
        </div>
        <div className="panelCreateAritcle">
          <Article seeArticles={this.state.seeArticle} />
        </div>
      </div>
    );
  }
}

let texts = {};
let state = false;
class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: "",
      title: "",
      text: "",
      textCopy: "",
      count: 0,
      textEdit: "",
      numOfstring: 0,
      textEditIsOpen: false,
    };

    this.getInformationAboutParagraph =
      this.getInformationAboutParagraph.bind(this);
    this.addNewParagraph = this.addNewParagraph.bind(this);
    this.changeParagraph = this.changeParagraph.bind(this);
    this.informationAboutArticle = this.informationAboutArticle.bind(this);
    this.keyChekOnCreatParagraph = this.keyChekOnCreatParagraph.bind(this);
    this.keyChekOnEditParagraph = this.keyChekOnEditParagraph.bind(this);
    this.addStyleFont = this.addStyleFont.bind(this);
    this.clearAll = this.clearAll.bind(this);
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

  keyChekOnCreatParagraph(button) {
    if (button.charCode === 13 && this.state.text.trim() !== "") {
      this.addNewParagraph();
      this.renderString();
    }
  }

  addNewParagraph() {
    this.setState((state) => ({
      count: (state.count += 1),
      textCopy: (state.textCopy = this.state.text),
      text: (state.text = ""),
    }));
  }

  renderString() {
    let pargraph = [];

    let count = this.state.count;
    texts[count] = this.state.textCopy;

    function convertingString() {
      return { __html: texts[count + 1] };
    }

    while (count--) {
      pargraph.push(
        <p
          key={count}
          onClick={this.getInformationAboutParagraph}
          onMouseDown={this.keyChekOnEditParagraph}
          id={count + 1}
          dangerouslySetInnerHTML={convertingString()}
        ></p>
      );
    }

    return pargraph.reverse();
  }

  //edit article

  getInformationAboutParagraph(paragraph) {
    this.setState((state) => ({
      numOfstring: (state.numOfstring = paragraph.target.id),
      textEdit: (state.textEdit = paragraph.target.innerHTML),
    }));
  }

  changeParagraph(typedText) {
    if (this.state.textCopy === this.state.textEdit) {
      this.setState((state) => ({
        textEdit: (state.textEdit = typedText.target.value),
        textCopy: (state.textCopy = this.state.textEdit),
      }));
    } else {
      this.setState({
        textEdit: (this.state.textEdit = typedText.target.value),
      });
    }
    texts[this.state.numOfstring] = this.state.textEdit;
  }

  keyChekOnEditParagraph(button) {
    if (button.charCode === 13) {
      this.setState({
        textEditIsOpen: !this.state.textEditIsOpen,
      });
    } else if (button.type === "mousedown") {
      this.setState({
        textEditIsOpen: true,
      });
    }
  }

  //edit article

  addStyleFont(button) {
    switch (button.target.id) {
      case "bold":
        this.setState((state) => ({
          text: (state.text += "<b></b>"),
        }));
        break;
      case "italica":
        this.setState((state) => ({
          text: (state.text += "<i></i>"),
        }));
        break;
      case "link":
        this.setState((state) => ({
          text: (state.text += "<a></a>"),
        }));
        break;
      default:
        break;
    }
  }
  publishArticle() {
    let title = this.state.title;
    let category = this.state.categories;
    let materials = this.renderString();
    return (
      <div>
        <div onClick={state === false? state = true: state = false} className={state === false? "hidden": "articleVisb"}>
          <h3>{title}</h3>
          <p>
            <em>{category}</em>
          </p>
          <div>{materials}</div>
        </div>
      </div>
    );
  }
  clearAll() {
    this.setState((state) => ({
      text: (state.text = ""),
      textCopy: (state.textCopy = ""),
      categories: (state.categories = ""),
      title: (state.title = ""),
      textEdit: (state.textEdit = ""),
      count: (state.count = 0),
      numOfstring: (state.numOfstring = 0),
    }));
    texts = {};
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
                  <button
                    id="italica"
                    type="button"
                    onClick={this.addStyleFont}
                  >
                    add Italic
                  </button>
                </li>
                <li>
                  Link:
                  <button id="link" type="button" onClick={this.addStyleFont}>
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
                  onKeyPress={this.keyChekOnCreatParagraph}
                  value={this.state.text}
                />
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
          <div className="text">
            Text:
            {this.renderString()}
          </div>
        </div>
        <div>
          {this.publishArticle()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Panel />, document.getElementById("root"));
