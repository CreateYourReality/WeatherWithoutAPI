import { useEffect, useState } from "react";
 
const APIKey = import.meta.env.VITE_API_KEY;

const WeatherData = () => {
    const [data,setData] = useState("");
    const [desc,setDesc] = useState("");
    const [icon,setIcon] = useState("");
    const [temp,setTemp] = useState("");
    const [wind,setWind] = useState("");
    const [city,setCity] = useState("Berlin");
    const test = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`

    function temperatureConverter(valNum) {
        valNum = parseFloat(valNum);
        return (valNum- 273.15).toFixed(0);

      }

    useEffect(() => {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            setDesc(data.weather[0].main);
            setIcon(data.weather[0].icon)
            setTemp(temperatureConverter(data.main.temp));
            setWind(data.wind.speed)
          })
          .catch((error) => {
            console.log("Fehler beim laden", error);
          });
    
        console.log(
          "useEffect nochmal ausgeführt"
        );
        // Wenn die [] leer sind, wird das nur 1x beim laden der seite asugeführt
      }, [city]);

      const changeCity = () => {
        event.preventDefault();
        setCity(event.target.text)      
        }

        console.log(data);

    return (
        <section>
            <article>
                <a href="/" onClick={changeCity}>Düsseldorf</a>
                <a href="/" onClick={changeCity}>Köln</a>
                <a href="/"onClick={changeCity} >Berlin</a>
                <a href="/"onClick={changeCity} >Hamburg</a>
            </article>
            <h1>{desc} in {data.name} <img src={iconUrl} alt={data.name} /> </h1>
            <h2>Current: {temp}°C</h2>
            <h2>Wind Speed: {wind}mi/hr</h2>

        </section>
      );
}
 
export default WeatherData;