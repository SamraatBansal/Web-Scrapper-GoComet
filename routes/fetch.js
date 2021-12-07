const express = require('express');
const router = express.Router();

const searchRequestController = require('../controllers/searchRequest_controller');

router.post('/blog', searchRequestController.fetchBlog);


module.exports = router;