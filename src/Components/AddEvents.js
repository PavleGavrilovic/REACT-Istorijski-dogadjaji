import React, { Component } from "react";




class AddEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: [],
        };
        this.addEvent=this.addEvent.bind(this);
        
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

    

      addEvent(){
        const { items } = this.state;
       

        let name=document.getElementById("ename").value;
        let year=document.getElementById("eyear").value;
        let date=document.getElementById("edate").value;
        let url=document.getElementById("eurl").value;
        let text=document.getElementById("inputEventText").value;
        

        if(date===""){
            date="-"
        }
        
        
        let eventObj={
            id:items.length+1,
            title:name,
            year:year,
            date:date,
            image:url,
            text:text
        }

        if(name==="" || year==="" || url==="" || text===""){
          alert("All fields must be filled (except the DATE field)")
        }else{

        

        let updatedItems=items.push(eventObj);

        this.setState({
            items:updatedItems
        })

       

        document.getElementById('eventPreview').innerHTML=`
        <h1>Event Preview</h1>
        <div class="eventArticle">
              <h3 class="headerEvents">${eventObj.title}</h3>
              <img src=${eventObj.image} alt="img" class="randomSlika"></img>
              <p class="paragraf">${eventObj.text}</p>
            </div>
        `;
        

        let storageVal=this.state.items;
        localStorage.setItem("reactArr",JSON.stringify(storageVal));

        this.setState({
          items:JSON.parse(localStorage.getItem(("reactArr")))
        })
      }
    }
      

      

  render() {
    
    
    
    return (
      <div>
          <div id="importantWrapper">
            <h2>Important Notes</h2>
          <ul id="notesList">
            <li>
              If the event happened before the birth of Christ (BC), you should
              write it this way:
            </li>
            <ul>
              <li>Event Name: Battle of Pharsalus (48 BC)</li>
              <li>Year: -48</li>
              <li>Date: Aug 09</li>
            </ul>
            <li>
              If the event lasted more than one year, you should put only the
              starting year in the Year input, while the full duration should be
              put in the Event Name
            </li>
            <li>If the event lasted more than one day, you should put only the starting date in the Date input</li>
            <li>If the date of the event is unknown, leave the Date input empty</li>
          </ul>
        </div>
        <div id="eventAddForm">
          <h1 id="eventAddNaslov">Add Event:</h1>

          
            <div  id="eventForm">
              <label htmlFor="ename">Event Name:</label>
              <input
                type="text"
                id="ename"
                placeholder="Battle of Naseby (1645)"
              ></input>
              <label htmlFor="eyear">Year:</label>
              <input type="number" id="eyear" placeholder="1645" required></input>
              <label htmlFor="edate">Date:</label>
              <input type="text" id="edate" placeholder="Jun 14"></input>
              <label htmlFor="eurl">Image URL:</label>
              <input type="url" id="eurl" placeholder="https://en.wikipedia.org/wiki/Battle_of_Naseby#/media/File:Battle_of_Naseby.jpg" required></input>
              <textarea
                id="inputEventText"
                placeholder="Write the text of the event here"
              ></textarea>
              <button id="eventAddBtn" onClick={this.addEvent}>Add Event</button>
            </div>
         
        </div>

        <div id="eventPreview">
        
        </div>
        
      </div>
    );
  }
}

export default AddEvents;
