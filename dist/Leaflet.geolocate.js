L.Control.Geolocate = L.Control.extend({
    options: {
        position: 'topleft',
        title: 'Show my location.'
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-control-geolocate leaflet-bar leaflet-control');

        this.link = L.DomUtil.create('a', 'leaflet-control-geolocate-button leaflet-bar-part', container);
        this.link.href = '#';

        this._map = map;

        L.DomEvent.on(this.link, 'click', this._click, this);

        return container;
    },

    _click: function (e) {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        this._addFlash();
        this._map.geolocate((this._successHandler).bind(this), (this._failureHandler).bind(this));
    },

    _addFlash: function () {
        L.DomUtil.addClass(this.link, 'animated');
        L.DomUtil.addClass(this.link, 'pulse');
    },

    _removeFlash: function () {
        L.DomUtil.removeClass(this.link, 'animated');
        L.DomUtil.removeClass(this.link, 'pulse');
    },

    _addBlue: function () {
        L.DomUtil.addClass(this.link, 'blue');
    },

    _successHandler: function () {
        this._removeFlash();
        if (this._map.options.drawGeolocation){
            this._addBlue();
        }
    },

    _failureHandler: function () {
        this._removeFlash();
    },

    drawGeoMarker: function(position) {
        // remote previous geomarker if it exists
        if (typeof this._geomarker !== 'undefined') {
            this._map.removeLayer(this._geomarker);
        }
        
        // create and add new geomarker
        this._geomarker = L.marker([position.coords.latitude, position.coords.longitude],{
            icon: L.icon({
                iconUrl: 'dist/geolocation-marker.png',
                iconRetinaUrl: 'dist/geolocation-marker@2x.png',
                iconSize: [26, 26]
            }),
            clickable: false,
            title: 'Your location.',
        });

        this._geomarker.addTo(this._map);
    }
});

L.Map.include({
    geolocate: function (successHandler, failureHandler) {
        successHandler = typeof successHandler !== 'undefined' ? successHandler : function() {};
        failureHandler = typeof failureHandler !== 'undefined' ? failureHandler : function() {};

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(

                // success callback
                ( function(position) {
                    // centre the map on the users locations
                    this.setView([position.coords.latitude, position.coords.longitude], 17);

                    // draw the marker if the option is set
                    if (this.options.drawGeolocation) {
                        this.geolocateControl.drawGeoMarker(position);
                    }
                    successHandler();}
                ).bind(this),

                // failure callback
                function () {
                    alert('Location information not available or allowed.');
                    failureHandler();
                });
        }
    }
});

L.Map.mergeOptions({
    geolocateControl: false,
    drawGeolocation: true
});

L.Map.addInitHook(function () {
    if (this.options.geolocateControl) {
        this.geolocateControl = new L.Control.Geolocate();
        this.addControl(this.geolocateControl);
    }
});

L.control.geolocate = function (options) {
    return new L.Control.Geolocate(options);
};
