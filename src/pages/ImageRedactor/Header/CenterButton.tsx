import { useControls } from "react-zoom-pan-pinch";

function CenterButton() {
  const { centerView } = useControls();

  return (
    <button
      className="btn btn-soft btn-sm btn-primary"
      onClick={() => centerView()}
    >
      <span className="sr-only">Центрировать</span>
      <svg width={30} height={30} viewBox="0 0 32 32" id="icon">
        <polygon fill="none" points="6 12 4 12 4 4 12 4 12 6 6 6 6 12" />
        <polygon fill="none" points="28 12 26 12 26 6 20 6 20 4 28 4 28 12" />
        <polygon fill="none" points="12 28 4 28 4 20 6 20 6 26 12 26 12 28" />
        <polygon
          fill="none"
          points="28 28 20 28 20 26 26 26 26 20 28 20 28 28"
        />
        <rect fill="none" x="15" y="10" width="2" height="4" />
        <rect fill="none" x="10" y="15" width="4" height="2" />
        <rect fill="none" x="18" y="15" width="4" height="2" />
        <rect fill="none" x="15" y="18" width="2" height="4" />
        <rect
          id="_Transparent_Rectangle_"
          data-name="&lt;Transparent Rectangle&gt;"
          width="32"
          height="32"
          style={{ fill: "none" }}
        />
      </svg>
    </button>
  );
}

export default CenterButton;
