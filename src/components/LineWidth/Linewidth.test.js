import React from "react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-canvas-mock";
import LineWidth from "./Linewidth";

configure({ adapter: new Adapter() });

describe("linewidth test", () => {
  let linewidth;

  beforeAll(() => {
    linewidth = shallow(<LineWidth />);
  });

  describe("testing render()", () => {
    it("instance Of component", () => {
      const wrapper = mount(<LineWidth />);
      const inst = wrapper.instance();
      expect(inst).toBeInstanceOf(LineWidth);
    });

    it("div width-container-buttons to be defined", () => {
      const wrapper = shallow(<LineWidth />);
      expect(wrapper.find(".width-container-buttons")).toBeDefined();
    });
  });

  describe("testing state", () => {
    it("colors should be a list of colors", () => {
      const _line = linewidth.state().LineWidth;
      expect(_line).toEqual([4, 8, 16, 24]);
    });
    it("selected should be null", () => {
      const _line = linewidth.state().selectedLine;
      expect(_line).toBeNull();
    });
  });

  describe("testing function componentWillReceiveProps", () => {
    it("should succeed on correct data", () => {
      const instance = linewidth.instance();
      const props = { line: 4 };
      instance.componentWillReceiveProps(props);
      expect(linewidth.state().selectedLine).toEqual(4);
    });
  });
});
