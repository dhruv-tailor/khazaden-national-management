import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { PrimeReactProvider } from "primereact/api";
import App from './App'
import { Routes, Route } from 'react-router';
import NewGame from './NewGame';
import Game from './Game';
import LoadGame from './LoadGame/LoadGame';
import SettlementDetailed from './Settlement/detailed/SettlementDetailed';
import Economy from './Economics/Economy';
import SettlmentEconomy from './Economics/settlement/SettlmentEconomy';
import SettlementMilitary from './Military/SettlementMilitary';
import FederalMilitary from './Military/Army/FederalMilitary';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="NewGame" element={<NewGame/>} />
          <Route path="game/:game" element={<Game/>} />
          <Route path="LoadGame" element={<LoadGame/>} />
          <Route path="game/:game/settlement/:settlement" element={<SettlementDetailed/>} />
          <Route path="game/:game/economy" element={<Economy/>} />
          <Route path="game/:game/settlement/:settlement/economy" element={<SettlmentEconomy/>} />
          <Route path="game/:game/settlement/:settlement/military" element={<SettlementMilitary/>} />
          <Route path="game/:game/military" element={<FederalMilitary/>} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  </React.StrictMode>
)