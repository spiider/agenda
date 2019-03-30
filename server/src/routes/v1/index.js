const express = require('express');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (_req, res) => res.send('OK'));

module.exports = router;
