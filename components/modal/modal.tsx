// @src/components/Modal.tsx
import { useState, ReactNode } from "react";
import ReactPortal from "./portal";
import "./modal.scss";
import Back from "../../public/assets/icons/back.svg";
import Close from "../../public/assets/icons/close.svg";
import classNames from "classnames";
import Label, { LabelType, LabelVariant } from "../../components/label/label";

export enum ModalTypes {
  Small = "small",
  XSmall = "xsmall",
  Medium = "medium",
  Xmedium = "xmedium",
  Large = "large",
  Xlarge = "xlarge",
}

// Define the props of Modal.
type ModalSize =
  | ModalTypes.Small
  | ModalTypes.Medium
  | ModalTypes.Xmedium
  | ModalTypes.Large
  | ModalTypes.Xlarge
  | ModalTypes.XSmall;
type ModalProps = {
  isOpen?: boolean;
  setOn?: () => void;
  title?: any;
  promptText?: string;
  handleDelete?: () => void;
  children?: ReactNode;
  showCloseButton?: boolean;
  showBackButton?: boolean;
  dataTestId?: string;
  navigateBack?: () => void;
  size?: ModalSize;
};

// Modal component.
const Modal = ({
  isOpen, // Provide a default value for isOpen
  setOn,
  title,
  promptText,
  handleDelete,
  children,
  dataTestId,
  showCloseButton = true,
  showBackButton,
  navigateBack,
  size = ModalTypes.Xmedium,
}: ModalProps) => {
  // Manage button enabled/disabled state.
  const [disabled, setDisabled] = useState<boolean>(false);
  // Return null if isOpen props from parent is false.
  if (!isOpen) return null;
  // Run when delete is confirmed.
  const confirmDelete = (): void => {
    // Disable the buttons (this could also be anything).
    setDisabled(true);
    // Execute delete comment or reply.
    if (handleDelete) handleDelete();
  };

  const getModalStyles = (size: ModalSize) => {
    return classNames({
      modal: true,
      "modal__size-small": size === "small",
      "modal__size-medium": size === "medium",
      "modal__size-Xmedium": size === "xmedium",
      "modal__size-large": size === "large",
      "modal__size-xlarge": size === "xlarge",
      "modal__size-xsmall": size === "xsmall",
    });
  };
  return (
    //@ts-ignore
    <ReactPortal wrapperId="modal-container">
      <div data-testid={dataTestId} className={getModalStyles(size)}>
        {/* Modal Heading */}
        <div className="modal__modal-heading">
          {showBackButton && (
            <div className="modal__icon" onClick={navigateBack}>
              <Back />
            </div>
          )}
          {title && (
            <h3 className="modal__modal-title">
              <Label
                type={LabelType.Link}
                text={title}
                variant={LabelVariant.L3}
              />
            </h3>
          )}
          {setOn && showCloseButton && (
            <div className="modal__icon" onClick={setOn}>
              <Close />
            </div>
          )}
        </div>
        {/* Modal Prompt Text */}
        <div className="modal__modal-body">{children}</div>
      </div>
    </ReactPortal>
  );
};
export default Modal;
