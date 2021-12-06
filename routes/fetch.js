const express = require('express');
const router = express.Router();

const searchRequestController = require('../controllers/searchRequest_controller');

router.post('/blog', searchRequestController.fetchBlog);  //Render the Home page from Home Controller


module.exports = router;