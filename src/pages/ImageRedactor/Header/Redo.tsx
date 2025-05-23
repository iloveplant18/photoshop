import useImageStorage from "@/storages/ImageStorage";

function Undo() {
  const currentPixelIndex = useImageStorage(
    (store) => store.currentHistoryIndex,
  );
  const setCurrentPixelIndex = useImageStorage(
    (store) => store.setCurrentHistoryIndex,
  );
  const history = useImageStorage((store) => store.history);

  return (
    <button
      className="btn btn-soft btn-sm btn-primary"
      onClick={() => setCurrentPixelIndex(currentPixelIndex + 1)}
      disabled={currentPixelIndex === history.length - 1}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path
          d="M17.5 9.50026H9.96155C8.04979 9.50026 6.5 11.05 6.5 12.9618C6.5 14.8736 8.04978 16.4233 9.96154 16.4233H14.5M17.5 9.50026L15.25 7.42334M17.5 9.50026L15.25 11.5772"
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
