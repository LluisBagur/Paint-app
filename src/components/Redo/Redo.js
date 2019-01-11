import React, { Component } from "react";
import './Redo.css'

class Redo extends Component {
  render() {
    return (
      <div className="redo-container-button">
        <button className="redo-canvas-button" onClick={() => this.props.handleRedo()}>
        <i className="fas fa-redo"></i>
        </button>
      </div>
    );
  }
}

export default Redo;
