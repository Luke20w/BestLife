export default function Badge(props) {
  return (
    <span
      style={props.style}
      className={
        props.className +
        ` w-min items-center px-3 py-1 rounded-full text-xs font-medium 
        bg-${props.color ?? "gray"}-100 text-${props.color ?? "gray"}-700`
      }
    >
      {props.children}
    </span>
  );
}
