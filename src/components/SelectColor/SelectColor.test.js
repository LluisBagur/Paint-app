import React from "react"
import SelectColor from "./SelectColor"
import { shallow, configure, mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import "jest-canvas-mock"

configure({ adapter: new Adapter() });

describe("selectColor test", () => {
  let selectColor;

  beforeAll(() => {
    selectColor = shallow(<SelectColor />);
  });

  describe("testing render()", () => {

  it("instance Of component", () => {
    const wrapper = mount(<SelectColor/>)
    const inst = wrapper.instance()
    expect(inst).toBeInstanceOf(SelectColor)

  })

  it("div classname=color-container-buttons to be defined", () => {
    const wrapper = shallow(<SelectColor/>)
    const inst = wrapper.instance()
    expect(wrapper.find('.color-container-buttons')).toBeDefined();
    
    expect(inst).toBeInstanceOf(SelectColor)

  })
})

  describe("testing state", () => {

    it("colors should be a list of colors", () => {
      const _colors = selectColor.state().colors;
      expect(_colors).toEqual([
        "#000000",
        "#a9a9a9",
        "#ffffff",
        "#800000",
        "#e6194B",
        "#fabebe",
        "#9A6324",
        "#f58231",
        "#ffd8b1",
        "#808000",
        "#ffe119",
        "#fffac8",
        "#bfef45",
        "#3cb44b",
        "#469990",
        "#42d4f4",
        "#4363d8",
        "#000075",
        "#911eb4",
        "#e6beff"
      ]);
    });
    it("selected should be null", () => {
      const _colors = selectColor.state().selected;
      expect(_colors).toBeNull();
    });

    it("Error should be null", () => {
      const _error = selectColor.state().error;
      expect(_error).toBeNull();
    });
  });


  describe("testing function componentWillReceiveProps", () => {

    it('should succeed on correct data', () => {
      const instance = selectColor.instance() 
      const props = {color: "#ffffff" }
      instance.componentWillReceiveProps( props )
      expect(selectColor.state().selected).toEqual("#ffffff")
      expect(selectColor.state().error).toBeNull()
});
});
});
