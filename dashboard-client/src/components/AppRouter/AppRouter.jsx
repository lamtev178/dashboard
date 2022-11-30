import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../../routing/constants";

export const AppRouter = () => {
  return (
    <Routes>
      {ROUTES.map(({ path, component }) => (
        <Route key={path} path={path} element={component} />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
