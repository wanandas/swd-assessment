import { useTranslation } from "react-i18next";
import { HomeWrapper } from "./Home.styled";
import { Space, Button } from "antd";
import { LayoutMain } from "../../components/templates";

function Home() {
  const { t } = useTranslation();
  const link = ["test-1", "test-2"];

  return (
    <LayoutMain>
      <HomeWrapper>
        <Space size={[8, 16]} wrap>
          {link.map((item) => (
            <Button key={item} type="default" href={`/${item}`}>
              {t(`common.${item}`)}
            </Button>
          ))}
        </Space>
      </HomeWrapper>
    </LayoutMain>
  );
}

export default Home;
