import { Input } from "antd";
import { ChangeEvent, useState, Fragment } from "react";

interface IIdCardInput {
  onChange: (e: string) => void;
}

const IdCardInput = ({ onChange }: IIdCardInput) => {
  const InputArray = Array.from(Array(13).keys());
  const [inputValue, setInputValue] = useState<string[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | undefined,
    i: any
  ) => {
    const nextInput = document.getElementById(
      `cardId${i + 1}`
    ) as HTMLInputElement;

    const reg = new RegExp("^[0-9]");

    if (e?.target.value && reg.test(e?.target.value)) {
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
    onChange(inputValue.join(""));
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        gap: "5px",
        flexWrap: "wrap",
      }}
    >
      {InputArray.map((item) => (
        <Fragment key={item}>
          <Input
            id={`cardId${item}`}
            style={{ width: "40px" }}
            value={inputValue[item]}
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
          <span style={{ fontSize: "20px" }}>{item !== 12 ? "-" : ""}</span>
        </Fragment>
      ))}
    </div>
  );
};

export default IdCardInput;
