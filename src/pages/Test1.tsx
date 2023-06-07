import { useTranslation } from "react-i18next";
import { LayoutMain } from "../components/templates";

const Test1 = () => {
  const { t } = useTranslation();
  return (
    <LayoutMain>
      <h1>Test1</h1>
    </LayoutMain>
  );
};

export default Test1;
