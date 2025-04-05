import React from "react";

type XAxysProps = {
  title?: string;
  width: number;
  data: (string | number)[];
  isLabelsVertical?: boolean;
};

const XAxys: React.FC<XAxysProps> = ({
  title,
  width,
  data,
  isLabelsVertical = false,
}) => {
  const itemSize = 50;
  const maxItems = Math.floor(width / itemSize);
  let displayedData = [data[0]];
  if (data.length > maxItems) {
    const step = Math.ceil(data.length / maxItems);
    for (let i = step; i < data.length - 1; i += step) {
      displayedData.push(data[i]);
    }
  }
  displayedData.push(data.at(-1));

  return (
    <div style={{ width: `${width}px` }}>
      <div className="flex justify-between">
        {displayedData.map((item, index) => (
          <span
            key={index}
            className={`truncate ${isLabelsVertical && "-rotate-90"}`}
          >
            {item}
          </span>
        ))}
      </div>
      {title && <h3 className="text-center">{title}</h3>}
    </div>
  );
};

export default XAxys;
