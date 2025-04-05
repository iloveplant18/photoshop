type YAxysProps = {
  title?: string;
  height: number;
  dataInterval: [number, number];
};

const YAxys: React.FC<YAxysProps> = ({ title, height, dataInterval }) => {
  const itemSize = 25;
  const maxItems = Math.floor(height / itemSize);
  let displayedData = [dataInterval[1]];
  const step = Math.ceil((dataInterval[1] - dataInterval[0]) / maxItems);
  for (let i = dataInterval[1] - step; i > dataInterval[0] + step; i -= step) {
    displayedData.push(i);
  }
  displayedData.push(dataInterval[0]);

  return (
    <div className="flex items-center" style={{ height: `${height}px` }}>
      {title && <h3 className="-rotate-90">{title}</h3>}
      <div className="h-full flex flex-col justify-between text-right">
        {displayedData.map((item, index) => (
          <span key={index} className="truncate">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default YAxys;
