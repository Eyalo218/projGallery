// import mapService from './services/map.service.js' 

var map;
var markers = [];

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap'); 
    return _connectGoogleApi()
    .then(() => {
        console.log('google available');
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
        console.log('Map!', map);
    })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        icon:'fonts/svg/penguin3.png',
        title: 'Hello World!'
    });
    markers.push(marker);
    return marker;
}

function showUserLocation(loc){
    console.log('OMGOMGOMG' ,map)
    addMarker(loc);
    centerMap(loc);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    // const API_KEY = 'AIzaSyBc0UDzcpW-YkMkPhuzIi6IBn4SS6J9_kE';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBc0UDzcpW-YkMkPhuzIi6IBn4SS6J9_kE`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
    
    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
        // elGoogleApi.onerror = reject.bind(null,'Google script failed to load')
    })
}

function centerMap(coords){
    map.panTo(coords)
}


function removeMarkers(){
    console.log(markers)
    markers.forEach((marker)=> {
        marker.setMap(null);
    })
}

function getMarkers(){
    console.log('OMG THEY KILLED KENYA',markers);
}




export default {
    initMap,
    addMarker,
    showUserLocation,
    removeMarkers,
    getMarkers
}

