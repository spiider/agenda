const express = require('express');
const events = require('./events');
const users = require('./users');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (_req, res) => res.send('OK'));
router.use('/events', events);
router.use('/user', users)

module.exports = router;
