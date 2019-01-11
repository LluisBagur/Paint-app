import React from "react";
import Canvas from "./Canvas";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-canvas-mock";
import ReactTestUtils from "react-dom/test-utils"; // ES6

configure({ adapter: new Adapter() });

describe("Canvas test", () => {
  let canvas;
  const _widthLine = 4;
  const _color = "#000000";
  const _line = [];
  const _storage = [];
  const _last = [];
  const _prevPosition = { offsetX: 150, offsetY: 150 };
  const _currPosition = { offsetX: 160, offsetY: 160 };

  beforeAll(() => {
    canvas = mount(<Canvas />);
  });
  describe("Testing state", () => {
    it("width is 4", () => {
      const _width = canvas.state().widthLine;
      expect(_width).toEqual(_widthLine);
    });
  });

  describe("Testing functions", () => {
    describe("Testing onMouseDown", () => {
      it("should succeed on correct data", () => {
        const instance = canvas.instance();
        let nativeEvent = _prevPosition;
        instance.onMouseDown({ nativeEvent });
        expect(canvas.state().isPainting).toBeTruthy();
        expect(canvas.state().prevPosition).toEqual({
          offsetX: 150,
          offsetY: 150
        });
        expect(canvas.state().error).toBeNull();
      });

      it("should fail on incorrect offsetX data", () => {
        const instance = canvas.instance();
        let nativeEvent = { offsetX: "string", offsetY: 150 };
        expect(() => instance.onMouseDown({ nativeEvent })).toThrowError(
          "string is not a number"
        );
      });

      it("should fail on incorrect offsetY data", () => {
        const instance = canvas.instance();
        let nativeEvent = { offsetX: 150, offsetY: "string" };
        expect(() => instance.onMouseDown({ nativeEvent })).toThrowError(
          "string is not a number"
        );
      });
    });

    describe("Testing onMouseMove and Paint function", () => {
      it("should succeed on correct data", () => {
        const instance = canvas.instance();
        let nativeEvent = _prevPosition;
        instance.onMouseMove({ nativeEvent });
        expect(canvas.state().isPainting).toBeTruthy();
        expect(canvas.state().error).toBeNull();
        expect(canvas.state().line.length).toBeGreaterThan(0);
        expect(canvas.state().line).toEqual([
          {
            start: { offsetX: 150, offsetY: 150 },
            stop: { offsetX: 150, offsetY: 150 },
            strokeStyle: "#000000",
            width: 4
          }
        ]);
      });

      it("should fail on incorrect offsetX data", () => {
        const instance = canvas.instance();
        let nativeEvent = { offsetX: "string", offsetY: 150 };
        expect(() => instance.onMouseMove({ nativeEvent })).toThrowError(
          "string is not a number"
        );
      });

      it("should fail on incorrect offsetY data", () => {
        const instance = canvas.instance();
        let nativeEvent = { offsetX: 150, offsetY: "string" };
        expect(() => instance.onMouseMove({ nativeEvent })).toThrowError(
          "string is not a number"
        );
      });
    });

    describe("Testing Paint", () => {

      it("should succeed on correct data", () => {

        const instance = canvas.instance();
        instance.paint(_prevPosition, _currPosition, _color, _widthLine);
        expect(canvas.state().isPainting).toBeTruthy();
        expect(canvas.state().prevPosition).toEqual(_currPosition);
      });

      it("should succeed on incorrect color data", () => {
        const instance = canvas.instance();

        expect(() =>
          instance.paint(_prevPosition, _currPosition, 3, _widthLine)
        ).toThrowError("3 is not a string");
      });

      it("should succeed on incorrect width data", () => {
        const instance = canvas.instance();

        expect(() =>
          instance.paint(_prevPosition, _currPosition, _color, "string")
        ).toThrowError("string is not a number");
      });

      it("should succeed on incorrect prevPosition data", () => {
        const instance = canvas.instance();

        expect(() =>
          instance.paint("string", _currPosition, _color, _widthLine)
        ).toThrowError("prevPosition is not an object");
      });

      it("should succeed on incorrect currPosition data", () => {
        const instance = canvas.instance();

        expect(() =>
          instance.paint(_prevPosition, "string", _color, _widthLine)
        ).toThrowError("currPosition is not an object");
      });
    });

    describe("Testing endPaint", () => {
      it("should succeed on correct data", () => {
        const instance = canvas.instance();

        instance.endPaint(); // and save
        expect(canvas.state().isPainting).toBeFalsy();
        expect(canvas.state().error).toBeNull();
        expect(canvas.state().line).toEqual([]);
        expect(canvas.state().last).toEqual([]);
      });
    });

    describe("Testing handleUndo", () => {
      it("should succeed on correct data", () => {
        const instance = canvas.instance();

        instance.handleUndo();
        expect(canvas.state().isPainting).toBeFalsy();
        expect(canvas.state().error).toBeNull();
        expect(canvas.state().line).toEqual([]);
        expect(canvas.state().last).toEqual([
          [
            {
              start: { offsetX: 150, offsetY: 150 },
              stop: { offsetX: 150, offsetY: 150 },
              strokeStyle: "#000000",
              width: 4
            }
          ]
        ]);
        expect(canvas.state().storage).toEqual([]);
      });
    });

    describe("Testing handleRedo", () => {
      it("should succeed on correct data", () => {
        const instance = canvas.instance();

        instance.handleRedo();
        expect(canvas.state().last).toEqual([]);
        expect(canvas.state().storage).toEqual([
          [
            {
              start: { offsetX: 150, offsetY: 150 },
              stop: { offsetX: 150, offsetY: 150 },
              strokeStyle: "#000000",
              width: 4
            }
          ]
        ]);
      });
    });
  });
});
