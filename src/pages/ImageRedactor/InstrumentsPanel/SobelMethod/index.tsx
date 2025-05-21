import IconButton from "@/components/IconButton";
import useSobelMethod from "./useSobelMethod";

export default function SobelMethod() {
  const applySobelMethod = useSobelMethod();

  return (
    <span>
      <IconButton onClick={applySobelMethod}>Sobel</IconButton>
    </span>
  );
}
