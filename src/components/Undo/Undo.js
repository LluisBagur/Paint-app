import React, { Component } from "react";
import './Undo.css'


class Redo extends Component {
  render() {
    return (
      <div className="undo-container-button">
        <button className="undo-canvas-button" onClick={() => this.props.handleUndo()}>
        <i className="fas fa-undo-alt"></i>
        </button>
      </div>
    );
  }
}

export default Redo;
