import { PencilAlt } from "heroicons-react";

export default function TitleSection(props) {
  return (
    <div className={props.className + " flex gap-1 items-center"}>
      {props.hideIcon ? null : <PencilAlt size={18}></PencilAlt>}
      <input
        type="text"
        className={
          "outline-none text-left bg-transparent block w-full " +
          (props.labelClassName ?? "text-xl font-bold text-gray-700")
        }
        value={props.value}
        onChange={props.setValue ? (e) => props.setValue(e.target.value) : null}
        onFocus={(e) => e.target.select()}
      />
      <p className="text-xs font-small text-gray-400">{props.labelText}</p>
    </div>
  );
}
