import React from "react";
import { Button, Space } from "antd";
import { useTranslation } from "react-i18next";
import {
  ContentWrapper,
  HeaderWrapper,
  LayoutWrapper,
} from "./LayoutMain.styled";
import { Buttonlang } from "../../Atoms";

interface ILayoutMain {
  children: React.ReactNode;
}

const LayoutMain = ({ children }: ILayoutMain) => {
  const link = ["test-1", "test-2"];
  const { t } = useTranslation();

  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <Space size={[8, 16]} wrap>
          {link.map((item) => (
            <Button key={item} type="primary" href={`/${item}`}>
              {t(`common.${item}`)}
            </Button>
          ))}
        </Space>
        <Buttonlang />
      </HeaderWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutWrapper>
  );
};

export default LayoutMain;
