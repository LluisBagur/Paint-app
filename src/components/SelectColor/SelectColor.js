import React, { Component } from "react";
import './SelectColor.css'

class SelectColor extends Component {
  state = {
    colors:['#000000','#a9a9a9', '#ffffff', '#800000', '#e6194B', '#fabebe', '#9A6324', '#f58231', '#ffd8b1', '#808000', '#ffe119','#fffac8', '#bfef45',
    '#3cb44b', '#469990', '#42d4f4', '#4363d8', '#000075', '#911eb4', '#e6beff'],
    selected: null,
    error: null
  };

  componentWillReceiveProps(props) {
    if (typeof props.color !== 'string') throw Error(`${props.color} is not a string`)
    this.setState({ selected: props.color })
}
  
  render() {
    return (
      <div className="color-container-buttons">
       {this.state.colors.map((color, index) => {
              if( this.state.selected === color){
                    return <button style={{background: color }} key={index} className="color-canvas-button" onClick={() => this.props.handleColorChange(color)}><i className="fas fa-check"></i></button>
              }
              else {
                return <button style={{background: color }} key={index} className="color-canvas-button" onClick={() => this.props.handleColorChange(color)} />
              }
                  })}
      </div>
    );
  }
}

export default SelectColor;
