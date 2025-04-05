import { HTMLAttributes, memo } from "react";
import { Statistics } from "@/types/types";
import XAxys from "./XAxys";
import YAxys from "./YAxys";

type HistogramProps = HTMLAttributes<HTMLElement> & {
  data: Statistics;
  width: number;
  height: number;
  xAxysTitle?: string;
  yAxysTitle?: string;
  isXAxysLabelsVertical?: boolean;
  color?: string;
};

const minColumnWidth = 9;

const Histogram = memo(
  ({
    data,
    width,
    height,
    className,
    xAxysTitle,
    yAxysTitle,
    isXAxysLabelsVertical = false,
    color = "var(--color-secondary)",
    ...props
  }: HistogramProps) => {
    // найти максимальное количество колонок для заданной ширины
    const maxColumnsCount = Math.round(width / minColumnWidth);
    // создаем итоговый массив данных, который будем отображать
    let dataToDisplay = [];
    // если количеество данных, которые нужно отобразить, больше максимального количества колонок, нужно срезать часть данных
    if (data.length > maxColumnsCount) {
      const step = Math.ceil(data.length / maxColumnsCount);
      // перебираем все данные с определенным шагом, чтобы уменьшить их количество до того, которое можно отобразить
      for (let i = 0; i < data.length; i += step) {
        // найти максимальное значение из данных на участке шага
        const dataElementsInStep = data.slice(i, i + step);
        let maxDataElementInStep = Math.max(...dataElementsInStep);
        dataToDisplay.push(maxDataElementInStep);
      }
    } else {
      dataToDisplay = data;
    }

    const maxValue = Math.max(...data);

    return (
      <div className="flex gap-x-2">
        <YAxys
          height={height}
          dataInterval={[0, maxValue]}
          title={yAxysTitle}
        />
        <div>
          <div
            className={`flex items-end ${className}`}
            style={{ width: `${width}px`, height: `${height}px` }}
            {...props}
          >
            {dataToDisplay.map((value, index) => (
              <div
                className="flex-1 not-last:border-r not-last:border-r-base-100"
                key={index}
                style={{
                  height: `${(value / maxValue) * height}px`,
                  backgroundColor: color,
                }}
                title={String(value)}
              ></div>
            ))}
          </div>
          <XAxys
            width={width}
            title={xAxysTitle}
            isLabelsVertical={isXAxysLabelsVertical}
            data={Object.keys(Array(256).fill(0))}
          />
        </div>
      </div>
    );
  },
);

export default Histogram;
