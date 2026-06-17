import React from 'react';
import "./App.css";
import RouteData from './RouteData';
import { ToastProvider } from "./components/Toast/ToastContext";

function App() {
  
  return (
    <ToastProvider>
      <div className="App font-allTag">
       <RouteData />
      </div>
    </ToastProvider>
  );
}

export default App;
