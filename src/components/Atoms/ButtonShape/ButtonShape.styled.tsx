import styled from "@emotion/styled";
import { Button } from "antd";

interface IButtonShape {
  order?: number;
  width?: string;
}

export const ButtonShapeStyle = styled(Button)<IButtonShape>`
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  height: 100%;

  order: ${(props) => props.order};
  max-width: ${(props) => props.width || "84px"};

  .triangle {
    width: 0;
    height: 0;

    &-down,
    &-up {
      border-left: 12.5px solid transparent;
      border-right: 12.5px solid transparent;
    }
    &-left,
    &-right {
      border-top: 12.5px solid transparent;
      border-bottom: 12.5px solid transparent;
    }

    &-up {
      border-bottom: 25px solid #555;
    }
    &-down {
      border-top: 25px solid #555;
    }

    &-left {
      border-right: 25px solid #555;
    }
    &-right {
      border-left: 25px solid #555;
    }
  }

  & > div {
    margin: 0 auto;
  }

  .square {
    height: 25px;
    width: 25px;
    background-color: #555;
  }
  .circle {
    height: 25px;
    width: 25px;
    background-color: #555;
    border-radius: 50%;
  }
  .oval {
    height: 25px;
    width: 50px;
    background-color: #555;
    border-radius: 50%;
  }
  .trapezoid {
    border-bottom: 25px solid #555;
    border-left: 12.5px solid transparent;
    border-right: 12.5px solid transparent;
    height: 0;
    width: 72.5px;
  }
  .rectangle {
    height: 25px;
    width: 50px;
    background-color: #555;
  }
  .parallelogram {
    width: 50px;
    height: 25px;
    transform: skew(20deg);
    background: #555;
  }
`;
