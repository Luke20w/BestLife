import { useEffect, useRef } from "react";

export default function Dropdown(props) {
  const dropdown = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  });

  function handleClick(e) {
    if (!dropdown.current.contains(e.target)) {
      props.close();
    }
  }

  if (props.isOpen) {
    return (
      <div
        ref={dropdown}
        className={
          props.className +
          ` absolute mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-10`
        }
        onClick={(e) => {
          e.stopPropagation();
          props.close();
        }}
      >
        {props.children}
      </div>
    );
  }
  return <div ref={dropdown} />;
}
