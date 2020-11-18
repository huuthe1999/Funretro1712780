const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');

// const { requireSignin } = require('../controllers/authUser.controller');
const requireSignin = expressJwt({
    secret: '176168hdsd821ie1iKDW'
});

const { readController, updateController } = require('../controllers/user.controller');

router.get('/:id', requireSignin, readController);
router.put('/update', requireSignin, updateController);

module.exports = router;