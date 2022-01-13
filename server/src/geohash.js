import Geohash from 'latlon-geohash';

function latLngToGeohash(lat, lng, precision) {
  return Geohash.encode(lat, lng, precision);
}

function geohashToLatLng_(geohash) {
  return Geohash.decode(geohash);
}

function test() {
  const geohash = latLngToGeohash(52.20, 0.12, 6);
  console.log(geohash);
  console.assert(geohash == 'u120fw');

  const latlng = geohashToLatLng_(geohash);
  console.log(latlng);
  console.assert(JSON.stringify(latlng) == '{"lat":52.1988,"lon":0.115}');
}
// test();

export default latLngToGeohash;

