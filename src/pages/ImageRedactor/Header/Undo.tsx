import useImageStorage from "@/storages/ImageStorage";

function Undo() {
  const currentPixelIndex = useImageStorage(
    (store) => store.currentHistoryIndex,
  );
  const setCurrentPixelIndex = useImageStorage(
    (store) => store.setCurrentHistoryIndex,
  );

  return (
    <button
      className="btn btn-soft btn-sm btn-primary"
      onClick={() => setCurrentPixelIndex(currentPixelIndex - 1)}
      disabled={currentPixelIndex <= 0}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path
          d="M6.5 9.50026H14.0385C15.4063 9.50026 16.0902 9.50026 16.5859 9.82073C16.8235 9.97438 17.0259 10.1767 17.1795 10.4144C17.5 10.91 17.5 11.5939 17.5 12.9618C17.5 14.3297 17.5 15.0136 17.1795 15.5092C17.0259 15.7469 16.8235 15.9492 16.5859 16.1029C16.0902 16.4233 15.4063 16.4233 14.0385 16.4233H9.5M6.5 9.50026L8.75 7.42334M6.5 9.50026L8.75 11.5772"
          stroke="#1C274C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
          stroke="#1C274C"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

export default Undo;
