import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more {t("common.loading")}
      </p>
    </>
  );
}

export default App;
