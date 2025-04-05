import useProgressStore from "@/storages/ProgressStorage";

function ProgressLine() {
  const progress = useProgressStore((store) => store.progress);

  return (
    <div className="w-full h-[2px]">
      <div
        className="bg-primary h-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default ProgressLine;
