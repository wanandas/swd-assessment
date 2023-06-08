import { Input } from "antd";
import { ChangeEvent, useState, Fragment, useCallback, useEffect } from "react";
import { regExp } from "../../constants/regExp";
import styled from "@emotion/styled";

interface IIdCardInput {
  onChange: (e: string) => void;
  initValue?: string;
}

const IdCardInput = ({ onChange, initValue }: IIdCardInput) => {
  const InputArray = Array.from(Array(13).keys());
  const [inputValue, setInputValue] = useState<string[]>(
    initValue?.split("") || []
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, i: number) => {
      const nextInput = document.getElementById(
        `cardId${i + 1}`
      ) as HTMLInputElement;

      const reg = regExp.onlyNumber;

      if (e?.target.value && reg.test(e.target.value)) {
        const value = e.target.value.slice(-1);
        setInputValue((prev) => {
          const newArr = [...prev];
          newArr[i] = value;
          return newArr;
        });

        if (i < 12) {
          nextInput?.focus();
        }
      }

      if (e?.target.value === "") {
        setInputValue((prev) => {
          const newArr = [...prev];
          newArr[i] = "";
          return newArr;
        });
      }
    },
    []
  );

  useEffect(() => {
    inputValue.length === 13 && onChange(inputValue.join(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <InputWrapper>
      {InputArray.map((item) => (
        <Fragment key={item}>
          <Input
            id={`cardId${item}`}
            value={inputValue[item] || ""}
            onKeyDownCapture={(e) => {
              if (e.key === "Backspace" && item > 0 && !inputValue[item]) {
                const preInput = document.getElementById(`cardId${item - 1}`);
                preInput?.focus();
              }
            }}
            onChange={(e) => {
              handleChange(e, item);
            }}
          />
          <span>{item !== 12 ? "-" : ""}</span>
        </Fragment>
      ))}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
  flex-wrap: wrap;

  .ant-input {
    width: 40px;
    text-align: center;
  }

  span {
    font-size: 20px;
  }
`;

export default IdCardInput;
