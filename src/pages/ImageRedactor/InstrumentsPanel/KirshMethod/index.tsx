import IconButton from "@/components/IconButton";
import useKirshMethod from "@/pages/ImageRedactor/InstrumentsPanel/KirshMethod/useKirshMethod";

export default function KirshMethod() {
  const applyKirshMethod = useKirshMethod();

  return (
    <span className="tootip tooltip-top tooltip-primary" data-tip="Метод Кирша">
      <IconButton onClick={applyKirshMethod}>kirsh</IconButton>
    </span>
  );
}
