// const [LAT, LNG] = [35.22708857, -80.84309021];
// const [LAT, LNG] = [19.0151243, 72.8271747];
const [LAT, LNG] = [18.9132656, 72.8227037];

const BASE_URL = 'http://localhost:10000/';
const LIST_NEARBY_CHEFS = BASE_URL + 'api/list_nearby_chefs';
const GET_CARDS = BASE_URL + 'api/get_cards';

class FetchAndDisplay {
  fetchAndDisplay() {
    this.listNearbyChefs_();
  }

  listNearbyChefs_() {
    let url = new URL(LIST_NEARBY_CHEFS);
    url.searchParams.set('lat', LAT);
    url.searchParams.set('lng', LNG);
    fetch(url)
        .then(res => res.json())
        .then(nearbyChefs => this.getCards_(nearbyChefs))
        .catch(error => {
          console.log(error);
        });
  }

  getCards_(nearbyChefs) {
    console.log('Nearby chefs:');
    console.log(nearbyChefs);
    let chefIds = [];
    for (let chef of nearbyChefs) {
      chefIds.push(chef[0]);
    }
    chefIds = JSON.stringify(chefIds);
    let url = new URL(GET_CARDS);
    url.searchParams.set('chefIds', chefIds);
    fetch(url)
        .then(res => res.json())
        .then(cards => this.showCards(nearbyChefs, cards))
        .catch(error => {
          console.log(error);
        });
  }

  showCards(nearbyChefs, cards) {
    console.log('Cards:');
    console.log(cards);
    let table = document.body.appendChild(document.createElement('table'));
    let header = table.appendChild(document.createElement('tr'));
    this.addCell_(header, 'Name', true);
    this.addCell_(header, 'Distance', true);
    this.addCell_(header, 'Address', true);

    for (let i = 0; i < cards.length; ++i) {
      let card = cards[i];
      let row = table.appendChild(document.createElement('tr'));
      this.addCell_(row, card.name);
      this.addCell_(row, +nearbyChefs[i][1].toFixed(2) + ' km');
      this.addCell_(row, card.address);
    }
  }

  addCell_(row, cellData, isHeader = false) {
    let cell = row.appendChild(document.createElement(isHeader ? 'th' : 'td'));
    cell.innerText = cellData;
  }
}

(new FetchAndDisplay()).fetchAndDisplay();

