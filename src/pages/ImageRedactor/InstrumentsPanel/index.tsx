import { memo } from "react";
import Instruments from "./Instruments";
import CloseButton from "@/components/CloseButton";
import { createPortal } from "react-dom";

type InstrumentsPanelProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
};

const Index = memo(
  ({ isVisible = true, setIsVisible }: InstrumentsPanelProps) => {
    const asideClassName = `h-full md:flex max-md:fixed starting:-translate-x-full transition-all ease-out
    relative z-30 w-45 h-full drawer bg-base-300 rounded-xl py-2 px-3 flex-col gap-y-2 
    ${!isVisible && "max-md:hidden"}`;

    return (
      <>
        <aside className={asideClassName}>
          <CloseButton
            className="btn-accent md:hidden absolute right-2 top-2"
            onClick={() => setIsVisible(false)}
            screenReaderText="Закрыть инструменты"
          />
          <h2 className="text-center text-xl text-base-content">Инструменты</h2>
          <div className="divider my-1"></div>
          <Instruments />
        </aside>
        {createPortal(
          !isVisible && (
            <button
              className="hidden max-md:block mt-1 btn btn-sm btn-accent btn-soft w-fit"
              onClick={() => setIsVisible(true)}
            >
              Инструменты&nbsp;&gt;
            </button>
          ),
          document.body,
        )}
      </>
    );
  },
);

export default Index;
