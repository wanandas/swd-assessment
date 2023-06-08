import styled from "@emotion/styled";
import { Layout } from "antd";

const { Header, Content } = Layout;

export const LayoutWrapper = styled(Layout)`
  overflow: hidden;
  min-height: 100vh;
  background: linear-gradient(
    90deg,
    rgba(255, 162, 0, 1) 0%,
    rgba(110, 218, 120, 1) 100%
  );
`;

export const HeaderWrapper = styled(Header)`
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContentWrapper = styled(Content)`
  padding: 0 16px 50px;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: calc(100vh - 64px);
`;
