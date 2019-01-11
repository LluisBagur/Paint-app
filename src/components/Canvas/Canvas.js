import React, { Component } from "react";
import Undo from "../Undo/Undo";
import Redo from "../Redo/Redo";

import "./Canvas.css";

class Canvas extends Component {
  
  
  state = {
    error: null,
    isPainting: false,
    widthLine: 4,
    color: "#000000",
    line: [],
    storage: [],
    last: [],
    prevPosition: { offsetX: 0, offsetY: 0 },
    
  };

  componentDidMount() {
    this.canvas.width = 500;
    this.canvas.height = 500;

    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineJoin = "round"; 
    this.ctx.lineCap = "round"; 
    
  }

  componentWillReceiveProps(props){

    this.setState({ color: props.color })
    this.setState({widthLine: props.width})
  }


   /**
    * onMouseDown
    * 
    * @param {Object} nativeEvent contains the parameters and coordinates of the event MouseDown
    * 
    * @throws {TypeError} On offsetX is not a number
    * @throws {TypeError} On offsetY is not a number
    */

  onMouseDown = ({nativeEvent}) => {
    const { offsetX, offsetY } = nativeEvent; 

    if (typeof offsetX !== 'number') throw TypeError(`${offsetX} is not a number`)
    if (typeof offsetY !== 'number') throw TypeError(`${offsetY} is not a number`)

    this.setState({
      isPainting: true,
      prevPosition: { offsetX, offsetY }, 
      error: null
    });
    
  };

   /**
    * onMouseMove
    * 
    * @param {Object} nativeEvent contains the parameters and coordinates of the event MouseDown
    * 
    * @throws {TypeError} On offsetX is not a number
    * @throws {TypeError} On offsetY is not a number
    * @throws {TypeError} On this.state.widthLine is not a number
    * @throws {TypeError} On this.state.color is not a string
    */

  onMouseMove = ({ nativeEvent }) => {

    if (this.state.isPainting) {
      const { offsetX, offsetY } = nativeEvent;

      if (typeof offsetX !== 'number') throw TypeError(`${offsetX} is not a number`)
      if (typeof offsetY !== 'number') throw TypeError(`${offsetY} is not a number`)
      if (typeof this.state.widthLine !== 'number') throw TypeError(`${this.state.widthLine} is not a number`)
      if (typeof this.state.color !== 'string') throw TypeError(`${this.state.color} is not a string`)

      const offSetData = { offsetX, offsetY };

      const positionData = {
        start: { ...this.state.prevPosition },
        stop: { ...offSetData },
        strokeStyle: this.state.color,
        width: this.state.widthLine
      };
      let line = this.state.line.concat(positionData); 

      this.setState({ line, error: null });

      try {
        this.paint(
          this.state.prevPosition,
          offSetData,
          this.state.color,
          this.state.widthLine
        );

        this.setState({ error: null });
      } catch (err) {
        this.setState({ error: err.message });
      }
    }
  };

     /**
    * Paint, colled from onMouseMove, PaintAgain or HandleRedo
    * 
    * @param {Object} prevPosition contains the parameters and coordinates of the preview event MouseDown 
    * @param {Object} currPosition contains the parameters and coordinates of the current event MouseDown 
    * @param {Object} strokeStyle color from state
    * @param {Object} width line Width from state
    * 
    * @throws {TypeError} On prevPosition is not an object
    * @throws {TypeError} On currPosition is not  an object
    * @throws {TypeError} On width is not a number
    * @throws {TypeError} On strokeStyle is not a string
    */

  paint(prevPosition, currPosition, strokeStyle, width) {
    
    if (typeof strokeStyle !== 'string') throw TypeError(`${strokeStyle} is not a string`)
    if (typeof width !== 'number' ) throw TypeError(`${width} is not a number`)
    if (typeof prevPosition !== 'object' ) throw TypeError(`prevPosition is not an object`)
    if (typeof currPosition !== 'object' ) throw TypeError(`currPosition is not an object`)

    const { offsetX, offsetY } = currPosition;
    const { offsetX: x, offsetY: y } = prevPosition;

    this.ctx.beginPath(); 
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.lineWidth = width; 

    this.ctx.moveTo(x, y);

    this.ctx.lineTo(offsetX, offsetY);

    this.ctx.stroke();

    this.setState({ prevPosition: { offsetX, offsetY }, error: null });
  }

     /**
    * EndPaint
    * 
    * Handle to check if isPainting state = true, and call saveLine()
    */

  endPaint = () => {
    if (this.state.isPainting) {
      this.setState({ isPainting: false, error: null }); 

      try {
        this.setState({ error: null });

        this.saveLine(); 
      } catch (err) {
        this.setState({ error: err.message });
      }
    }
  };

     /**
    * SaveLine
    * 
    * Handle to add actual state line into the stat Storage array and before clear line and last line array.
    */

  saveLine = () => {
    let stg = this.state.storage;

    stg.push(this.state.line); 

    this.setState({ storage: stg, line: [], last: [], error: null }); 
  };

   /**
    * handleUndo
    * 
    * Handle to delete the last line from state Storage and call function paintAgain to paint the rest of lines
    */

  handleUndo = () => {
    if (this.state.storage.length > 0) {

        let stg = this.state.storage
        const lastLine = stg.pop()
        let last = this.state.last
        last.push(lastLine)

        this.setState({ last, storage: stg, error: null })

        try {
          this.clear()

          this.paintAgain(this.state.storage)

          this.setState({ error: null })
      } catch (err) {
          this.setState({ error: err.message })
      }
    }
}

/**
* clear and restart the canvas component
*/

clear() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
}

  /**
    * paintAgain called from handleUndo
    * 
    * @param {Object} lines contains the lines from state storage and re-paint all
    * 
    */

paintAgain = (lines) => {

  lines.forEach(arr => {
      arr.forEach(element => {
          try {
              this.setState({ error: null })

              this.paint(element.start, element.stop, element.strokeStyle, element.width)
          } catch (err) {
              this.setState({ error: err.message })
          }
      })
  })
}

/**
    * handleRedo
    * 
    * Handle to restore the last line to state Storage and call function paint to paint the line again
    */

handleRedo = () => {
    if (this.state.last.length > 0) {

        this.state.last[this.state.last.length - 1].forEach(element => {
            try {
                this.paint(element.start, element.stop, element.strokeStyle, element.width)

                this.setState({ error: null })
            } catch (err) {
                this.setState({ error: err.message })
            }
        })

        let stg = this.state.storage

        let last = this.state.last

        let lastLine = last.pop()

        stg.push(lastLine)
    }
}


  render() {
    return (
      <div className="canvas-area">
        <div className="undo-redo-menu">
          <Undo  handleUndo={this.handleUndo}/>
          <Redo handleRedo={this.handleRedo}/>
        </div>
          <div>
            <canvas
              className="canvas"
              id="page-draw"
              ref={ref => (this.canvas = ref)}
              onMouseDown={this.onMouseDown}
              onMouseLeave={this.endPaint}
              onMouseUp={this.endPaint}
              onMouseMove={this.onMouseMove}
            />
          </div>
        </div>
    );
  }
}
export default Canvas;

