import useInvertFilter from "./hooks/useInvertFilter";
import IconButton from "@/components/IconButton";

function BlackAndWhite() {
  const { applyInvertFilter } = useInvertFilter();

  return (
    <div className="tooltip tooltip-primary" data-tip="Инвертирование">
      <IconButton onClick={applyInvertFilter}>
        <svg
          width="25"
          height="25"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" fill="white" fillOpacity="0.01" />
          <path
            d="M18 31H38V5"
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30 21H10V43"
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M44 11L38 5L32 11"
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 37L10 43L4 37"
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IconButton>
    </div>
  );
}

export default BlackAndWhite;
