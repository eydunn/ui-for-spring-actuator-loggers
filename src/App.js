import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    setData(jsonData);
  };

  useEffect(() => {
    if (url !== '') {
      fetchData();
    }
  }, [url]);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleLevelChange = async (logger, event) => {
    const newLevel = event.target.value;
    const newData = { ...data };
    newData.loggers[logger].configuredLevel = newLevel;
    setData(newData);

    const response = await fetch(`${url}/${logger}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ configuredLevel: newLevel }),
    });

    if (!response.ok) {
      // Handle error
      console.error('Error updating level');
    } else {
      // Re-fetch data after updating level
      fetchData();
    }
  };

  return (
      <div>
        <h1>UI for Spring Actuator loggers endpoint</h1>
        <input type="text" value={url} onChange={handleUrlChange} placeholder="Enter Spring Actuator Loggers URL" />
        {data && (
            <div>
              {Object.keys(data.loggers).map((logger) => (
                  <div key={logger}>
                    <h2>{logger} <span>(Effective Level: {data.loggers[logger].effectiveLevel})</span></h2>
                    <select
                        value={data.loggers[logger].configuredLevel}
                        onChange={(event) => handleLevelChange(logger, event)}
                    >
                      {data.levels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                      ))}
                    </select>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
}

export default App;
