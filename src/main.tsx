import React from 'react';
import ReactDOM from 'react-dom/client';
import { TrafficLight } from './components/TrafficLight.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TrafficLight />
    <TrafficLight horizontal />
  </React.StrictMode>
);
