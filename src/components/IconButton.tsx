import { ButtonHTMLAttributes } from "react";

function IconButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="btn btn-primary btn-sm px-1 btn-outline" {...props}>
      {children}
    </button>
  );
}

export default IconButton;
