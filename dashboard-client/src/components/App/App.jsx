import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "../AppRouter/AppRouter";
import Aside from "../Aside/Aside";
import styles from "./App.module.scss";

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.app_box}>
        <Aside />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}
