const router = require('express').Router();
const authenticate = require('../controllers/authenticate');

router.use('/authenticate', authenticate);

module.exports = router;
