/* eslint-disable react-refresh/only-export-components */
// src/ShotStatsContext.js

import React, { createContext, useState, useEffect } from "react";

// Crear el contexto
export const ShotStatsContext = createContext();

export const ShotStatsProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = window.ipcRenderer.loadJSON();
      setData(jsonData);
    };
    fetchData();
  }, []);

  return (
    <ShotStatsContext.Provider value={{ data, setData }}>
      {children}
    </ShotStatsContext.Provider>
  );
};
