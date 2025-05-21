import IconButton from "@/components/IconButton";
import useRobertsMethod from "./useRobertsMethod";

export default function RobertsMethod() {
  const applyRobertsMethod = useRobertsMethod();

  return (
    <span>
      <IconButton onClick={applyRobertsMethod}>roberts</IconButton>
    </span>
  );
}
