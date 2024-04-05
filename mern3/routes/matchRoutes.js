const express = require('express');
const matchController = require('../controllers/matchController');

const router = express.Router();

router.get('/match', matchController.matchUsers);

module.exports = router;
