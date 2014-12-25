# See the README for installation instructions.
UGLIFY = node_modules/.bin/uglifyjs

all: \
	$(shell npm install && mkdir -p dist) \
	dist/leaflet.geolocate.css \
	dist/Leaflet.geolocate.js \
	dist/Leaflet.geolocate.min.js \
	dist/geolocate@2x.png

clean:
	rm -f dist/*

dist/geolocate.png: src/geolocate.png
	cp src/geolocate.png dist/geolocate.png
	cp src/geolocate@2x.png dist/geolocate@2x.png

dist/leaflet.geolocate.css: src/leaflet.geolocate.css
	cp src/leaflet.geolocate.css dist/leaflet.geolocate.css

dist/Leaflet.geolocate.js: src/Leaflet.geolocate.js
	cp src/Leaflet.geolocate.js dist/Leaflet.geolocate.js

dist/Leaflet.geolocate.min.js: dist/Leaflet.geolocate.js
	$(UGLIFY) dist/Leaflet.geolocate.js > dist/Leaflet.geolocate.min.js

.PHONY: clean
