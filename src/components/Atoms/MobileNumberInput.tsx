import { Input } from "antd";

import { ChangeEvent } from "react";
import { regExp } from "../../constants/regExp";

const MobileNumberInput = ({
  onChange,
  ...rest
}: React.HTMLAttributes<HTMLInputElement>) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reg = new RegExp(regExp.onlyNumber);
    if (reg.test(e.target.value)) {
      return onChange && onChange(e);
    }
  };

  return (
    <Input
      {...rest}
      onChange={handleChange}
      maxLength={10}
      style={{
        width: "200px",
      }}
    />
  );
};

export default MobileNumberInput;
