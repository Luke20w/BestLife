export default function SelectMenu(props) {
  return (
    <div className={props.className + " text-sm"}>
      {props.title ? <p className="text-left block font-medium text-gray-700 mb-1">{props.title}</p> : null}
      <select
        className={props.selectClassName + " border block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md"}
        onChange={props.onChange ? (e) => props.onChange(e.target.value) : null}
        value={props.value}
      >
        {props.children}
      </select>
    </div>
  );
}
