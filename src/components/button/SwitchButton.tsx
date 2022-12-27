import React, { useCallback, useEffect, useState } from "react";

let idCounter = 0;

interface IProps {
  size?: number;
  mode?: "light" | "dark";
  value: boolean;
  onChange: (value: boolean) => void;
}

const green = "#30D158";
const grey = "#E9E9E9";
const darkGrey = "#39393D";

const SwitchButton: React.FC<IProps> = ({
  size = 200,
  mode,
  onChange,
  value,
}) => {
  const [_mode, set_mode] = useState(mode || "light");

  const padding = size / 12;
  const height = (size * 3) / 5;
  const originPointWidth = height - padding;
  const [pointWidth, setPointWidth] = useState(originPointWidth);
  const [inactiveBackgroundColor, setInactiveBackgroundColor] = useState(
    _mode === "light" ? grey : darkGrey
  );
  const [backgroundColor, setBackgroundColor] = useState(
    value ? green : inactiveBackgroundColor
  );
  const [pointOffset, setPointOffset] = useState(0);
  const mouseDown = useCallback(() => {
    setPointWidth(originPointWidth * 1.23);
    setPointOffset(originPointWidth - originPointWidth * 1.23);
    const onMouseUp = () => {
      setPointWidth(originPointWidth);
      setPointOffset(0);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mouseup", onMouseUp);
  }, []);
  const shadowOffset = size / 50;
  const onClick = useCallback((value: boolean) => {
    setPointOffset(0);
    onChange(value);
  }, []);
  // If mode is not set.
  useEffect(() => {
    if (!mode) return;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      set_mode("dark");
    } else {
      set_mode("light");
    }
  }, []);
  useEffect(() => {
    set_mode(mode || "light");
  }, [mode]);
  useEffect(() => {
    setInactiveBackgroundColor(_mode === "dark" ? darkGrey : grey);
  }, [_mode]);
  useEffect(() => {
    setBackgroundColor(value ? green : inactiveBackgroundColor);
    setPointWidth(originPointWidth);
  }, [value, inactiveBackgroundColor]);
  return (
    <div
      onMouseDown={mouseDown}
      onClick={() => onClick(!value)}
      style={{
        cursor: "pointer",
        transition: `all .3s`,
        borderRadius: height,
        height: height,
        width: size,
        display: "flex",
        alignItems: "center",
        backgroundColor: backgroundColor,
      }}>
      <div
        style={{
          transition: `all .3s`,
          transform: `translateX(${
            value
              ? size - originPointWidth - padding / 2 + pointOffset
              : padding / 2
          }px)`,
          borderRadius: size,
          borderBlock: size / 4,
          height: height - padding,
          width: pointWidth,
          backgroundColor: "white",
          boxShadow: `${shadowOffset * (value ? -1 : 1)}px 0 ${
            shadowOffset * 4
          }px rgba(0, 0, 0, .1)`,
        }}></div>
    </div>
  );
};

export default SwitchButton;
