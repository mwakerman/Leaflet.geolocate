## Leaflet.geolocate
A geolocation plugin for Leaflet.

### Demo
[http://mwakerman.github.io/Leaflet.geolocate](http://mwakerman.github.io/Leaflet.geolocate)

### Usage

``` js
var map = new L.Map('map', {
    geolocateControl: true,
    drawGeolocation: true, // draws the geo location marker when location is found
});
```

### API

``` js
map.geolocate(successCallback, failureCallback) // attempt to centre the map on users coordanates and then call the relevant handler
```

### Building / Development

    npm install && make

__ProTip__ You may want to install `watch` so you can run `watch make`
without needing to execute make on every change.

### Thanks
This project was modelled __heavily__ on the [Leaflet.fullscreen](https://github.com/Leaflet/Leaflet.fullscreen) plugin written by [John Firebaugh](https://github.com/jfirebaugh).

The icon design and lifecycle was based on the Google Maps geolocation feature.
