import React, { Component } from "react"
import LineWidth from "./components/LineWidth/Linewidth"
import SelectColor from "./components/SelectColor/SelectColor"
import Canvas from "./components/Canvas/Canvas"

import "./App.css"

class App extends Component {
  state = {
    width: 4,
    color: "#000000",
    error: null
  }

  /**
    * Select color picked
    * 
    * @param {Number} selectedLineWidth Selected line from SelecColor component
    * 
    * @throws {TypeError} On param is not a number
    */

  handleLineWidthChange = selectedLineWidth => {
    if (typeof selectedLineWidth !== 'number' ) throw Error(`${selectedLineWidth} is not a number`)
    
    try {
      this.setState({ width: selectedLineWidth })
    } catch (err) {
      this.setState({ error: err.message })
    }
  }

  /**
    * Select color picked
    * 
    * @param {Number} selectedColor Selected line from SelecColor component
    * 
    * @throws {TypeError} On param is not a string
    */

  handleColorChange = selectedColor => {
    if (typeof selectedColor !== 'string') throw Error(`${selectedColor} is not a string`)
    try {
      this.setState({ color: selectedColor })
    } catch (err) {
      this.setState({ error: err.message })
    }
  }

  render() {
    return (
      <div className="body">
        <div className="main-menu">
          <LineWidth
            handleLineWidthChange={this.handleLineWidthChange}
            line={this.state.width}
          />
          <SelectColor
            handleColorChange={this.handleColorChange}
            color={this.state.color}
          />
        </div>
        <div className="paint-area">
          <Canvas
            color={this.state.color}
            width={this.state.width}
          />
        </div>
      </div>
    )
  }
}
export default App

