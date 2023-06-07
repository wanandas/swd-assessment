import React from "react";
import { Layout, Button, Space } from "antd";
import { Buttonlang } from "../Atoms";

interface ILayoutMain {
  children: React.ReactNode;
}

const { Header, Content } = Layout;

const LayoutMain = ({ children }: ILayoutMain) => {
  const link = ["test1", "test2"];

  return (
    <Layout
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
      }}
    >
      <Header style={headerStyle}>
        <Space size={[8, 16]} wrap>
          {link.map((item) => (
            <Button key={item} type="primary" href={`/${item}`}>
              {item}
            </Button>
          ))}
        </Space>
        <Buttonlang />
      </Header>
      <Content style={contentStyle}>{children}</Content>
    </Layout>
  );
};

const headerStyle = {
  background:
    "linear-gradient(90deg, rgba(255,162,0,1) 0%, rgba(110,218,120,1) 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const contentStyle = { padding: "0 50px", background: "#fff", color: "#000" };

export default LayoutMain;
