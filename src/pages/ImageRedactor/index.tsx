import { ReactNode, useState } from "react";
import Header from "./Header";
import InstrumentsPanel from "./InstrumentsPanel";
import WorkingArea from "./WorkingArea";
import useImageStorage from "@/storages/ImageStorage";
import Dropbox from "@/components/Dropbox";
import { TransformWrapper } from "react-zoom-pan-pinch";
import PasteArea from "./PasteArea";
import ProgressLine from "./ProgressLine";

function ImageRedactor() {
  const isImageExists = useImageStorage((store) => store.isImageExists);
  const [isInstrumentsPanelVisible, setIsInstrumentsPanelVisible] =
    useState<boolean>(true);

  return (
    <PasteArea>
      <ProgressLine />
      <main className="max-h-[calc(100dvh-2px)] h-[calc(100dvh-2px)] grid md:grid-cols-[auto_1fr] p-2 gap-y-1 gap-x-1">
        <InstrumentsPanel
          isVisible={isInstrumentsPanelVisible}
          setIsVisible={setIsInstrumentsPanelVisible}
        />
        <TransformWrapper
          wheel={{ step: 1 }}
          doubleClick={{ step: 0.8 }}
          centerZoomedOut={false}
          limitToBounds={false}
          zoomAnimation={{ animationType: "easeInOutQuint" }}
          centerOnInit={true}
          minScale={0.1}
        >
          {() =>
            (
              <div className="relative overflow-hidden">
                <div
                  id="header-container"
                  className="absolute top-2 left-2 z-20 max-w-[calc(100%-20px)]"
                >
                  <Header />
                </div>
                <WorkingArea />
                {!isImageExists && (
                  <div className="absolute top-0 left-0 w-full h-full">
                    <Dropbox className="h-full" />
                  </div>
                )}
              </div>
            ) as ReactNode
          }
        </TransformWrapper>
      </main>
    </PasteArea>
  );
}

export default ImageRedactor;
