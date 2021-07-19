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
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    switch (event.target.id) {
      case "category":
        this.setState({
          categories: event.target.value,
        });
        break;
      case "title":
        this.setState({
          title: event.target.value,
        });
        break;
      case "text":
        this.setState({
          text: event.target.value,
        });
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
                    <input id="category" onChange={this.handleChange} />
                  </li>
                  <li>
                    Enter title:
                    <br />
                    <input id="title" onChange={this.handleChange} />
                  </li>
                  <li>
                    Enter text:
                    <br />
                    <textarea id="text" onChange={this.handleChange} />
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
class Article extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>Category:{this.props.category}</div>
        <div>Title:{this.props.title}</div>
        <div>Text:{this.props.text}</div>
      </div>
    );
  }
}

ReactDOM.render(<Panel />, document.getElementById("root"));
