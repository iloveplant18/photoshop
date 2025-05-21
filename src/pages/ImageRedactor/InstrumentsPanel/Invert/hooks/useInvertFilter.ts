import useImageDataHandler from "@/hooks/useImageDataHandler";

function useInvertFilter() {
  const applyInvertFilter = useImageDataHandler((i, data) => {
    data[i] = 255 - data[i]!;
    data[i + 1] = 255 - data[i + 1]!;
    data[i + 2] = 255 - data[i + 2]!;
  });

  return { applyInvertFilter };
}

export default useInvertFilter;
