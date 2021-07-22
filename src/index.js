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
        </div>
        <div>
          <ul>
            <li>
              <button>Create article</button>
            </li>
            <li>
              <button>See articles</button>
            </li>
            <li>
              <button>Change article</button>
            </li>
          </ul>
        </div>
        <div className="panelCreateAritcle">
          <div>
            <h2>Crate panel</h2>
          </div>
          <div>
            <ul>
              <li>
                <button>Publish article</button>
              </li>
              <li>
                <button>Clear</button>
              </li>
              <li>
                <button>Bold</button>
              </li>
              <li>
                <button>Italics</button>
              </li>
            </ul>
          </div>
        </div>
        <Article />
      </div>
    );
  }
}

let texts = {};
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
    if (button.charCode === 13) {
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

    while (count--) {
      pargraph.push(
        <p
          key={count}
          onClick={this.getInformationAboutParagraph}
          onMouseDown={this.keyChekOnEditParagraph}
          id={count + 1}
        >
          {texts[count + 1]}
        </p>
      );
    }

    return pargraph.reverse();
  }

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
  keyChekOnEditParagraph(button){
    if (button.charCode === 13){
      this.setState({
        textEditIsOpen: !this.state.textEditIsOpen,
      });
    }else if (button.type === "mousedown"){
      this.setState({
        textEditIsOpen: true,
      });
    }
  }

  render() {
    return (
      <div>
        <form>
          <fieldset>
            <legend>Create an article</legend>
            <ul>
              <li>
                Enter category:
                <br />
                <input id="category" onChange={this.informationAboutArticle} />
              </li>
              <li>
                Enter title:
                <br />
                <input id="title" onChange={this.informationAboutArticle} />
              </li>
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
              <li className={this.state.textEditIsOpen ? "textEditOpen": "hidden"}>
                <textarea 
                  value={this.state.textEdit}
                  onChange={this.changeParagraph}
                  onKeyPress={this.keyChekOnEditParagraph}
                />
              </li>
              <li>
                Load image:
                <br />
                <input type="file" />
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
      </div>
    );
  }
}

ReactDOM.render(<Panel />, document.getElementById("root"));
