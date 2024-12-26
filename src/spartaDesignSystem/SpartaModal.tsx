import React from "react";
import useModalToggles from "../hook/useModalToggles";
import closeModalIcon from "../assets/common/closeModalIcon.svg";

export type TModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalId: string;
  closeOnClickOutside?: boolean;
  title?: string;
  type?: "primary" | "alert" | "error" | "grey";
};

const SpartaModal = ({
  isOpen,
  onClose,
  children,
  modalId,
  closeOnClickOutside = true,
  title,
  type = "primary",
}: TModalProps) => {
  const { modalRefs } = useModalToggles([modalId]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnClickOutside) {
      onClose();
    }
  };

  const getStyledType = () => {
    switch (type) {
      case "primary":
        return "border-primary-400" + " shadow-primary";
      case "alert":
        return "border-alert-default" + " shadow-alert";
      case "error":
        return "border-error-default" + " shadow-error";
      default:
        return "border-primary-400" + " shadow-primary";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRefs[modalId]}
        className={`bg-gray-800 p-10 w-fit mx-4 transform transition-all duration-300 ease-in-out animate-modalSlideIn rounded-[20px] border-[1px] border-solid ${getStyledType()}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex justify-between items-center mb-4">
            <div className="text-heading-32 font-semibold text-white font-DungGeunMo">{title}</div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
              <img src={closeModalIcon} alt="close modal" />
            </button>
          </div>
        )}
        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default SpartaModal;