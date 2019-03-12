import React, { Component } from 'react';
import './DisplayState.css';

class DisplayState extends Component {


  render() {
    return (
      <div className="disp">
        <p> {this.props.file} </p>
      </div>
    );
  }
}
export default DisplayState;