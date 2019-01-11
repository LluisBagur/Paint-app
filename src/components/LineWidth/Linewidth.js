import React, { Component } from "react";
import "./Linewidth.css";

class LineWidth extends Component {
  state = {
    LineWidth: [4, 8, 16, 24],
    selectedLine: null
  };

  componentWillReceiveProps(props) {
    if (typeof props.line !== "number")
      throw Error(`${props.line} is not a number`);
    this.setState({ selectedLine: props.line });
  }

  render() {
    return (
      <div className="width-container-buttons">
        {this.state.LineWidth.map((LineWidth, index) => {
          if (this.state.selectedLine === LineWidth) {
            return (
              <div className="selected_line" key={index}>
               
                <button
                  style={{ height: LineWidth * 2, width: LineWidth * 2 }}
                  className="lineWidth-canvas-button"
                  onClick={() => this.props.handleLineWidthChange(LineWidth)}
                >
                  {" "}
                  {LineWidth}px{" "}
                </button>{" "}
              </div>
            );
          } else {
            return (
              <button
                style={{ height: LineWidth * 2, width: LineWidth * 2 }}
                className="lineWidth-canvas-button"
                key={index}
                onClick={() => this.props.handleLineWidthChange(LineWidth)}
              />
            );
          }
        })}
      </div>
    );
  }
}

export default LineWidth;
