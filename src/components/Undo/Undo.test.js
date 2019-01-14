import React from "react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-canvas-mock";
import Undo from "./Undo";

configure({ adapter: new Adapter() });

describe("Undo test", () => {
  describe("testing render()", () => {
    it("instance Of component", () => {
      const wrapper = mount(<Undo />);
      const inst = wrapper.instance();
      expect(inst).toBeInstanceOf(Undo);
    });

    it("div undo-container-button is rendered", () => {
      const wrapper = shallow(<Undo />);
      expect(wrapper.find(".undo-container-button")).toBeDefined();
    });

    it("button undo-canvas-button is rendered", () => {
      const wrapper = shallow(<Undo />);
      expect(wrapper.find(".undo-canvas-button")).toBeDefined();
    });

    it("<i> fas fa-undo-alt is rendered", () => {
      const wrapper = shallow(<Undo />);
      expect(wrapper.find(".fas fa-undo-alt")).toBeDefined();
    });
  });
});
