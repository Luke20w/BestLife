export default function Card(props) {
  return (
    <div
      style={{
        gridRow: props.gridRow,
        gridColumn: props.gridColumn,
        width: props.fullWidth ? null : 220,
      }}
      className={props.fullWidth ? "w-full" : ""}
    >
      <div
        className={
          props.className +
          ` shadow-sm rounded-xl p-3 cursor-pointer bg-${
            props.color ?? "white"
          } hover:scale-105 hover:shadow-xl transform transition transition text-${
            props.textColor ?? "gray-700"
          } relative`
        }
        onClick={props.onClick}
      >
        {props.children}
      </div>
      {props.outsideComponents ? props.outsideComponents() : null}
    </div>
  );
}
