import { RootState } from "../store";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "../constants";
import { actionItemClick } from "../slice/menuSlice";

const Board = () => {
  const dispatch = useDispatch();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldDraw = useRef(false);
  const { activeMenuItem, actionMenuItem } = useSelector(
    (state: RootState) => state.menu
  );
  const { color, size } = useSelector(
    (state: RootState) => state.toolbox[activeMenuItem] || {}
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.jpg";
      anchor.click();
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context || !color || !size) return;

    const changeConfig = (color: string, size: number) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    changeConfig(color, size);
  }, [color, size]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x: number, y: number) => {
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawLine = (x: number, y: number) => {
      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseDown = (e: MouseEvent) => {
      console.log("mouseDown");
      shouldDraw.current = true;

      beginPath(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!shouldDraw.current) return;
      drawLine(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      console.log("mouseDown");

      shouldDraw.current = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
