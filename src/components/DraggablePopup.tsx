import Draggable from "react-draggable";
import { HTMLAttributes, ReactNode, RefObject, useRef } from "react";
import { twMerge } from "tailwind-merge";

type DraggablePopupProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  title: string;
};

function DraggablePopup({ children, title, className }: DraggablePopupProps) {
  const draggableRef = useRef(null);

  return (
    <Draggable nodeRef={draggableRef as unknown as RefObject<HTMLElement>} handle=".dragElement">
      <article
        ref={draggableRef}
        className={twMerge(
          "absolute w-50 z-50 bg-base-300 rounded-xl border border-secondary-content",
          className,
        )}
      >
        <header className="dragElement select-none text-center bg-base-100 px-4 rounded-t-xl">
          {title}
        </header>
        <div className="px-4 py-2">{children}</div>
      </article>
    </Draggable>
  );
}

export default DraggablePopup;
