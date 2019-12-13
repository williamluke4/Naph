import { useEffect } from "react";

function useOutsideClick<T>(ref: React.MutableRefObject<T>, callback: (e?: any) => void) {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && e.target && !(ref as any).current.contains(e.target as Node)) {
      callback(e);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;