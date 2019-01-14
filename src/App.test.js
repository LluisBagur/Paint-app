import React from "react";
import App from "./App";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-canvas-mock";
import ReactTestUtils from "react-dom/test-utils"; // ES6

configure({ adapter: new Adapter() });

describe("App test", () => {
  let app;

  beforeAll(() => {
    app = mount(<App />);
  });

  describe("Testing state", () => {
    it("width is 4", () => {
      const _width = app.state().width;
      expect(_width).toEqual(4);
    });

    it("color is #000000", () => {
      const _color = app.state().color;
      expect(_color).toEqual("#000000");
    });
  });

  describe("testing render()", () => {
    it("instance Of component", () => {
      const wrapper = mount(<App />);
      const inst = wrapper.instance();
      expect(inst).toBeInstanceOf(App);
    });

    it("div body is rendered", () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(".body")).toBeDefined();
    });

    it("div main-menu is rendered", () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(".main-menu")).toBeDefined();
    });

    it("div paint-area is rendered", () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(".paint-area")).toBeDefined();
    });
  });

  describe("Testing functions", () => {
    describe("Testing HandleLineWidthChange", () => {
      it("should succeed on correct data", () => {
        const instance = app.instance();
        let selectedLineWidth = 8;
        instance.handleLineWidthChange(selectedLineWidth);
        expect(app.state().width).toEqual(8);
        expect(app.state().error).toBeNull();
      });
      it("should fail on incorrect data", () => {
        const instance = app.instance();
        let selectedLineWidth = "string";
        expect(() =>
          instance.handleLineWidthChange(selectedLineWidth)
        ).toThrowError("string is not a number");
      });
    });

    describe("Testing handleColorChange", () => {
      it("We can check if the consumer called a method onMouseDown on the class instance", () => {
        const instance = app.instance();
        let selectedColor = "#42d4f4";
        instance.handleColorChange(selectedColor);
        expect(app.state().color).toEqual("#42d4f4");
        expect(app.state().error).toBeNull();
      });

      it("should fail on incorrect data", () => {
        const instance = app.instance();
        let selectedColor = 3;
        expect(() => instance.handleColorChange(selectedColor)).toThrowError(
          "3 is not a string"
        );
      });
    });
  });
});
