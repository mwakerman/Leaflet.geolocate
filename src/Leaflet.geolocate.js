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
        this._map.geolocate((this._removeFlash).bind(this));
    },

    _addFlash: function () {
        L.DomUtil.addClass(this.link, 'animated');
        L.DomUtil.addClass(this.link, 'pulse');
    },

    _removeFlash: function () {
        L.DomUtil.removeClass(this.link, 'animated');
        L.DomUtil.removeClass(this.link, 'pulse');
    }
});

L.Map.include({
    geolocate: function (callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((function(position) {
                this.setView([position.coords.latitude, position.coords.longitude], 15);
                if (typeof callback !== 'undefined') {
                    callback();
                }
            }).bind(this));
        } else {
            if (typeof callback !== 'undefined') {
                callback();
            }
        }
    }
});

L.Map.mergeOptions({
    geolocateControl: false,
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