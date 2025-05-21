import IconButton from "@/components/IconButton";
import useStaticMethod from "./useStaticMethod";

export default function StaticMethod() {
  const applyStaticMethod = useStaticMethod();

  return (
    <span>
      <IconButton onClick={applyStaticMethod}>Static</IconButton>
    </span>
  );
}
