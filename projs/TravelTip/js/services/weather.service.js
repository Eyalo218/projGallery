const W_KEY = '38e6f9e6adf7f05f872fc7aa997f6dd2'


function getWeather(coords){
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&APPID=${W_KEY}`)
    .then( (weatherData)=>{
        return weatherData.json()
        .then ((jsonWeather)=> {
            console.log(jsonWeather)
           return jsonWeather;
        })

    })
}

function a(){}

export default {
    getWeather
}