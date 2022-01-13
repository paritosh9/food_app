import express from 'express';

import DAOFactory from '../dao/dao_factory.js';

const router = express.Router();

router.get('/api/list_nearby_chefs', (req, res) => {
  let {lat, lng} = req.query;
  let nearbyChefs = DAOFactory.getDAO().listNearbyChefs(lat, lng);
  res.json(nearbyChefs);
});

router.get('/api/get_cards', (req, res) => {
  let chefIds = JSON.parse(req.query.chefIds);
  let chefCards = DAOFactory.getDAO().getCards(chefIds);
  res.json(chefCards);
});

router.get('/api/get_menu', (req, res) => {
  let chefId = req.query.chefId;
  let menu = DAOFactory.getDAO().getMenu(chefId);
  res.json(menu);
});

export default router;

