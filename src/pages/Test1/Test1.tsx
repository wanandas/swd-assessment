import { useTranslation } from "react-i18next";
import { LayoutMain } from "../../components/templates";
import { Space } from "antd";
import { ButtonShape } from "../../components/Atoms";
import { useCallback, useMemo, useState } from "react";
import { ControlWrapper, GridButtonShapeWrapper } from "./Test1.styled";
import { shapeGroup, shapeTriangle } from "../../constants/shape";

const Test1 = () => {
  const { t } = useTranslation();
  const [indexArray, setIndexArray] = useState([0, 1, 2, 3, 4, 5]);

  const indexMemo = useMemo(() => indexArray, [indexArray]);

  const handleShuffle = useCallback(() => {
    const newArray = [...indexArray];
    for (const i in newArray) {
      const j = Math.floor(Math.random() * Number(i));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    setIndexArray(newArray);
  }, [indexArray]);

  const handleMoveByTriangle = useCallback((shape: string) => {
    switch (shape) {
      case "triangle-left":
        setIndexArray((pre) => {
          const newArrayLeft = pre.map((item) => {
            return item - 1 < 0 ? 5 : item - 1;
          });
          return newArrayLeft;
        });
        break;
      case "triangle-right":
        setIndexArray((pre) => {
          const newArrayRight = pre.map((item) => {
            return item + 1 > 5 ? 0 : item + 1;
          });
          return newArrayRight;
        });
        break;
      case "triangle-up":
      case "triangle-down":
        setIndexArray((pre) => {
          const newArrayUp = pre.map((item) => {
            return item - 3 < 0 ? item + 3 : item - 3;
          });
          return newArrayUp;
        });
        break;
      default:
        break;
    }
  }, []);

  return (
    <LayoutMain>
      <h1>{t("common.test-1")}</h1>
      <Space direction="vertical">
        <ControlWrapper>
          {shapeTriangle.map((shape, index) => (
            <ButtonShape
              onClick={() => handleMoveByTriangle(shape)}
              key={index}
              shape={shape}
            />
          ))}
        </ControlWrapper>
        <GridButtonShapeWrapper>
          {shapeGroup.map((shape, index) => {
            return (
              <ButtonShape
                onClick={handleShuffle}
                order={indexMemo[index]}
                width={"150px"}
                key={index}
                shape={shape}
              />
            );
          })}
        </GridButtonShapeWrapper>
      </Space>
    </LayoutMain>
  );
};

export default Test1;
