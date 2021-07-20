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
      kostils: false,
    };

    //change name
    this.change = this.change.bind(this);
    this.upda = this.upda.bind(this);

    this.articleCreate = this.articleCreate.bind(this);
    this.keychek = this.keychek.bind(this);
    this.clears = this.clears.bind(this);

    this.kostil = this.kostil.bind(this);
  }
  //change input e
  keychek(e) {
    if (e.charCode === 13) {
      this.clears();
      this.upda();
      this.renderString();
    }
  }

  articleCreate(inputLine) {
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
  //change name or function
  //change input e
  clears() {
    this.setState((state) => ({
      textCopy: (state.textCopy = ""),
    }));
  }

  //change name
  change(ev) {
    if (this.state.kostils === false) {
      this.setState((state) => ({
        textEdit: (state.textEdit = ev.target.innerHTML),
      }));
    }

    if (this.state.kostils === true) {
      ev.target.innerHTML = this.state.textEdit;
      this.setState((state) => ({
        kostils: (state.kostils = false),
      }));
    }
    // ev.target.innerHTML = "nosochki";
  }
  kostil(e) {
    this.change();
    this.setState((state) => ({
      textEdit: (state.textEdit = e.target.value),
      kostils: (state.kostils = true),
    }));
  }
  // ↑ Delet kostil and create normal move

  //change name
  upda() {
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

    // console.log(texts);

    while (count--) {
      pargraph.push(
        <p key={count} onClick={this.change}>
          {texts[count + 1]}
        </p>
      );
    }

    // console.log(pargraph);

    return pargraph.reverse();
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
                <input id="category" onChange={this.articleCreate} />
              </li>
              <li>
                Enter title:
                <br />
                <input id="title" onChange={this.articleCreate} />
              </li>
              <li>
                Enter text:
                <br />
                <textarea
                  id="text"
                  onChange={this.articleCreate}
                  onKeyPress={this.keychek}
                  value={this.state.text}
                />
              </li>
              <li>
                <textarea value={this.state.textEdit} onChange={this.kostil} />
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
