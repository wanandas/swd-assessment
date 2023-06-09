import { ButtonShapeStyle } from "./ButtonShape.styled";

export interface IButtonShape {
  shape:
    | "triangle-up"
    | "triangle-down"
    | "triangle-left"
    | "triangle-right"
    | "square"
    | "circle"
    | "oval"
    | "trapezoid"
    | "rectangle"
    | "parallelogram";
  order?: number;
  width?: string;
  onClick?: () => void;
}

const ButtonShape = ({ shape, order, width, onClick }: IButtonShape) => {
  return (
    <ButtonShapeStyle onClick={onClick} order={order} width={width}>
      <div className={shape}></div>
    </ButtonShapeStyle>
  );
};

export default ButtonShape;
