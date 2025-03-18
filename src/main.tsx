import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { PrimeReactProvider } from "primereact/api";
import App from './App'
import { Routes, Route } from 'react-router';
import NewGame from './NewGame';
import Game from './Game';
import LoadGame from './LoadGame/LoadGame';
import SettlementDetailed from './Settlement/Detailed/SettlementDetailed';
import ForeignPowers from './ForeignPowers/ForeignPowers';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="NewGame" element={<NewGame/>} />
          <Route path="game/:game" element={<Game/>} />
          <Route path="game/:game/foreignpowers" element={<ForeignPowers/>} />
          <Route path="game/:game/settlement/:settlement" element={<SettlementDetailed/>} />
          <Route path="LoadGame" element={<LoadGame/>} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  </React.StrictMode>
)