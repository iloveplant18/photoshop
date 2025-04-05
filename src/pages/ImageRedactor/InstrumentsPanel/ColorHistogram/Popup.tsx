import useColorStatistic from "./hooks/useColorStatistic";
import DraggablePopup from "@/components/DraggablePopup";
import Histogram from "@/components/Histogram";

function Popup() {
  const { brightnessStat, redStat, greenStat, blueStat, loadingPercent } =
    useColorStatistic();

  const histogramWidth = 200;
  const histogramHeight = 150;

  return (
    <DraggablePopup title="Цвета" className="w-fit">
      <div
        className="h-[2px] bg-primary"
        style={{ width: `${loadingPercent}%` }}
      ></div>
      <ul className="flex flex-wrap justify-between gap-5 w-120">
        <li>
          <Histogram
            width={histogramWidth}
            height={histogramHeight}
            data={brightnessStat}
            xAxysTitle="Яркость"
            color="var(--color-primary)"
          />
        </li>
        <li>
          <Histogram
            width={histogramWidth}
            height={histogramHeight}
            data={redStat}
            xAxysTitle="Красный"
          />
        </li>
        <li>
          <Histogram
            width={histogramWidth}
            height={histogramHeight}
            data={blueStat}
            xAxysTitle="Синий"
            color="var(--color-accent)"
          />
        </li>
        <li>
          <Histogram
            width={histogramWidth}
            height={histogramHeight}
            data={greenStat}
            xAxysTitle="Зеленый"
            color="rgb(64, 242, 140)"
          />
        </li>
      </ul>
    </DraggablePopup>
  );
}

export default Popup;
