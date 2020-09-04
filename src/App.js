import React, {Component} from 'react'

import Info from './components/info/info';
import Form from './components/form/form';
import Weather from './components/weather_info/weather_info';

const API_KEY = "8b0655f858009fd788bf700ca7e9a427";

class App extends Component {

    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: undefined
    }

    gettingWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        
        if(city){
            const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await api_url.json();

            let sunset = data.sys.sunset;
            let date = new Date();
            date.setTime(sunset);
            let sunset_date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

            let sunrise = data.sys.sunrise;
            let date_sunrise = new Date();
            date_sunrise.setTime(sunrise);
            let sunrise_date_sunrise = date_sunrise.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })



            this.setState({
                temp: data.main.temp,
                city: data.name,
                country: data.sys.country,
                pressure: data.main.pressure,
                sunrise: sunrise_date_sunrise,
                sunset: sunset_date,
                error: undefined
            });
        } else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                pressure: undefined,
                sunrise: undefined,
                sunset: undefined,
                error: "Введите название города"
            })
        }
    }

    render() {
        return (
            <div>
                <Info/>
                <Form weatherMethod={this.gettingWeather}/>
                <Weather
                    temp={this.state.temp}
                    city={this.state.city}
                    country={this.state.country}
                    pressure={this.state.pressure}
                    sunrise={this.state.sunrise}
                    sunset={this.state.sunset}
                    error={this.state.error}
                />
            </div>
        )
    }
}

export default App;