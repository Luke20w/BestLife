export default function HeatMap(props) {
  const factors = ["Stress", "Activity", "Socail", "Nutrition", "Sleep", "Spirituality"];

  return (
    <div className="flex flex-col">
      {props.values.map((values, row) => (
        <div key={row} className="flex gap-5 items-center">
          <p style={{ paddingTop: row === 0 ? 85 : 0 }}>{`Week ${row + 1}`}</p>
          <div className="flex">
            {values.map((value, col) => (
              <div key={col}>
                {row === 0 ? (
                  <p
                    className="w-10 h-20 flex justify-end mb-3 items-center"
                    style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
                  >
                    {factors[col]}
                  </p>
                ) : null}
                <div
                  className={`w-10 h-10 
                ${value === 10 ? "bg-black" : `bg-indigo-${value * 100}`} 
                ${value > 2 ? "text-white" : "text-indigo-600"}
                font-bold
                flex items-center justify-center`}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
