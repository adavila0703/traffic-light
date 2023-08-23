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

interface TrafficLightPorps {
  horizontal?: boolean;
}

export const TrafficLight = ({ horizontal }: TrafficLightPorps) => {
  const [lightSettings, setLightSettings] = useState({
    nextLight: lights.green,
    currentLight: lights.red,
  });
  const [timer, setTimer] = useState(0);

  const getNextLight = () => {
    switch (lightSettings.currentLight.light) {
      case LightColor.RED:
        setLightSettings({
          nextLight: lights.green,
          currentLight: lights.yellow,
        });
        break;
      case LightColor.YELLOW:
        setLightSettings({
          ...lightSettings,
          currentLight: lightSettings.nextLight,
        });
        break;
      case LightColor.GREEN:
        setLightSettings({
          nextLight: lights.red,
          currentLight: lights.yellow,
        });
        break;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer + 1);

      if (timer >= lightSettings.currentLight.time) {
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
          color={
            lightSettings.currentLight.light === LightColor.RED
              ? 'red'
              : undefined
          }
        />
        <Light
          color={
            lightSettings.currentLight.light === LightColor.YELLOW
              ? 'yellow'
              : undefined
          }
        />
        <Light
          color={
            lightSettings.currentLight.light === LightColor.GREEN
              ? 'green'
              : undefined
          }
        />
      </div>
    </div>
  );
};
