console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js'

var currPos;
var hasLoadedFromURL = false;

document.querySelector('.find-me-btn').addEventListener('click', findMyLocation);
document.querySelector('.inserted-loc-btn').addEventListener('click', findLocationByAddress);
document.querySelector('.copy-url-btn').addEventListener('click', copyURLwithCoords);

locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(
            () => {
                mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });

                if (getParameterByName('lat') && getParameterByName('lng') && !hasLoadedFromURL) {
                    currPos = { lat: getParameterByName('lat'), lng: getParameterByName('lng') };
                    hasLoadedFromURL = true;
                    setNewPosition();
                }
                else findMyLocation()
            }).catch(console.warn);
}

function findMyLocation() {
    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            currPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setNewPosition();
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function setNewPosition() {

    mapService.removeMarkers();
    mapService.showUserLocation(currPos);
    locService.getLocationAddress(currPos).then((addressData) => {
        console.log(addressData);
        document.querySelector('.address').innerText = addressData.formatted_address;
    })
    weatherService.getWeather(currPos).then(
        (weatherData) => { renderWeather(weatherData) }
    )
}

function renderWeather(weather) {
    var strHTML = '';
}

function copyURLwithCoords() {
    var elURLHolder = document.querySelector(".url-holder");
    elURLHolder.classList.toggle('hidden');
    var url= window.location.href;
    if(getParameterByName('lat')) url = window.location.href.slice(0, window.location.href.indexOf('lat')-1)
    elURLHolder.value = `${url}?lat=${currPos.lat}&lng=${currPos.lng}`;
    elURLHolder.select();
    document.execCommand("copy");
    elURLHolder.classList.toggle('hidden');
}

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return +decodeURIComponent(results[2].replace(/\+/g, " "));
}

function findLocationByAddress() {
    var elInsertedLocation = document.querySelector('.inserted-loc');
    var addressData = elInsertedLocation.value.split(' ');
    addressData = addressData.filter( function(addressItem){
        return addressItem!=='';
    })
    addressData = addressData.join('+');
    locService.getLocationByAddress(addressData).then(
        (location) =>{
            currPos = location;
            console.log('pos is what?', currPos)
            setNewPosition();
        }
    )
}


