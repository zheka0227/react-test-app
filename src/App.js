import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
}
  componentWillMount(){
    const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://api.tfl.gov.uk/Occupancy/CarPark?app_key=3f141a0065325b28b67b0888409be826&app_id=d73e2064', true); 
            xhr.send();

            xhr.onreadystatechange = () => {
              if (xhr.readyState !== 4) {
                return false
              }

              if (xhr.status !== 200) {
                console.log(xhr.status + ': ' + xhr.statusText)
              } else {
                this.setState({
                  data: JSON.parse(xhr.responseText),
                })
              }
            }
  }
  render() {
    const tableStyle = {
      fontFamily: "Lucida Sans Unicode",
      textAlign: "left",
      borderCollapse: "separate",
      borderSpacing: "5px",
      background: "#ECE9E0",
      color: "#656665",
      border: "16px solid #ECE9E0",
      borderRadius: "20px"
    }
    const th = {
      fontSize: "18px",
      padding: "10px"
    }
    const td = {
      background: "#F5D7BF",
      padding: "10px"
    }
    const caption = {
      fontSize: "18px",
      fontWeight: "bold"
    }

    var arr = [];
    for(var item of this.state.data){
      var name = item.name;
      var bays = item.bays;
      for(var bay of bays)
        if(bay.bayType=="Pay and Display Parking"){
          var bayCount = bay.bayCount;
          var free = bay.free;
          var row = <tr><td style={td}>{name}</td><td style={td}>{bayCount}</td><td style={td}>{free}</td></tr>;
          arr.push(row);
        } 
    }
    
    return (
      <table className="tableClass" style={tableStyle}>
      <caption style={caption}>Parking lots of type "Pay and Display Parking"</caption>
      <thead>
        <tr>
            <th style={th}>Name of carpark</th>
            <th style={th}>Count of all places</th>
            <th style={th}>Count of free places</th>
        </tr>
      </thead>
      <tbody>
        {arr}
      </tbody>
    </table>
    );
  }
}

export default App;
