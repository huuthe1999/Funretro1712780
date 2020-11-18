const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');

const requireSignin = expressJwt({
    secret: '176168hdsd821ie1iKDW'
});

const { readDashboardController, addBoardItemController, deleteBoardItemController } = require('../controllers/dashboard.controller');

router.get('/:idUser', requireSignin, readDashboardController);
router.post('/:idUser/add', requireSignin, addBoardItemController);
router.delete('/:idUser/delete/:idBoard', requireSignin, deleteBoardItemController);

module.exports = router;