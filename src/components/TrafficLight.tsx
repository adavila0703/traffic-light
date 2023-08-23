import { useState, useEffect } from 'react';
import { Light } from './Light';
import './TraficLight.css';

enum LightColor {
  RED,
  YELLOW,
  GREEN,
}

const lights = {
  red: {
    time: 4,
    light: LightColor.RED,
  },
  yellow: {
    time: 1,
    light: LightColor.YELLOW,
  },
  green: {
    time: 3,
    light: LightColor.GREEN,
  },
};

export interface TrafficLightPorps {
  horizontal?: boolean;
}

export const TrafficLight = ({ horizontal }: TrafficLightPorps) => {
  const [nextLight, setNextLight] = useState(lights.green);
  const [currentLight, setCurrentLight] = useState(lights.red);
  const [timer, setTimer] = useState(0);

  const getNextLight = () => {
    switch (currentLight.light) {
      case LightColor.RED:
        setCurrentLight(lights.yellow);
        setNextLight(lights.green);
        break;
      case LightColor.YELLOW:
        setCurrentLight(nextLight);
        break;
      case LightColor.GREEN:
        setCurrentLight(lights.yellow);
        setNextLight(lights.red);
        break;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer + 1);

      if (timer >= currentLight.time) {
        getNextLight();
        setTimer(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="container">
      <div
        className="light-container"
        style={{ transform: horizontal ? 'rotate(270deg)' : '' }}
      >
        <Light
          color={currentLight.light === LightColor.RED ? 'red' : undefined}
        />
        <Light
          color={
            currentLight.light === LightColor.YELLOW ? 'yellow' : undefined
          }
        />
        <Light
          color={currentLight.light === LightColor.GREEN ? 'green' : undefined}
        />
      </div>
    </div>
  );
};
