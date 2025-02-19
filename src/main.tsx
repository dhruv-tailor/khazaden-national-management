import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { PrimeReactProvider } from "primereact/api";
import App from './App'
import { Routes, Route } from 'react-router';
import NewGame from './NewGame';
import Game from './Game';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="NewGame" element={<NewGame/>} />
          <Route path="Game" element={<Game/>} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  </React.StrictMode>
)