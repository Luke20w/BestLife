export default function DropdownItem(props) {
  return (
    <button
      className={`${props.className} flex gap-1.5 items-center px-4 py-2 text-xs cursor-pointer w-full h-full
      text-${props.color ?? "gray"}-600 
      hover:bg-${props.color ?? "gray"}-100`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
