import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";

const Buttonlang = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(() => {
    localStorage.setItem("language", i18n.language === "en" ? "th" : "en");
    i18n.changeLanguage(i18n.language === "en" ? "th" : "en");
  }, [i18n]);

  return (
    <Button type="primary" onClick={changeLanguage}>
      {i18n.language}
    </Button>
  );
};

export default Buttonlang;
