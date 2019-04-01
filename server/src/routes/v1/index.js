const express = require('express');
const events = require('./events');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (_req, res) => res.send('OK'));
router.use('/events', events);

module.exports = router;
