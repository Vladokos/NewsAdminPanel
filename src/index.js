import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: "",
      title: "",
      text: "",

      enterIsClicked: false,
    };

    this.articleCreate = this.articleCreate.bind(this);
    this.keychek = this.keychek.bind(this);
  }

  keychek(e){
    if (e.charCode === 13){
      console.log("bb");
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
                    <textarea id="text" onChange={this.articleCreate}  onKeyPress={this.keychek}/>
                  </li>
                  <li>
                    Load image:
                    <br />
                    <input type="file" />
                  </li>
                </ul>
              </fieldset>
            </form>
          </div>
        </div>
        <Article
          category={this.state.categories}
          title={this.state.title}
          text={this.state.text}
        />
      </div>
    );
  }
}

let texts = {

}
class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      textCopy: "",
    };

    //change name
    this.change = this.change.bind(this);
    this.upda = this.upda.bind(this);
    // this.renderString = this.renderString.bind(this);
  }
  //change name
  change(ev) {
    console.log(ev.target.innerHTML);
    ev.target.innerHTML = "nosochki";
  }

  upda() {
    this.setState((state) => ({
      count: (state.count += 1),
      textCopy: (state.textCopy = this.props.text),
    }));
  }

  renderString() {
    let pargraph = [];

    let count = this.state.count;
    texts[count] = this.state.textCopy;
    // console.log(texts);

    while (count--) {
      pargraph.push(<p key={count}>{texts[count + 1]}</p>);
    }

    // console.log(pargraph);
    return pargraph.reverse();
  }

  render() {
    return (
      <div>
        <div>Category:{this.props.category}</div>
        <div>Title:{this.props.title}</div>
        <div className="text">
          Text:
          <button onClick={this.upda}>click</button>
          {this.renderString()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Panel />, document.getElementById("root"));
