import { useEffect } from "react";

export default function Alert(props) {
  const bgColor = props.color ?? "red";

  useEffect(() => {
    if (props.isOpen) {
      setTimeout(props.close, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen]);

  return (
    <div
      className={`flex pointer-events-none justify-center w-full z-20 transition duration-500 ease-in-out fixed top-5
        opacity-${props.isOpen ? "100" : "0"}
        transform 
        ${props.isOpen ? "-translate-y-1" : ""}
        ${props.isOpen ? "scale-100" : "scale-90"}
      `}
    >
      <div className={`bg-${bgColor}-100 p-5 flex flex-col gap-1 rounded-xl w-1/2`}>
        <p className={`font-bold text-sm text-${bgColor}-700`}>{props.title}</p>
        <p className={`text-xs text-${bgColor}-700`}>{props.message}</p>
      </div>
    </div>
  );
}
