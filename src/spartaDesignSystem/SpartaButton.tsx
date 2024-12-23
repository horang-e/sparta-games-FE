type Props = {
  content: string;
  disabled?: boolean;
  type?: "standard" | "filled";
  size?: "small" | "medium" | "large";
  colorType?: "main" | "alert" | "error" | "grey";
  onClick: () => void;
};

const SpartaButton = ({
  disabled = false,
  content,
  type = "standard",
  size = "large",
  colorType = "main",
  onClick,
}: Props) => {
  const getButtonStyles = (): string => {
    const baseStyles = "w-full rounded-md transition-colors duration-200 box-border";

    const sizeStyles = {
      small: "h-10 text-title-16",
      medium: "h-12 text-title-18",
      large: "h-14 text-title-22",
    };

    const disabledStyles = {
      filled: "bg-gray-500 cursor-not-allowed",
      standard: "border-2 border-gray-500 text-gray-500 cursor-not-allowed",
    };

    if (disabled) {
      return `${baseStyles} ${disabledStyles[type]} ${sizeStyles[size]}`;
    }

    const colorDict = {
      main: {
        filled: "bg-primary-500 hover:bg-primary-300",
        standard: "border-2 border-primary-500 text-primary-500 hover:text-primary-300 hover:border-primary-300",
      },
      alert: {
        filled: "bg-alert-default hover:bg-alert-hover",
        standard: "border-2 border-alert-default text-alert-default hover:text-alert-hover hover:border-alert-hover",
      },
      error: {
        filled: "bg-error-default hover:bg-error-hover",
        standard: "border-2 border-error-default text-error-default hover:text-error-hover hover:border-error-hover",
      },
      grey: {
        filled: "bg-gray-300 ",
        standard: "border-2 border-gray-300 text-gray-300",
      },
    };

    return `${baseStyles} ${colorDict[colorType][type]} ${sizeStyles[size]} hover:shadow-md`;
  };

  return (
    <button type="submit" disabled={disabled} onClick={onClick} className={getButtonStyles()}>
      {content}
    </button>
  );
};

export default SpartaButton;
