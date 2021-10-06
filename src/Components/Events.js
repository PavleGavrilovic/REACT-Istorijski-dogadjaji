import React, { Component } from "react";
import crestImage from "../assets/images/eventCrest.png";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };

    this.displaySearched = this.displaySearched.bind(this);
  }

  componentDidMount() {
    if(!localStorage.getItem("reactArr")){
    fetch(
      "https://raw.githubusercontent.com/PavleGavrilovic/REACT-Istorijski-dogadjaji/master/src/data/data.json"
    )
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("data",JSON.stringify(result))
        this.setState({
          items: JSON.parse(localStorage.getItem("data")),
        });
        
      });
    }else{
      this.setState({
        items: JSON.parse(localStorage.getItem("reactArr")),
      })
    }
     
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
    document.getElementById("eventWrapper").innerHTML = text;
    
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

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this.sortFromOldest=this.sortFromOldest.bind(this);
    this.sortFromNewest=this.sortFromNewest.bind(this);
  }

  componentDidMount() {
    if(!localStorage.getItem("reactArr")){
      fetch(
        "https://raw.githubusercontent.com/PavleGavrilovic/REACT-Istorijski-dogadjaji/master/src/data/data.json"
      )
        .then((res) => res.json())
        .then((result) => {
          localStorage.setItem("data",JSON.stringify(result))
          this.setState({
            items: JSON.parse(localStorage.getItem("data")),
          });
          
        });
      }else{
        this.setState({
          items: JSON.parse(localStorage.getItem("reactArr")),
        })
      }
  }

  

sortFromOldest() {
  const { items } = this.state;
  
  let sortedArray = items.sort(function (a, b) {
    return a.year - b.year;
  });

  let actualArray = [];

  for (let i = 0; i < sortedArray.length; i++) {
    actualArray.push(`
      <div class="eventArticle" data-id="${sortedArray[i].id}" data-year="${sortedArray[i].year}">
        <h3 class="headerEvents">${sortedArray[i].title}</h3>
        <img src="${sortedArray[i].image}" alt="img1" class="randomSlika">
        <p class="paragraf shorten">${sortedArray[i].text}</p>
      </div>
    `
    );
  }
  
  document.getElementById("eventWrapper").innerHTML = actualArray.join(" ");
}

sortFromNewest() {
  const { items } = this.state;
  
  let sortedArray = items.sort(function (a, b) {
    return b.year - a.year;
  });

  let actualArray = [];

  for (let i = 0; i < sortedArray.length; i++) {
    actualArray.push(`
      <div class="eventArticle" data-id="${sortedArray[i].id}" data-year="${sortedArray[i].year}">
        <h3 class="headerEvents">${sortedArray[i].title}</h3>
        <img src="${sortedArray[i].image}" alt="img1" class="randomSlika">
        <p class="paragraf shorten">${sortedArray[i].text}</p>
      </div>
    `
    );
  }
  
  document.getElementById("eventWrapper").innerHTML = actualArray.join(" ");
}

  

  render() {
    const { items } = this.state;

    return (
      <div>
        <h1 id="eventPageHeader">Historical Events</h1>
        <div id="sortWrapper">
        <button id="btnSortO" className="btnLib" onClick={this.sortFromOldest}>Sort from Oldest</button>
        <img src={crestImage} alt="crest" className="eventCrest"></img>
          <button id="btnSortN" className="btnLib" onClick={this.sortFromNewest}>Sort from Newest</button>
        </div>

        
        
        <Search />
        
        <div id="eventWrapper">
          {items.map((item) => (
            <div key={item.id} className="eventArticle">
              <h3 className="headerEvents">{item.title}</h3>
              <img src={item.image} alt="img" className="randomSlika"></img>
              <p className="paragraf">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Events;
