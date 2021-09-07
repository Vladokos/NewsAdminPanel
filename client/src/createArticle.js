import React from "react";
import axios from "axios";

class CreateArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: "",
      title: "",
      text: "",
      styleText: "",
      intermediateText: "",
      id: "",
      link: "",
      articles: [],
      textEditing: false,
      image: null,
      oldImage: null,
    };

    this.informationAboutArticle = this.informationAboutArticle.bind(this);
    this.openAllArticles = this.openAllArticles.bind(this);
    this.addLineBreak = this.addLineBreak.bind(this);
    this.addStyleText = this.addStyleText.bind(this);

    this.sendArticle = this.sendArticle.bind(this);
    this.sendImage = this.sendImage.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.getArticles = this.getArticles.bind(this);
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

  addLineBreak(key) {
    if (key.charCode === 13) {
      let state = this.state.text;
      let start = key.target.selectionStart;
      let end = key.target.selectionEnd;

      this.setState({
        text: state.substring(0, start) + "<br/><br/>" + state.substring(end),
      });
    }
  }

  addStyleText(style) {
    if (style.charCode === 13 && !style.shiftKey) {
      switch (style.target.id) {
        case "bold":
          this.setState((state) => ({
            styleText:
              " <b>" + (state.styleText += style.target.value) + "</b>",
          }));
          this.setState((state) => ({
            text: (state.text += state.styleText),
            styleText: "",
          }));
          break;
        case "italic":
          this.setState((state) => ({
            styleText:
              " <em>" + (state.styleText += style.target.value) + "</em>",
          }));
          this.setState((state) => ({
            text: (state.text += state.styleText),
            styleText: "",
          }));
          break;
        case "link":
          this.setState((state) => ({
            styleText:
              " <a href=" +
              state.link +
              ">" +
              (state.styleText += style.target.value) +
              "</a>",
          }));
          this.setState((state) => ({
            text: (state.text += state.styleText),
            styleText: "",
            link: "",
          }));
          break;
        case "list":
          this.setState((state) => ({
            styleText:
              " <ul>" + (state.styleText += state.intermediateText) + "</ul>",
          }));
          this.setState((state) => ({
            text: (state.text += state.styleText),
            styleText: "",
          }));
          break;
        default:
          break;
      }
    } else if (style.charCode === 13 && style.shiftKey) {
      switch (style.target.id) {
        case "list":
          this.setState({
            styleText: (this.state.styleText +=
              "<li>" + style.target.value + "</li>"),
            intermediateText: (this.state.intermediateText +=
              this.state.styleText),
          });

          this.setState({
            styleText: "",
          });

          style.target.value = "";

          break;
        default:
          break;
      }
    }
  }

  //Send article on db
  async sendArticle() {
    if (this.state.id === null || this.state.id === "") {
      await axios({
        config: {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
        method: "POST",
        url: "/article",
        data: {
          category: this.state.categories,
          titles: this.state.title,
          texts: this.state.text,
        },
      }).then(async (response) => {
        if (response.statusText === "OK") {
          const document = await response.data;
          this.setState((state) => ({
            id: (state.id = document._id),
          }));
          this.sendImage();
          this.getArticles();
        }
      });
    } else {
      await axios({
        config: {
          headers: {
            "Content-Type": "application/json",
          },
        },
        method: "PUT",
        url: "/article",
        data: {
          id: this.state.id,
          titles: this.state.title,
          category: this.state.categories,
          texts: this.state.text,
        },
      }).then(async (response) => {
        if (response.statusText === "OK") {
          this.sendImage();
          this.getArticles();
        }
      });
    }

    this.clearContent();
  }

  //send image in server
  async sendImage() {
    const data = new FormData();
    const image = this.state.image;
    const oldImage = this.state.oldImage;
    const id = this.state.id;

    try {
      if (this.state.oldImage === this.state.image.name) {
        data.append("image", image);
        data.append("id", id);
      } else {
        data.append("image", image);
        data.append("oldImage", oldImage);
        data.append("id", id);
      }
    } catch (Exception) {}

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
  }

  //get all article from db
  async getArticles() {
    await axios({
      config: { headers: { Accept: "application/json" } },
      method: "GET",
      url: "/article/",
    }).then(async (response) => {
      if (response.statusText === "OK") {
        const document = await response.data;
        this.setState((state) => ({
          articles: (state.articles = document),
        }));
      }
    });
  }

  //delete article on db
  async deleteArticle() {
    if (this.state.id !== null || this.state.id !== "") {
      const id = this.state.id;
      const image = this.state.image;

      await axios({
        config: { headers: { Accept: "application/json" } },
        method: "DELETE",
        url: "/article/" + id,
        data: {
          image: image,
        },
      }).then(async (response) => {
        if (response.statusText === "OK") {
          this.getArticles();
        }
      });

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
                  onKeyPress={this.addLineBreak}
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
            <ul>
              style:
              <li>
                Add bold: &lt;b&gt;
                <input id="bold" onKeyPress={this.addStyleText} />
                &lt;/b&gt;
              </li>
              <li>
                Add italic: &lt;em&gt;
                <input id="italic" onKeyPress={this.addStyleText} /> &lt;/em&gt;
              </li>
              <li>
                Add link: &lt;a href=
                <input
                  id="href"
                  onChange={(e) => {
                    this.setState((state) => ({
                      link: (state.link = e.target.value),
                    }));
                  }}
                />
                &gt; <input id="link" onKeyPress={this.addStyleText} />
                &lt;/a&gt;
              </li>
              <li>
                Add list: &lt;ul&gt; &lt;li&gt;{" "}
                <input id="list" onKeyPress={this.addStyleText} /> &lt;/li&gt;
                &lt;/ul&gt;
                <br />
                <b>
                  to add the next line in the list press shift + enter. When you
                  will be done press enter
                </b>
                <br />
                Example:
                <br />
                you wrote "asd" and press shift + enter after press enter and
                this will be &lt;li&gt;asd &lt;/li&gt; (1 set of the list)
              </li>
            </ul>
          </fieldset>
        </form>
        {/* Change */}
        <div>
          <div>Category:{this.state.categories}</div>
          <div>Title:{this.state.title}</div>
          <div
            dangerouslySetInnerHTML={{ __html: "Text: " + this.state.text }}
          ></div>
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
                  <img src={article.image} alt="" />
                  <br />
                  {article.category}
                  <br />
                  {article.title}
                  <br />
                  <p dangerouslySetInnerHTML={{ __html: article.text }}></p>
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
export default CreateArticle;
