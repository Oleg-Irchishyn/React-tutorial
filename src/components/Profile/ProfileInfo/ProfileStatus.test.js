import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from './ProfileStatus';

describe("ProfileStatus Component", () => {

  test("Status from props should be in the state", () => {
    const component = create(<ProfileStatus status="it-kamasutra.com" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("it-kamasutra.com");
  });

  test("Span with correct status displays after the component creation", () => {
    const component = create(<ProfileStatus status="it-kamasutra.com" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span.children[0]).toBe("it-kamasutra.com");
  });

  test("Span displays after the component creation", () => {
    const component = create(<ProfileStatus status="it-kamasutra.com" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span).not.toBeNull();
  });

  test("Input shouldn't be displaye after the component creation", () => {
    const component = create(<ProfileStatus status="it-kamasutra.com" />);
    const root = component.root;
    expect(() => {
      let input = root.findByType("input");
    }).toThrow();
  });

  test("Input instead of span should be displayed in EditMode", () => {
    const component = create(<ProfileStatus status="it-kamasutra.com" />);
    const root = component.root;
    let span = root.findByType("span");
    span.props.onDoubleClick();
    let input = root.findByType("input");
    expect(input.props.value).toBe("it-kamasutra.com");
  });

  test("Callback should be called", () => {
    const mockCallback = jest.fn();
    const component = create(<ProfileStatus status="it-kamasutra.com"
      updateStatus={mockCallback} />);
    const instance = component.getInstance();
    instance.deActivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
