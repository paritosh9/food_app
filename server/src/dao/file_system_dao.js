import fs from 'fs';
import haversine from 'haversine';

import DAOInterface from './dao_interface.js';
import latLngToGeohash from '../geohash.js';

const CHEF_DATA_FILE = 'src/testdata/mumbai_restaurants.json';
// const CHEF_DATA_FILE = 'src/testdata/starbucks_us_locations.json';
const GEOHASH_PRECISION = 5;

class FileSystemDAO extends DAOInterface {
  constructor() {
    super();
    this.geohashToNearbyChefs = {};
    this.chefIdToCard = {};
    this.init_();
  }

  listNearbyChefs(lat, lng) {
    let geohash = latLngToGeohash(lat, lng, GEOHASH_PRECISION);
    let nearbyChefs = [];
    for (let chef of (this.geohashToNearbyChefs[geohash] || [])) {
      let dist = haversine([lat, lng], [chef.lat, chef.lng],
          {'format': '[lat,lon]', 'unit': 'km'})
      nearbyChefs.push([
        chef.id,
        dist,
        chef.labels,
        chef.costForTwo,
        chef.ratingSum,
        chef.numRatings
      ]);
    }
    // Sort results from nearest to farthest.
    nearbyChefs.sort((a, b) => a[1] - b[1]);
    console.log(`listChefMetadata: (${lat}, ${lng}) -> ${geohash}`);
    console.log('listChefMetadata: Num chefs nearby =', nearbyChefs.length);
    return nearbyChefs;
  }

  getCards(chefIds) {
    let cards = []
    for (let chefId of chefIds) {
      cards.push(this.chefIdToCard[chefId] || {});
    }
    return cards;
  }

  getMenu(chefId) {
    throw Error('Not implemented yet');
  }

  // Load the data file and build data structures that mirror (as far as
  // possible) the way the DynamoDB DAO is expected to work.
  init_() {
    let chefs = JSON.parse(fs.readFileSync(CHEF_DATA_FILE));
    console.log('Num chefs:', chefs.length);
    for (let chef of chefs) {
      let {id, lat, lng} = chef;
      let geohash = latLngToGeohash(lat, lng, GEOHASH_PRECISION);
      let nearbyChefs = this.geohashToNearbyChefs[geohash] || [];
      nearbyChefs.push({
        id: id,
        lat: lat,
        lng: lng,
        labels: [],
        costForTwo: null,
        ratingSum: null,
        numRatings: null
      });
      this.geohashToNearbyChefs[geohash] = nearbyChefs;
      this.chefIdToCard[id] = {
        id: id,
        name: chef.name,
        address: chef.address,
      };
    }
    console.log('Number of geohashes:',
                Object.keys(this.geohashToNearbyChefs).length);
  }
}

export default FileSystemDAO;

