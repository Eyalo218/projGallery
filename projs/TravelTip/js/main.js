console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js'


document.querySelector('.find-me-btn').addEventListener('click', findMyPosition);

locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(
            () => {
                mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
            }
        ).catch(console.warn);

    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function findMyPosition() {
    console.log('OMG they killed kenny');
    locService.getPosition()
        .then(({ coords }) => {
            mapService.removeMarkers();
            mapService.showUserLocation({ lat: coords.latitude, lng: coords.longitude });
            locService.getLocationAddress({ lat: coords.latitude, lng: coords.longitude }).then((addressData) => {
                console.log(addressData);
                document.querySelector('.address').innerText = addressData.formatted_address;
            })
            weatherService.getWeather({lat: coords.latitude, lng: coords.longitude }).then(
                (weatherData) =>{renderWeather(weatherData)}
            )
        })
}

function renderWeather(weather){
    var strHTML = '';
    console.log("shalala",weather);

}
// document.querySelector('.btn1').onclick =  () => {
//     console.log('Thanks!');
// }


// document.querySelector('.btn1').addEventListener('click', (ev)=>{
//     console.log('Aha!', ev.target);
// })
