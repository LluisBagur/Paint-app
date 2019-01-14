import React from "react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-canvas-mock";
import Redo from "./Redo";

configure({ adapter: new Adapter() });

describe("redo test", () => {

  describe("testing render()", () => {
    it("instance Of component", () => {
      const wrapper = mount(<Redo />);
      const inst = wrapper.instance();
      expect(inst).toBeInstanceOf(Redo);
    });

    it("div redo-container-button is rendered", () => {
      const wrapper = shallow(<Redo />);
      expect(wrapper.find(".redo-container-button")).toBeDefined();
    });

    it("button redo-canvas-button is rendered", () => {
        const wrapper = shallow(<Redo />);
        expect(wrapper.find(".redo-canvas-button")).toBeDefined();
      });

    it("<i> fas fa-redo is rendered", () => {
    const wrapper = shallow(<Redo />);
    expect(wrapper.find(".fas fa-redo")).toBeDefined();
    });
  });
});
