import React, { useState, useEffect } from 'react';

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

  const handleLevelChange = (logger, event) => {
    const newData = { ...data };
    newData.loggers[logger].configuredLevel = event.target.value;
    setData(newData);
  };

  return (
      <div>
        <input type="text" value={url} onChange={handleUrlChange} placeholder="Enter URL" />
        {data && (
            <div>
              {Object.keys(data.loggers).map((logger) => (
                  <div key={logger}>
                    <h2>{logger}</h2>
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
