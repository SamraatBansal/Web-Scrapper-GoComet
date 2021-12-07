const express = require('express');
const router = express.Router();

const searchRequestController = require('../controllers/searchRequest_controller');

router.post('/tag', searchRequestController.searchTag);

router.get('/tag', searchRequestController.searchTag);


module.exports = router;