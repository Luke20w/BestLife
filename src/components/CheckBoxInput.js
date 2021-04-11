export default function CheckBoxInput(props) {
  return (
    <div className={props.className + " flex gap-2 text-xs items-center"}>
      <input
        type="checkbox"
        checked={props.value}
        className="cursor-pointer"
        onChange={(e) => (props.onChange ? props.onChange(e) : props.setValue(e.target.checked))}
      />
      {props.message}
    </div>
  );
}
