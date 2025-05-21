import IconButton from "@/components/IconButton";
import useLaplasMethod from "@/pages/ImageRedactor/InstrumentsPanel/LaplasMethod/useLaplasMethod";

export default function LaplasMethod() {
  const applyLaplasMethod = useLaplasMethod();

  return (
    <span
      className="tootip tooltip-top tooltip-primary"
      data-tip="Метод лапласа"
    >
      <IconButton onClick={applyLaplasMethod}>laplas</IconButton>
    </span>
  );
}
