import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001'); // Assuming your server is running on this URL
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Name: {item.name}, Origin: {item.origin}, Destination: {item.destination}, Timestamp: {item.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
