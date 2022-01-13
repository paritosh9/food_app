import fs from 'fs';

function normalize() {
  normalizeMumbaiRestaurantsData_();
  normalizeStarbucksData_();
}

function normalizeMumbaiRestaurantsData_() {
  const RAW_FILE = 'src/testdata/mumbai_restaurants_raw.json';
  const NORMALIZED_FILE = 'src/testdata/mumbai_restaurants.json';
  let places = [];
  let numSkipped = 0;
  let contents = JSON.parse(fs.readFileSync(RAW_FILE));
  let uniqueIds = new Set();
  for (let place of contents) {
    let id = place['Place ID']
    if (!id || uniqueIds.has(id)) {
      ++numSkipped;
      continue;
    }
    uniqueIds.add(id);
    places.push({
      id: id,
      name: place['Place Name'],
      address: place['Vicinity'],
      lat: +place.Latitude,
      lng: +place.Longitude
    });
  }
  console.log(RAW_FILE);
  console.log('Num places:', contents.length);
  console.log('Num skipped:', numSkipped);
  fs.writeFileSync(NORMALIZED_FILE, JSON.stringify(places, null, 2));
}

function normalizeStarbucksData_() {
  const RAW_FILE = 'src/testdata/starbucks_us_locations_raw.json';
  const NORMALIZED_FILE = 'src/testdata/starbucks_us_locations.json';
  let places = [];
  let numSkipped = 0;
  let contents = JSON.parse(fs.readFileSync(RAW_FILE));
  for (let place of contents) {
    if (!place.phone) {
      ++numSkipped;
      continue;
    }
    places.push({
      id: place.phone,
      name: place.name,
      address: place.address,
      lat: place.position.lat,
      lng: place.position.lng
    });
  }
  console.log(RAW_FILE);
  console.log('Num places:', contents.length);
  console.log('Num skipped:', numSkipped);
  fs.writeFileSync(NORMALIZED_FILE, JSON.stringify(places, null, 2));
}

normalize();

