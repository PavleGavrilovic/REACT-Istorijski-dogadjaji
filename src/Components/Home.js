import React, { Component } from "react";

class Featured extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/PavleGavrilovic/REACT-Istorijski-dogadjaji/master/src/data/data.json"
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          items: result,
        });
      });
  }

  render() {
    const { items } = this.state;

    let randomNum = Math.round(Math.random() * 30);

    let result = items.filter((item) => item.id === randomNum);

    return (
      <div id="featuredWrapperDesktop">
        {result.map((item) => (
          <div key={item.id} id="featuredWrapper">
            <h2>
              <u>Featured Article</u>
            </h2>
            <h3 className="headerEvents">{item.title}</h3>
            <p className="paragraf">{item.text}</p>
          </div>
        ))}
      </div>
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };

    this.displaySearched = this.displaySearched.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/PavleGavrilovic/REACT-Istorijski-dogadjaji/master/src/data/data.json"
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          items: result,
        });
      });
  }

  displaySearched() {
    const { items } = this.state;
    let input = document.getElementById("search");

    let inputValue = input.value;

    let newArray = items.filter(function (elem) {
      if (
        elem.title.toLowerCase().indexOf(inputValue.trim().toLowerCase()) !== -1
      )
        return elem;
    });
    let text = "";
    newArray.forEach((element) => {
      text += `
            <div class="eventArticle" data-id="${element.id}" data-year="${element.year}">
                <h3 class="headerEvents">${element.title}</h3>
                <img src="${element.image}" alt="img1" class="randomSlika">
                <p class="paragraf">${element.text}</p>
            </div>
                `;
    });
    document.getElementById("searchResult").innerHTML = text;
  }

  render() {
    return (
      <div id="searchWrapper">
        <h1>Search Events</h1>
        <input
          type="text"
          name="search"
          id="search"
          onKeyDown={this.displaySearched}
        ></input>
        <div id="searchResult"></div>
      </div>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  render() {
    return (
      <div>
        <Featured />
        <Search />
      </div>
    );
  }
}

export default Home;
