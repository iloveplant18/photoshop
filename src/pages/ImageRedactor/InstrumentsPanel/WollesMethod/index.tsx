import IconButton from "@/components/IconButton";
import useWollesMethod from "./useWollesMethod";

export default function WollesMethod() {
  const applyWollesMethod = useWollesMethod();

  return (
    <span>
      <IconButton onClick={applyWollesMethod}>Wolles</IconButton>
    </span>
  );
}
