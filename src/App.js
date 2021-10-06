import React, { Component } from "react";
import { HashRouter, NavLink, Route } from "react-router-dom";
import Home from "./Components/Home";
import Events from "./Components/Events";
import About from "./Components/About";
import AddEvents from "./Components/AddEvents";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "block",
      margin: 0,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      height: 50,
      backgroundColor: "rgb(31, 25, 25)",
    };
    this.showNavbar = this.showNavbar.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.showNavbar);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.showNavbar);
  }

  showNavbar() {
    let condition = window.matchMedia("(min-width: 768px)");

    if (condition.matches) {
      this.setState({
        display: this.state.display,
        margin: this.state.margin,
        display: "flex",
        justifyContent: this.state.justifyContent,
        alignItems: this.state.alignItems,
        height: this.state.height,
        backgroundColor: this.state.backgroundColor,
      });
    } else {
      this.setState({
        display: "none",
      });
    }
  }

  render() {
    let navStyle = {
      display: this.state.display,
    };
    return (
      <HashRouter>
        <div>
          <ul id="navbar" style={navStyle}>
            <li>
              <NavLink exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/addEvents">Add Events</NavLink>
            </li>
          </ul>

          <div className="sadrzaj">
            <Route exact path="/" component={Home} />
            <Route path="/events" component={Events} />
            <Route path="/about" component={About} />
            <Route path="/addEvents" component={AddEvents} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

class Hamburger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "none",
    };

    this.hideHamburger = this.hideHamburger.bind(this);
    this.showNavbar = this.showNavbar.bind(this);
  }

  showNavbar() {
    let navbar = document.getElementById("movingNavbar");
    if (navbar.style.display === "none") {
      navbar.style.display = "block";
    } else {
      navbar.style.display = "none";
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.hideHamburger);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.hideHamburger);
  }

  hideHamburger() {
    let condition = window.matchMedia("(min-width: 768px)");

    if (condition.matches) {
      this.setState({
        display: "none",
      });
    } else {
      this.setState({
        display: "block",
        color: "rgb(49, 38, 32)",
        marginRight: 10,
        fontSize: 30,
      });
    }
  }

  render() {
    return (
      <div id="hamburgerIcon" style={this.state} onClick={this.showNavbar}>
        &#9776;
      </div>
    );
  }
}

class App extends Component {
  render() {
    let movingNavbarStyle = {
      display: "none",
    };
    return (
      <div>
        <div id="headerIndex">
          
          <h1 id="naslov">
            HISTORICAL <br></br>EVENTS
          </h1>
          <div id="navWrapper">
          <HashRouter>
            <div>
              <ul id="movingNavbar" style={movingNavbarStyle}>
                <li>
                  <NavLink exact to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/events">Events</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink to="/addEvents">Add Events</NavLink>
                </li>
              </ul>
            </div>
          </HashRouter>
          <Hamburger />
          </div>
        </div>

        <Navbar />
        <footer>
          <h1 id="kontaktNaslov">Contact Us:</h1>

          <fieldset>
            <form action="#" method="POST" id="kontaktForma">
              <label htmlFor="fname">Name:</label>
              <input type="text" id="fname"></input>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email"></input>
              <textarea
                id="inputText"
                placeholder="Write your message here..."
              ></textarea>
              <button id="kontaktDugme">Send</button>
            </form>
            </fieldset>
          <p id="footerP">&#169;Pavle Gavrilovic</p>
          
        </footer>
      </div>
    );
  }
}

export default App;
