import './App.css';
import { useState, useEffect } from 'react';

const fetchData = (setData) => {
  fetch('/backend.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      fetch(`http://${data?.endpoint}:9876`).then((response) => {
        return response.json();
      }).then((resp) => {
        setData(resp);
        console.log(resp);
        return resp;
      }).catch((error) => {
        console.log(error);
      });
    }).then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error fetching JSON:', error);
    });
};

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(setData);
    
    const intervalId = setInterval(() => fetchData(setData), 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>{data?.temperature}°c</div>
        <div>{data?.humidity}%</div>
      </header>
    </div>
  );
}

export default App;
