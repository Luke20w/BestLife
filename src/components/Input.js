export default function Input(props) {
  return (
    <div className={props.className}>
      <p className="text-left block text-sm font-medium text-gray-700 mb-0.5">{props.title}</p>
      <div className="flex gap-2 items-center">
        <div className="absolute ml-3 text-gray-500 mt-0.5">{props.icon ? props.icon() : null}</div>
        <input
          type={props.type ?? "text"}
          className={`${
            props.icon ? "pl-8" : ""
          } bg-white py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm rounded-md text-${
            props.textColor
          } border`}
          value={props.value}
          onChange={
            props.setValue ? (e) => props.setValue(props.filter ? props.filter(e.target.value) : e.target.value) : null
          }
          placeholder={props.placeholder}
          autoFocus={props.autoFocus}
        />
        {props.rightItem ? props.rightItem() : null}
      </div>
    </div>
  );
}
