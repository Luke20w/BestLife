export default function PulseIndicator(props) {
  return (
    <span className={`${props.className} flex h-3 w-3 absolute -top-0.5 -left-0.5`}>
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${
          props.color ?? "indigo"
        }-400 opacity-75`}
      ></span>
      <span className={`relative inline-flex rounded-full h-3 w-3 bg-${props.color ?? "indigo"}-500`}></span>
    </span>
  );
}
