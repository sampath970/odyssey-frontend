import { useState, useLayoutEffect, ReactNode } from "react";
import ReactDom, { createPortal } from "react-dom";

// Default props value.
const defaultReactPortalProps = {
  wrapperId: "react-portal",
};

// Define ReactPortal props.
type ReactPortalProps = {
  children: ReactNode;
  wrapperId: string;
} & typeof defaultReactPortalProps;

// Render component.
const ReactPortal = (props: ReactPortalProps) => {
  const { children, wrapperId } = props;

  // Manage state of portal-wrapper.
  const [wrapper, setWrapper] = useState<Element | null>(null);

  useLayoutEffect(() => {
    // Find the container-element (if exist).
    let element = document.getElementById(wrapperId);

    // Bool flag whether container-element has been created.
    let created = false;

    if (element) {
      created = true;
      const wrapper = document.createElement("div");
      wrapper.setAttribute("id", wrapperId);
      wrapper.setAttribute("style", "display:flex");
      document.body.appendChild(wrapper);
      element = wrapper;
    }

    // Set wrapper state.
    setWrapper(element);

    // Cleanup effect.
    return () => {
      if (created && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // Return null on initial rendering.
  if (wrapper === null) return null;

  // Return portal-wrapper component.
  // @ts-ignore
  return createPortal(children, wrapper);
};

ReactPortal.defaultProps = defaultReactPortalProps;

export default ReactPortal;
