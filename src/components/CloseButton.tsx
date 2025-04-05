import { ButtonHTMLAttributes } from "react";

type CloseButtonProps = ButtonHTMLAttributes<any> & {
  screenReaderText?: string;
};

function CloseButton({
  className,
  screenReaderText,
  ...props
}: CloseButtonProps) {
  return (
    <button
      className={`btn btn-sm btn-circle btn-ghost ${className}`}
      {...props}
    >
      <span className="sr-only">{screenReaderText ?? "Закрыть"}</span>✕
    </button>
  );
}

export default CloseButton;
