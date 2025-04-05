import { useControls } from "react-zoom-pan-pinch";

function ZoomOut() {
  const { zoomOut } = useControls();

  return (
    <button
      className="btn btn-soft btn-sm btn-primary"
      onClick={() => zoomOut(0.5)}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2Z"
          fill="#000000"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 11C7 10.4477 7.44772 10 8 10H14C14.5523 10 15 10.4477 15 11C15 11.5523 14.5523 12 14 12H8C7.44772 12 7 11.5523 7 11Z"
          fill="#000000"
        />
      </svg>
    </button>
  );
}

export default ZoomOut;
