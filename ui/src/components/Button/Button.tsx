import { useMemo } from "react";
import './Button.css'

interface ButtonParams {
  text: string;
  onClick: () => void;
  size?: "large" | "small" | "medium" | 'add';
}

function Button({ text, onClick, size }: ButtonParams) {
  const defineStyle = useMemo(() => {
    const result = { width: "150px", padding: '5px 0', height:'25px' };

    if (size === "medium") {
      result.width = "200px";
      result.padding = '8px 0'
    }

    if (size === "large") {
      result.width = "100%";
    }
    if(size == 'add') {
      result.width = '20px';
      result.padding = '3px'
    }

    return result;
  }, [size]);

  return (
    <>
      <div style={defineStyle} onClick={onClick} className="button-button">
        {text}
      </div>
    </>
  );
}
export default Button;
