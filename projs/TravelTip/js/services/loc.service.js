var API_KEY = 'AIzaSyBc0UDzcpW-YkMkPhuzIi6IBn4SS6J9_kE'

var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return Promise.resolve(locs);
}

function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getLocationAddress(loc) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.lat},${loc.lng}&key=${API_KEY}`)
        .then((data) => {
            return data.json().then((addressData) => {
                return addressData.results[0];
            })
        }
        )
}

function getLocationByAddress(address) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        .then((data) => {
            return data.json().then((addressData) => {
                return addressData.results[0].geometry.location
            })
        }
        )
}




export default {
    getLocs: getLocs,
    getPosition: getPosition,
    getLocationAddress,
    getLocationByAddress
}