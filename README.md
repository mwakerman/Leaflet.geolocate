## Leaflet.geolocate
A geolocation plugin for Leaflet.

### Usage

``` js
var map = new L.Map('map', {
    geolocateControl: true
});
```

### API

``` js
map.geolocate(callback) // attempt to centre the map on users coordanates and then call the callback
```

### Building / Development

    npm install && make

__ProTip__ You may want to install `watch` so you can run `watch make`
without needing to execute make on every change.
