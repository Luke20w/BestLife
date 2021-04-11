export default function HeatMap(props) {
  return (
    <div className="flex flex-col">
      {props.values.map((values, index) => (
        <div key={index}>
          <div className="flex">
            {values.map((value) => (
              <div className={`w-10 h-10 bg-indigo-${value * 100} flex items-center justify-center`}>{value}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
