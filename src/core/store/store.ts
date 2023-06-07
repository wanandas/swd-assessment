import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { formReducer } from "./slice/form";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, formReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
