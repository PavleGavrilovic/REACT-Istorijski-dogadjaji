import React, { Component } from "react";
import image from "../assets/images/aboutPicture.png";

class About extends Component {
  render() {
    return (
      <div>
        <div id="wrapperAbout">
          <h1>About This Website</h1>
          <p>
            This is a website created with the aim of being an internet
            database/library of historical events of all eras, countries,
            regions and continents. The historical events range from events
            massively important for humanity to events of lesser consequence.
          </p>
          <h3>Here you can:</h3>
          <ul>
            <li>view and search historical events</li>
            <li>create and add your own historical events</li>
          </ul>

          <img src={image} alt="aboutImage" id="slikaAbout"></img>
        </div>
      </div>
    );
  }
}

export default About;
