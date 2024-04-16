import React,{useState} from 'react';
import axios from 'axios';

function App() {
  const[data,setData] = useState({})
  const[location,setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b5def40bd265eb26fe6921b586ccdbc5&units=metric&lang=es`;


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('')
    }
  };

  return (
    <div className="app">
      <div className="search">
      <input 
      value={location}
      onChange={event => setLocation(event.target.value)}
      onKeyPress={searchLocation}
      placeholder="Dirección"
      required
      type="text"/>
      </div>
      
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> :null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> :null}
            
          </div>
        </div>

        <div className="bottom">
          <div className="feels">
          {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> :null}
            <p> Sensacion termica.</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity.toFixed()}%</p> :null}
            <p> Humedad</p>
          </div>
          <div className="wind">
          {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}km</p> :null}
            <p> Viento</p>
          </div>

          <div className="time">
          {data.timezone ? <p className='bold'>{data.timezone}</p> :null}
            <p> hora</p>
          </div>
        </div>
      </div>
    </div>
    
  );


}

function fondo(){
  function obtenerHora() {
      function obtenerHoraActual() {
      const now = new Date();
      return now.getHours();
      }

      //const utcMinutos = data.timezone;
      const utcMinutos = -21600;
      const utcHoras = utcMinutos / 3600;
      let hora_dia;
      if (utcHoras === -6) {
      hora_dia = obtenerHoraActual();
      } else {
      const now = new Date();
      now.setHours(now.getHours() + utcHoras);
      hora_dia = now.getHours();
      }

      return hora_dia;
  }

  let hora = obtenerHora()
  if (hora >= 5 && hora < 9) {
    // Cambiar el fondo al amanecer
    document.app.style.background = "url('./assets/amanecer.jpg') no-repeat center center/cover";
} else if (hora >= 9 && hora < 18) {
    // Cambiar el fondo al día
    document.app.style.background = "url('./assets/dia.jpg') no-repeat center center/cover";
} else if (hora >= 18 && hora < 24) {
    // Cambiar el fondo al atardecer
    document.app.style.background = "url('./assets/atardecer.jpg') no-repeat center center/cover";
} else {
    // Cambiar el fondo a la noche
    document.app.style.background = "url('./assets/noche.jpg') no-repeat center center/cover";
}
}
export default App;