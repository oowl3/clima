import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [backgroundClass, setBackgroundClass] = useState('');

  useEffect(() => {
    fondo(); // Llama a fondo() cuando el componente se monta inicialmente
  }, [data]); // Ejecuta fondo() cada vez que data cambie

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid={AQUI VA LA LLAVE (KEY)}=es`;

  const fondo = () => {
    function obtenerHora() {
      const now = new Date();
      return now.getHours();
    }
  
    if (data.timezone != null) {
      const utcHoras = data.timezone / 3600;
      let hora_dia;
      if (utcHoras === -6) {
        hora_dia = obtenerHora();
      } else {
        const now = new Date();
        now.setHours(now.getHours() + utcHoras + 6); 
        hora_dia = now.getHours(); 
      }
  

      if (hora_dia >= 24) {
        hora_dia -= 24;
      } else if (hora_dia < 0) {
        hora_dia += 24;
      }
  
      let backgroundClassName;
      if (hora_dia >= 5 && hora_dia < 9) {
        backgroundClassName = 'amanecer';
      } else if (hora_dia >= 9 && hora_dia < 18) {
        backgroundClassName = 'dia';
      } else if (hora_dia >= 18 && hora_dia < 24) {
        backgroundClassName = 'atardecer';
      } else {
        backgroundClassName = 'noche';
      }
  
      setBackgroundClass(backgroundClassName); // Establece la clase de fondo según la hora del día
    }
  };
  
  

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
        fondo(); // Llama a fondo() después de recibir los datos para actualizar el fondo
      });
      setLocation('');
    }
  };

  return (
    <div className={`app ${backgroundClass}`}>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Dirección"
          required
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">{data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}</div>
          <div className="description">{data.weather ? <p>{data.weather[0].description}</p> : null}</div>
        </div>

        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
            <p>Sensacion termica.</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity.toFixed()}%</p> : null}
            <p>Humedad</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed.toFixed()}km</p> : null}
            <p>Viento</p>
          </div>
          <div className="wind">
            {data.main ? <p className="bold">{data.main.temp_max.toFixed()}°C</p> : null}
            <p>Temp.Max</p>
          </div> 
          <div className="wind">
            {data.main ? <p className="bold">{data.main.temp_min.toFixed()}°C</p> : null}
            <p>Temp.Min</p>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default App;
