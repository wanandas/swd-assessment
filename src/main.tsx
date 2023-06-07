import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./core/config/i18n.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Test1 } from "./pages";
import Test2 from "./pages/Test2.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { persistor, store } from "./core/store/store.ts";

const router = [
  {
    path: "/",
    Component: Test1,
  },
  {
    path: "/test1",
    Component: Test1,
  },
  {
    path: "/test2",
    Component: Test2,
  },
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              {router.map(({ path, Component, ...router }) => (
                <Route
                  key={path}
                  path={path}
                  {...router}
                  element={<Component />}
                />
              ))}
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
