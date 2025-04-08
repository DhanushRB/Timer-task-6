import React, { useState, useEffect } from 'react';
import './index.css';
import './App.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  // STYLE OBJECT
  const styles = {
    heading: {
      color: 'black',
      fontSize: '3rem',
      textAlign: 'center',
      marginBottom: '1rem',
    },
    timeDisplay: {
      color: 'yellow', 
      fontSize: '2.5rem',
      textAlign: 'center',
      marginBottom: '1.5rem',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1rem',
      cursor: 'pointer',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
    },
    disabledButton: {
      backgroundColor: '#bdc3c7',
      cursor: 'not-allowed',
    }
  };

  return (
    <div id='stopwatchsec'>
      <h1 style={styles.heading}>Stopwatch</h1>
      <h2 style={styles.timeDisplay}>{formatTime(time)}</h2>
      <div style={styles.buttonContainer}>
        <button
          onClick={handleStart}
          disabled={isRunning}
          style={{
            ...styles.button,
            ...(isRunning ? styles.disabledButton : {}),
          }}
        >
          Start
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          style={{
            ...styles.button,
            ...(!isRunning ? styles.disabledButton : {}),
          }}
        >
          Stop
        </button>
        <button onClick={handleReset} style={styles.button}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
